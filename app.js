/* ============ CodeRoof app ============ */

(() => {
  const $ = id => document.getElementById(id);
  const content = $('content');
  const nav = $('nav');

  // ---------- flatten lessons ----------
  const FLAT = [];
  COURSES.forEach(course => course.modules.forEach(mod =>
    mod.lessons.forEach(lesson => FLAT.push({ course, mod, lesson }))));

  // deep dives count toward progress too
  const DDS = (typeof DEEPDIVES !== 'undefined')
    ? Object.entries(DEEPDIVES).map(([id, dd]) => Object.assign({ id }, dd)) : [];
  const courseDds = courseId => DDS.filter(d => d.course === courseId);

  const courseOf = id => COURSES.find(c => c.id === id);
  const courseFlat = courseId => FLAT.filter(f => f.course.id === courseId);
  const courseTotal = c => c.modules.reduce((n, m) => n + m.lessons.length, 0) + courseDds(c.id).length;
  const courseDone = c => c.modules.reduce((n, m) => n + m.lessons.filter(l => done.has(l.id)).length, 0) +
    courseDds(c.id).filter(d => done.has(d.id)).length;
  const TOTAL = FLAT.length + DDS.length;

  // ---------- state ----------
  let currentId = null;        // active lesson id (null = none)
  let currentCourseId = null;  // active course id (null = home)

  // ---------- progress ----------
  const KEY = 'coderoof-progress';
  let done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  function saveProgress() {
    localStorage.setItem(KEY, JSON.stringify([...done]));
    updateProgressBar();
  }
  function updateProgressBar() {
    let num, den, label;
    if (currentCourseId) {
      const c = courseOf(currentCourseId);
      num = courseDone(c); den = courseTotal(c);
      label = 'this course: ';
    } else {
      num = done.size; den = TOTAL;
      label = 'all courses: ';
    }
    const pct = den ? Math.round(num / den * 100) : 0;
    $('progress-fill').style.width = pct + '%';
    $('progress-text').textContent = label + pct + '% — ' + num + '/' + den + ' lessons';
  }

  function markDone(id) {
    if (done.has(id)) return;
    done.add(id);
    saveProgress();
    buildNav();
    const c = currentCourseId && courseOf(currentCourseId);
    if (c && courseDone(c) === courseTotal(c)) toast('🏆 Course complete! Incredible work.');
    else if (DDS.some(d => d.id === id)) toast('✓ Attic explored! Serious dedication.');
    else toast('✓ Lesson complete! Nice work.');
  }

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.hidden = true, 3200);
  }

  // ---------- course theming ----------
  function applyTheme() {
    if (currentCourseId) document.body.dataset.course = currentCourseId;
    else delete document.body.dataset.course;
  }

  // ---------- Pyodide (real Python) ----------
  let pyodide = null, pyLoading = null;
  window.loadPy = function () {
    if (pyodide) return Promise.resolve(pyodide);
    if (pyLoading) return pyLoading;
    $('py-status').hidden = false;
    pyLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      s.onload = async () => {
        try {
          pyodide = await loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
          // route input() to a browser dialog so beginner programs just work
          pyodide.runPython(
            'import builtins, js\n' +
            'def _input(prompt=""):\n' +
            '    r = js.window.prompt(str(prompt))\n' +
            '    return "" if r is None else r\n' +
            'builtins.input = _input\n'
          );
          $('py-status').textContent = 'Python ready ✓';
          setTimeout(() => $('py-status').hidden = true, 3000);
          resolve(pyodide);
        } catch (e) { $('py-status').textContent = 'Python failed to load'; reject(e); }
      };
      s.onerror = () => { $('py-status').textContent = 'Python failed to load (offline?)'; reject(new Error('pyodide load failed')); };
      document.head.appendChild(s);
    });
    return pyLoading;
  };

  // Flask installs on demand — it's pure Python, so micropip can fetch it from PyPI
  let flaskReady = null;
  function ensureFlask(py) {
    if (flaskReady) return flaskReady;
    flaskReady = (async () => {
      const st = $('py-status');
      st.hidden = false; st.textContent = 'Installing Flask… (one-time, a few seconds)';
      await py.loadPackage('micropip');
      await py.runPythonAsync('import micropip\nawait micropip.install("flask")');
      // app.run() would try to open a real network server, which a browser can't do —
      // replace it with a friendly pointer to the test client the lessons use
      py.runPython(
        'import flask\n' +
        'def _no_run(self, *a, **k):\n' +
        '    print("(app.run() starts a real server - that works on your own computer, not inside a web page.\\n' +
        ' Here, add  client = app.test_client()  and visit your routes with client.get(...) instead!)")\n' +
        'flask.Flask.run = _no_run\n'
      );
      st.textContent = 'Flask ready ✓';
      setTimeout(() => st.hidden = true, 3000);
    })().catch(e => {
      flaskReady = null;
      $('py-status').textContent = 'Flask failed to install (offline?)';
      throw e;
    });
    return flaskReady;
  }

  // run code, capture stdout/stderr; returns {out, err, value}
  window.runPython = async function (code) {
    const py = await window.loadPy();
    if (/(^|\n)\s*(import\s+flask|from\s+flask)/.test(code)) await ensureFlask(py);
    py.runPython('import sys, io\nsys.stdout = io.StringIO()\nsys.stderr = io.StringIO()');
    let value, err = '';
    try {
      value = await py.runPythonAsync(code);
      if (value && value.toJs) { try { value = value.toString(); } catch (_) {} }
    } catch (e) {
      const lines = String(e.message || e).trim().split('\n');
      const start = lines.findIndex(l => l.includes('File "<exec>"'));
      err = (start >= 0 ? lines.slice(start) : lines.slice(-3)).join('\n');
      value = undefined;
    }
    const out = py.runPython('sys.stdout.getvalue()');
    py.runPython('sys.stdout = sys.__stdout__\nsys.stderr = sys.__stderr__');
    return { out, err, value };
  };

  // ---------- sidebar nav ----------
  function buildNav() {
    nav.innerHTML = '';
    const homeBtn = document.createElement('button');
    homeBtn.className = 'nav-item' + (currentCourseId === null ? ' active' : '');
    homeBtn.innerHTML = '<span class="nav-check" style="border:none">🏠</span> All courses';
    homeBtn.onclick = () => { showHome(); closeSidebarMobile(); };
    nav.appendChild(homeBtn);

    COURSES.forEach(course => {
      const isOpen = course.id === currentCourseId;
      const ch = document.createElement('button');
      ch.className = 'course-head nav-course' + (isOpen ? ' open' : '');
      ch.innerHTML = '<span>' + course.icon + '  ' + course.title + '</span>' +
        '<span class="course-count">' + courseDone(course) + '/' + courseTotal(course) + '</span>';
      ch.onclick = () => { showCourse(course.id); closeSidebarMobile(); };
      nav.appendChild(ch);

      if (!isOpen) return; // discrete courses: only the active one expands

      course.modules.forEach(mod => {
        const mh = document.createElement('div');
        mh.className = 'module-head';
        mh.textContent = mod.title;
        nav.appendChild(mh);
        mod.lessons.forEach(lesson => {
          const b = document.createElement('button');
          b.className = 'nav-item' + (done.has(lesson.id) ? ' done' : '') + (lesson.id === currentId ? ' active' : '');
          b.innerHTML = '<span class="nav-check">✓</span><span>' + lesson.title + '</span>';
          b.onclick = () => { showLesson(lesson.id); closeSidebarMobile(); };
          nav.appendChild(b);
        });
      });

      const dds = courseDds(course.id);
      if (dds.length) {
        const mh = document.createElement('div');
        mh.className = 'module-head';
        mh.textContent = '🪜 The Attic';
        nav.appendChild(mh);
        dds.forEach(dd => {
          const b = document.createElement('button');
          b.className = 'nav-item' + (done.has(dd.id) ? ' done' : '') + (dd.id === currentId ? ' active' : '');
          b.innerHTML = '<span class="nav-check">✓</span><span>' + dd.icon + ' ' + dd.title + '</span>';
          b.onclick = () => { showDeepDive(dd.id); closeSidebarMobile(); };
          nav.appendChild(b);
        });
      }
    });
  }

  function closeSidebarMobile() {
    if (window.innerWidth <= 800) $('sidebar').classList.add('hidden-side');
  }

  // ---------- home (course picker) ----------
  function showHome() {
    currentId = null;
    currentCourseId = null;
    applyTheme();
    if (location.hash) history.replaceState(null, '', location.pathname);
    $('topbar-title').textContent = 'Welcome';
    buildNav();
    updateProgressBar();
    let cards = '';
    COURSES.forEach((c, i) => {
      const total = courseTotal(c), finished = courseDone(c);
      const pct = Math.round(finished / total * 100);
      cards += '<button class="course-card" data-course-card="' + c.id + '">' +
        '<div class="cc-top"><span class="cc-icon">' + c.icon + '</span>' +
        '<span class="cc-num">Course ' + (i + 1) + '</span></div>' +
        '<h2>' + c.title + '</h2><p>' + c.blurb + '</p>' +
        '<div class="cc-bar"><div class="cc-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<div class="cc-count">' + finished + ' / ' + total + ' lessons ' +
        (finished === total ? '· complete ✓' : finished ? '· continue →' : '· start →') + '</div></button>';
    });
    content.innerHTML =
      '<div class="lesson-wrap"><div class="hero">' +
      '<svg class="hero-mark" viewBox="0 0 64 64" aria-hidden="true">' +
      '<path d="M10 27 L32 8 L54 27 V54 H10 Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/>' +
      '<path d="M19 34 L27 41 L19 48" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path class="logo-cursor" d="M33 48 H45" fill="none" stroke="var(--brand)" stroke-width="4.5" stroke-linecap="round"/>' +
      '</svg>' +
      '<h1>Learn to code,<br>all under <em>one roof</em>.</h1>' +
      '<p>Three separate courses, one home. Start with the basics; then build with AI, or take your Python to the web with Flask. ' +
      'Every lesson ends with hands-on practice — a real terminal and real Python, right in your browser.</p>' +
      '</div><div class="course-cards">' + cards + '</div></div>';
    content.querySelectorAll('[data-course-card]').forEach(card =>
      card.onclick = () => showCourse(card.dataset.courseCard));
    content.scrollTop = 0;
  }

  // ---------- course overview page ----------
  function showCourse(courseId) {
    const course = courseOf(courseId);
    if (!course) return showHome();
    currentCourseId = courseId;
    currentId = null;
    applyTheme();
    if (location.hash !== '#' + courseId) history.replaceState(null, '', '#' + courseId);
    $('topbar-title').textContent = course.title;
    buildNav();
    updateProgressBar();

    const total = courseTotal(course), finished = courseDone(course);
    const flat = courseFlat(courseId);
    const next = flat.find(f => !done.has(f.lesson.id)) || flat[0];
    const btnLabel = finished === total ? 'Revisit the course' : finished ? 'Continue where you left off →' : 'Start the course →';

    let modsHtml = '';
    let n = 0;
    course.modules.forEach(mod => {
      modsHtml += '<div class="mod-block"><div class="mod-title">' + mod.title + '</div>';
      mod.lessons.forEach(lesson => {
        n++;
        modsHtml += '<button class="lesson-row' + (done.has(lesson.id) ? ' done' : '') + '" data-lesson="' + lesson.id + '">' +
          '<span class="lr-check">✓</span>' +
          '<span class="lr-num">' + n + '</span>' +
          '<span class="lr-title">' + lesson.title + '</span>' +
          '<span class="lr-min">' + lesson.minutes + ' min</span></button>';
      });
      modsHtml += '</div>';
    });

    const dds = courseDds(courseId);
    if (dds.length) {
      modsHtml += '<div class="mod-block"><div class="mod-title">🪜 The Attic — optional, go beyond</div>';
      dds.forEach(dd => {
        modsHtml += '<button class="lesson-row' + (done.has(dd.id) ? ' done' : '') + '" data-deep="' + dd.id + '">' +
          '<span class="lr-check">✓</span>' +
          '<span class="lr-num">' + dd.icon + '</span>' +
          '<span class="lr-title">' + dd.title + '</span>' +
          '<span class="lr-min">' + (dd.minutes || 15) + ' min</span></button>';
      });
      modsHtml += '</div>';
    }

    content.innerHTML = '<div class="lesson-wrap">' +
      '<div class="course-hero">' +
      '<div class="lesson-kicker">' + course.icon + ' Course ' + (COURSES.indexOf(course) + 1) + ' · ' + total + ' lessons</div>' +
      '<h1 class="lesson-title">' + course.title + '</h1>' +
      '<p class="course-blurb">' + course.blurb + '</p>' +
      '<button class="btn btn-primary" id="course-start">' + btnLabel + '</button>' +
      '</div>' + modsHtml + '</div>';

    $('course-start').onclick = () => showLesson(next.lesson.id);
    content.querySelectorAll('[data-lesson]').forEach(row =>
      row.onclick = () => showLesson(row.dataset.lesson));
    content.querySelectorAll('[data-deep]').forEach(row =>
      row.onclick = () => showDeepDive(row.dataset.deep));
    content.scrollTop = 0;
  }

  // ---------- lesson ----------
  function showLesson(id) {
    const gi = FLAT.findIndex(f => f.lesson.id === id);
    if (gi === -1) return showHome();
    const { course, mod, lesson } = FLAT[gi];
    currentId = id;
    currentCourseId = course.id;
    applyTheme();
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    $('topbar-title').textContent = course.title + ' · ' + lesson.title;
    buildNav();
    updateProgressBar();

    const flat = courseFlat(course.id);
    const idx = flat.findIndex(f => f.lesson.id === id);

    let html = '<div class="lesson-wrap">' +
      '<div class="lesson-kicker">' + course.title + ' — ' + mod.title + '</div>' +
      '<h1 class="lesson-title">' + lesson.title + '</h1>' +
      '<div class="lesson-meta">≈ ' + lesson.minutes + ' min · lesson ' + (idx + 1) + ' of ' + flat.length +
      (done.has(id) ? ' · <span style="color:var(--green)">✓ completed</span>' : '') + '</div>' +
      '<div class="lesson-body">' + lesson.html + '</div>' +
      exploreHTML(lesson) +
      exerciseHTML(lesson) +
      navHTML(flat, idx) +
      '</div>';
    content.innerHTML = html;
    const exBtn = $('explore-btn');
    if (exBtn) exBtn.onclick = () => showDeepDive(lesson.explore.id, lesson.id);
    wireExercise(lesson);
    wireNav(flat, idx);
    content.scrollTop = 0;
  }

  // ---------- explore more / deep dives ----------
  function exploreHTML(lesson) {
    if (!lesson.explore || typeof DEEPDIVES === 'undefined' || !DEEPDIVES[lesson.explore.id]) return '';
    const dd = DEEPDIVES[lesson.explore.id];
    const ddDone = done.has(lesson.explore.id);
    return '<button class="explore-cta" id="explore-btn">' +
      '<span class="ec-icon">' + dd.icon + '</span>' +
      '<span class="ec-text"><span class="ec-kicker">Explore more · from the Attic' +
      (ddDone ? ' · <span style="color:var(--green)">✓ completed</span>' : '') + '</span>' +
      '<span class="ec-title">' + lesson.explore.label + '</span>' +
      '<span class="ec-desc">' + lesson.explore.desc + '</span></span>' +
      '<span class="ec-arrow">→</span></button>';
  }

  function showDeepDive(ddId, fromLessonId) {
    const dd = DEEPDIVES[ddId];
    if (!dd) return showHome();
    const backId = fromLessonId || dd.back;
    currentCourseId = dd.course || currentCourseId;
    currentId = ddId;
    applyTheme();
    if (location.hash !== '#' + ddId) history.replaceState(null, '', '#' + ddId);
    $('topbar-title').textContent = 'The Attic · ' + dd.title;
    buildNav();
    updateProgressBar();

    const isDone = done.has(ddId);
    const backBtn = '<button class="btn btn-outline dd-back">← Back to the lesson</button>';
    const doneBtn = isDone
      ? '<button class="btn btn-primary" disabled>✓ Completed</button>'
      : '<button class="btn btn-primary" id="dd-done">Mark as complete ✓</button>';
    content.innerHTML = '<div class="lesson-wrap">' +
      '<div class="lesson-kicker">' + dd.icon + ' From the Attic — reference, come back anytime</div>' +
      '<h1 class="lesson-title">' + dd.title + '</h1>' +
      '<div class="lesson-meta">≈ ' + (dd.minutes || 15) + ' min · counts toward your progress' +
      (isDone ? ' · <span style="color:var(--green)">✓ completed</span>' : '') + '</div>' +
      '<div class="lesson-meta">' + backBtn + '</div>' +
      '<div class="lesson-body">' + dd.html + '</div>' +
      '<div class="lesson-nav">' + backBtn + doneBtn + '</div></div>';
    content.querySelectorAll('.dd-back').forEach(b => b.onclick = () => showLesson(backId));
    const db = $('dd-done');
    if (db) db.onclick = () => {
      markDone(ddId);
      const scroll = content.scrollTop;
      showDeepDive(ddId, backId);
      content.scrollTop = scroll;
    };
    content.scrollTop = 0;
  }

  function navHTML(flat, idx) {
    const prev = flat[idx - 1], next = flat[idx + 1];
    return '<div class="lesson-nav">' +
      (prev ? '<button class="btn btn-outline" id="nav-prev">← ' + prev.lesson.title + '</button>' : '<span></span>') +
      (next ? '<button class="btn btn-primary" id="nav-next">' + next.lesson.title + ' →</button>'
            : '<button class="btn btn-primary" id="nav-finish">Finish course 🎉</button>') +
      '</div>';
  }
  function wireNav(flat, idx) {
    const p = $('nav-prev'), n = $('nav-next'), f = $('nav-finish');
    if (p) p.onclick = () => showLesson(flat[idx - 1].lesson.id);
    if (n) n.onclick = () => showLesson(flat[idx + 1].lesson.id);
    if (f) f.onclick = () => showCourse(flat[idx].course.id);
  }

  // ---------- exercises ----------
  function exerciseHTML(lesson) {
    const ex = lesson.exercise;
    if (!ex) return '';
    const label = { terminal: 'Terminal practice', python: 'Code practice', quiz: 'Knowledge check', prompt: 'Prompt practice' }[ex.type];
    let body = '<div class="task">' + ex.task + '</div>';

    if (ex.type === 'python') {
      body += '<textarea class="code-editor" id="ex-code" spellcheck="false">' +
        (ex.starter || '').replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</textarea>' +
        '<div class="ex-actions">' +
        '<button class="btn btn-primary" id="ex-run">▶ Run</button>' +
        '<button class="btn btn-outline" id="ex-hint">Hint</button>' +
        (ex.solution ? '<button class="btn btn-outline" id="ex-sol">Show solution</button>' : '') +
        '</div><div class="run-out" id="ex-out"></div><div id="ex-result"></div>' +
        (ex.solution ? '<details class="sol" id="ex-sol-box" style="display:none"><summary>Solution</summary><pre>' +
          ex.solution.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</pre></details>' : '');
    }
    else if (ex.type === 'terminal') {
      body += '<div class="ex-actions">' +
        '<button class="btn btn-primary" id="ex-open-term">▣ Open terminal</button>' +
        '<button class="btn btn-outline" id="ex-check">Check my work</button>' +
        '<button class="btn btn-outline" id="ex-hint">Hint</button>' +
        '</div><div id="ex-result"></div>';
    }
    else if (ex.type === 'quiz') {
      ex.questions.forEach((q, qi) => {
        body += '<div class="quiz-q">' + (qi + 1) + '. ' + q.q + '</div>';
        q.options.forEach((opt, oi) => {
          body += '<button class="quiz-opt" data-q="' + qi + '" data-o="' + oi + '">' + opt + '</button>';
        });
      });
      body += '<div id="ex-result"></div>';
    }
    else if (ex.type === 'prompt') {
      body += '<textarea class="prompt-editor" id="ex-prompt" placeholder="' + (ex.placeholder || 'Write your prompt here…').replace(/"/g, '&quot;') + '"></textarea>' +
        '<div class="ex-actions">' +
        '<button class="btn btn-primary" id="ex-grade">Grade my prompt</button>' +
        '<button class="btn btn-outline" id="ex-hint">Hint</button>' +
        '</div><div id="ex-result"></div>';
    }
    return '<section class="exercise"><div class="exercise-head">' +
      '<span class="badge">Practice</span><span class="ex-title">' + label + '</span></div>' +
      '<div class="exercise-body">' + body + '</div></section>';
  }

  function showResult(pass, msg, list) {
    const box = $('ex-result');
    if (!box) return;
    box.innerHTML = '<div class="ex-result ' + (pass ? 'pass' : 'fail') + '">' + msg +
      (list && list.length ? '<ul>' + list.map(f => '<li>' + f + '</li>').join('') + '</ul>' : '') + '</div>';
  }

  function wireExercise(lesson) {
    const ex = lesson.exercise;
    if (!ex) return;
    const hintBtn = $('ex-hint');
    if (hintBtn) hintBtn.onclick = () => showResult(false, '💡 ' + (ex.hint || 'Re-read the lesson above — the answer is in there.'));

    if (ex.type === 'python') {
      const codeEl = $('ex-code'), outEl = $('ex-out'), runBtn = $('ex-run');
      codeEl.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const s = codeEl.selectionStart;
          codeEl.value = codeEl.value.slice(0, s) + '    ' + codeEl.value.slice(codeEl.selectionEnd);
          codeEl.selectionStart = codeEl.selectionEnd = s + 4;
        }
      });
      runBtn.onclick = async () => {
        runBtn.disabled = true; runBtn.textContent = '… running';
        outEl.textContent = '';
        try {
          const r = await window.runPython(codeEl.value);
          let shown = r.out || '';
          outEl.innerHTML = '';
          if (shown) outEl.appendChild(document.createTextNode(shown));
          if (r.err) {
            const e = document.createElement('span'); e.className = 'err'; e.textContent = (shown ? '\n' : '') + r.err;
            outEl.appendChild(e);
          }
          if (!shown && !r.err) outEl.textContent = '(no output — did you forget print()?)';
          if (!r.err && ex.validate && ex.validate(r.out || '', codeEl.value)) {
            showResult(true, '✓ Exercise passed!');
            markDone(lesson.id);
          } else if (!r.err && ex.validate) {
            showResult(false, 'Runs fine, but doesn\'t match the task yet. Check the instructions (or grab a Hint).');
          } else if (r.err) {
            showResult(false, 'There\'s an error — read the last line of the red text, it names the problem.');
          }
        } catch (e) {
          outEl.textContent = 'Could not run Python: ' + e.message;
        }
        runBtn.disabled = false; runBtn.textContent = '▶ Run';
      };
      const solBtn = $('ex-sol');
      if (solBtn) solBtn.onclick = () => { const b = $('ex-sol-box'); b.style.display = ''; b.open = true; };
    }

    else if (ex.type === 'terminal') {
      $('ex-open-term').onclick = () => openTerm();
      $('ex-check').onclick = () => {
        if (ex.check(Term)) { showResult(true, '✓ Exercise passed!'); markDone(lesson.id); }
        else showResult(false, 'Not quite yet — keep going in the terminal, then check again.');
      };
    }

    else if (ex.type === 'quiz') {
      const answered = new Set();
      content.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.onclick = () => {
          const qi = +btn.dataset.q, oi = +btn.dataset.o;
          const q = ex.questions[qi];
          content.querySelectorAll('.quiz-opt[data-q="' + qi + '"]').forEach(b => b.classList.remove('correct', 'wrong'));
          if (oi === q.a) { btn.classList.add('correct'); answered.add(qi); }
          else { btn.classList.add('wrong'); answered.delete(qi); }
          if (answered.size === ex.questions.length) {
            showResult(true, '✓ All correct!');
            markDone(lesson.id);
          }
        };
      });
    }

    else if (ex.type === 'prompt') {
      $('ex-grade').onclick = () => {
        const text = $('ex-prompt').value;
        const r = ex.grade(text);
        if (r.pass) {
          showResult(true, '✓ Strong prompt! ' + (r.feedback.length ? 'One more idea:' : 'It has everything a good prompt needs.'), r.feedback);
          markDone(lesson.id);
        } else {
          showResult(false, 'Good start — make it stronger:', r.feedback);
        }
      };
    }
  }

  // auto-check terminal exercises after every command
  window.onTerminalCommand = () => {
    if (!currentId) return;
    const f = FLAT.find(x => x.lesson.id === currentId);
    if (f && f.lesson.exercise && f.lesson.exercise.type === 'terminal' && !done.has(currentId)) {
      if (f.lesson.exercise.check(Term)) {
        Term.printHTML('<span class="t-ok">✓ Exercise complete! Check the lesson page.</span>');
        showResult(true, '✓ Exercise passed!');
        markDone(currentId);
      }
    }
  };

  // ---------- terminal panel ----------
  const termPanel = $('term-panel');
  function openTerm() {
    termPanel.hidden = false;
    $('term-input').focus();
  }
  $('toggle-term').onclick = () => {
    termPanel.hidden = !termPanel.hidden;
    if (!termPanel.hidden) $('term-input').focus();
  };
  $('term-close').onclick = () => termPanel.hidden = true;

  Term.init(termPanel, $('term-out'), $('term-input'), $('term-prompt'));

  // ---------- misc ----------
  $('menu-btn').onclick = () => $('sidebar').classList.toggle('hidden-side');
  $('reset-progress').onclick = () => {
    if (confirm('Reset all progress?')) {
      done = new Set();
      saveProgress();
      showHome();
    }
  };

  // ---------- boot ----------
  const startId = location.hash.slice(1);
  if (startId && FLAT.some(f => f.lesson.id === startId)) showLesson(startId);
  else if (startId && courseOf(startId)) showCourse(startId);
  else if (startId && typeof DEEPDIVES !== 'undefined' && DEEPDIVES[startId]) showDeepDive(startId);
  else showHome();
  saveProgress();
})();
