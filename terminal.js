/* ============ CodeRoof virtual terminal ============
   Simulated bash + git on a virtual file system, plus a
   real Python REPL (Pyodide) via the `python` command.  */

const Term = (() => {

  // ---------- virtual file system ----------
  const root = { type: 'dir', children: {} };
  function seed() {
    root.children = {
      home: { type: 'dir', children: {
        learner: { type: 'dir', children: {
          'readme.txt': { type: 'file', content: 'Welcome to the CodeRoof practice terminal!\nTry: ls, mkdir my-folder, cd my-folder, touch app.py\nType help to see every command.' },
        }}
      }}
    };
  }
  seed();

  const HOME = ['home', 'learner'];
  let cwd = [...HOME];
  let history = [];
  let histIdx = -1;
  let mode = 'shell';          // 'shell' | 'python'
  let pyBuffer = [];           // multi-line python block
  let commandLog = [];         // for lesson checks

  let outEl, inputEl, promptEl, panelEl;

  // ---------- helpers ----------
  function nodeAt(pathArr) {
    let n = root;
    for (const part of pathArr) {
      if (!n.children || !n.children[part]) return null;
      n = n.children[part];
    }
    return n;
  }
  function resolve(pathStr) {
    if (!pathStr) return [...cwd];
    let parts;
    if (pathStr.startsWith('/')) parts = [];
    else if (pathStr.startsWith('~')) { parts = [...HOME]; pathStr = pathStr.slice(1); }
    else parts = [...cwd];
    for (const seg of pathStr.split('/')) {
      if (!seg || seg === '.') continue;
      else if (seg === '..') parts.pop();
      else parts.push(seg);
    }
    return parts;
  }
  function displayPath() {
    const p = '/' + cwd.join('/');
    const h = '/' + HOME.join('/');
    return p === h ? '~' : p.startsWith(h + '/') ? '~' + p.slice(h.length) : p;
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------- output ----------
  function print(text, cls) {
    const span = document.createElement('span');
    if (cls) span.className = cls;
    span.innerHTML = esc(text) + '\n';
    outEl.appendChild(span);
    outEl.parentElement.scrollTop = outEl.parentElement.scrollHeight;
  }
  function printHTML(html) {
    const span = document.createElement('span');
    span.innerHTML = html + '\n';
    outEl.appendChild(span);
    outEl.parentElement.scrollTop = outEl.parentElement.scrollHeight;
  }

  // ---------- tokenizer (handles quotes) ----------
  function tokenize(line) {
    const tokens = [];
    let cur = '', q = null;
    for (const ch of line) {
      if (q) { if (ch === q) q = null; else cur += ch; }
      else if (ch === '"' || ch === "'") q = ch;
      else if (ch === ' ') { if (cur) { tokens.push(cur); cur = ''; } }
      else cur += ch;
    }
    if (cur) tokens.push(cur);
    return tokens;
  }

  // ---------- git simulation ----------
  function repoOf(dirNode) { return dirNode.git || null; }
  function gitCmd(args) {
    const dir = nodeAt(cwd);
    const sub = args[0];
    if (sub === 'init') {
      if (dir.git) return print('Reinitialized existing Git repository.', 't-dim');
      dir.git = { branch: 'main', branches: ['main'], staged: [], commits: [], remotes: {}, pushed: false };
      print('Initialized empty Git repository in ' + displayPath() + '/.git/', 't-ok');
      return;
    }
    const repo = repoOf(dir);
    if (!repo) return print('fatal: not a git repository (run "git init" first)', 't-err');

    switch (sub) {
      case 'status': {
        print('On branch ' + repo.branch, 't-accent');
        const files = Object.keys(dir.children).filter(f => dir.children[f].type === 'file');
        const committed = new Set(repo.commits.flatMap(c => c.files));
        const untracked = files.filter(f => !repo.staged.includes(f) && !committed.has(f));
        if (repo.staged.length) {
          print('Changes to be committed:', 't-ok');
          repo.staged.forEach(f => print('        new file:   ' + f, 't-ok'));
        }
        if (untracked.length) {
          print('Untracked files:', 't-dim');
          untracked.forEach(f => print('        ' + f, 't-err'));
          print('(use "git add <file>" to include them)', 't-dim');
        }
        if (!repo.staged.length && !untracked.length)
          print('nothing to commit, working tree clean', 't-dim');
        break;
      }
      case 'add': {
        const target = args[1];
        if (!target) return print('Nothing specified, nothing added.', 't-err');
        const files = Object.keys(dir.children).filter(f => dir.children[f].type === 'file');
        if (target === '.' || target === '-A' || target === '--all') {
          repo.staged = [...new Set([...repo.staged, ...files])];
        } else if (dir.children[target]) {
          if (!repo.staged.includes(target)) repo.staged.push(target);
        } else return print("fatal: pathspec '" + target + "' did not match any files", 't-err');
        break; // git add is silent on success, just like the real thing
      }
      case 'commit': {
        const mIdx = args.indexOf('-m');
        if (mIdx === -1 || !args[mIdx + 1])
          return print('error: you need a message — try: git commit -m "my message"', 't-err');
        if (!repo.staged.length)
          return print('nothing to commit (use "git add" to stage files first)', 't-err');
        const msg = args[mIdx + 1];
        const hash = Math.random().toString(16).slice(2, 9);
        repo.commits.push({ hash, msg, files: [...repo.staged], branch: repo.branch, date: new Date() });
        print('[' + repo.branch + ' ' + hash + '] ' + msg, 't-ok');
        print(' ' + repo.staged.length + ' file(s) changed', 't-dim');
        repo.staged = [];
        break;
      }
      case 'log': {
        if (!repo.commits.length) return print('fatal: no commits yet', 't-err');
        [...repo.commits].reverse().forEach(c => {
          print('commit ' + c.hash + ' (' + c.branch + ')', 't-accent');
          print('Date:   ' + c.date.toLocaleString(), 't-dim');
          print('\n    ' + c.msg + '\n');
        });
        break;
      }
      case 'branch': {
        if (!args[1]) {
          repo.branches.forEach(b => print((b === repo.branch ? '* ' : '  ') + b, b === repo.branch ? 't-ok' : ''));
        } else {
          if (!repo.branches.includes(args[1])) repo.branches.push(args[1]);
        }
        break;
      }
      case 'checkout':
      case 'switch': {
        let name = args[1];
        if (name === '-b' || name === '-c') {
          name = args[2];
          if (!name) return print('error: branch name required', 't-err');
          if (!repo.branches.includes(name)) repo.branches.push(name);
        }
        if (!repo.branches.includes(name))
          return print("error: branch '" + name + "' not found (create it with git checkout -b " + name + ')', 't-err');
        repo.branch = name;
        print("Switched to branch '" + name + "'", 't-ok');
        break;
      }
      case 'remote': {
        if (args[1] === 'add' && args[2] && args[3]) {
          repo.remotes[args[2]] = args[3];
          print('', 't-dim');
        } else if (args[1] === '-v' || !args[1]) {
          Object.entries(repo.remotes).forEach(([n, u]) => print(n + '\t' + u + ' (fetch/push)'));
          if (!Object.keys(repo.remotes).length) print('(no remotes yet — add one with git remote add origin <url>)', 't-dim');
        }
        break;
      }
      case 'push': {
        if (!Object.keys(repo.remotes).length)
          return print('fatal: no remote configured. Try: git remote add origin https://github.com/you/repo.git', 't-err');
        if (!repo.commits.length)
          return print('error: nothing to push — make a commit first', 't-err');
        repo.pushed = true;
        print('Enumerating objects: ' + (repo.commits.length * 3) + ', done.', 't-dim');
        print('Writing objects: 100% — done.', 't-dim');
        print('To ' + Object.values(repo.remotes)[0], 't-dim');
        print(' * [new branch]      ' + repo.branch + ' -> ' + repo.branch, 't-ok');
        print('🎉 Pushed! (simulated — on a real machine this uploads to GitHub)', 't-ok');
        break;
      }
      case 'clone':
        print('Cloning is simulated here — on a real machine this downloads a repo from GitHub.', 't-dim');
        break;
      default:
        print("git: '" + (sub || '') + "' is not a git command this practice terminal knows.", 't-err');
    }
  }

  // ---------- nano editor ----------
  let nanoOpen = false;
  function openNano(fname, parent, name) {
    const existing = parent.children[name];
    const isNew = !existing;
    const box = document.createElement('div');
    box.className = 'nano';
    box.innerHTML =
      '<div class="nano-head"><span>GNU nano (CodeRoof edition)</span><span class="nano-file"></span></div>' +
      '<textarea class="nano-text" spellcheck="false" autocapitalize="off"></textarea>' +
      '<div class="nano-foot">' +
      '<button class="nano-btn" data-act="save"><b>^O</b> Write Out</button>' +
      '<button class="nano-btn" data-act="exit"><b>^X</b> Exit</button>' +
      '<span class="nano-msg"></span></div>';
    box.querySelector('.nano-file').textContent = fname + (isNew ? ' (new file)' : '');
    const body = panelEl.querySelector('.term-body');
    body.style.display = 'none';
    panelEl.appendChild(box);
    nanoOpen = true;

    const ta = box.querySelector('.nano-text');
    const msg = box.querySelector('.nano-msg');
    ta.value = existing ? existing.content : '';
    let savedContent = ta.value;
    let msgTimer;

    function write() {
      parent.children[name] = { type: 'file', content: ta.value };
      savedContent = ta.value;
      const lines = ta.value === '' ? 0 : ta.value.split('\n').length;
      msg.textContent = 'Wrote ' + lines + ' line' + (lines === 1 ? '' : 's') + ' ✓';
      clearTimeout(msgTimer);
      msgTimer = setTimeout(() => { msg.textContent = ''; }, 2200);
    }
    function close() {
      if (ta.value !== savedContent && confirm('Save modified buffer to ' + fname + '?')) write();
      clearTimeout(msgTimer);
      panelEl.removeChild(box);
      body.style.display = '';
      nanoOpen = false;
      const f = parent.children[name];
      if (f) print('nano: ' + fname + ' saved (' + (f.content === '' ? 0 : f.content.split('\n').length) + ' lines) — try cat ' + fname, 't-dim');
      inputEl.focus();
      if (window.onTerminalCommand) window.onTerminalCommand(api);
    }
    ta.addEventListener('keydown', e => {
      if (e.ctrlKey && (e.key === 'o' || e.key === 'O')) { e.preventDefault(); write(); }
      else if (e.ctrlKey && (e.key === 'x' || e.key === 'X')) { e.preventDefault(); close(); }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });
    box.querySelector('[data-act="save"]').onclick = write;
    box.querySelector('[data-act="exit"]').onclick = close;
    ta.focus();
  }

  function viewLines(args, which) {
    let n = 10, file = args[0];
    if (args[0] === '-n') { n = parseInt(args[1], 10) || 10; file = args[2]; }
    if (!file) return print(which + ': missing file name', 't-err');
    const node = nodeAt(resolve(file));
    if (!node) return print(which + ': no such file: ' + file, 't-err');
    if (node.type === 'dir') return print(which + ': ' + file + ' is a directory', 't-err');
    const lines = (node.content || '').split('\n');
    (which === 'head' ? lines.slice(0, n) : lines.slice(-n)).forEach(l => print(l));
  }

  // ---------- shell commands ----------
  const commands = {
    help() {
      printHTML('<span class="t-accent">Files:</span>    ls, cd, pwd, mkdir, touch, cat, echo, rm, cp, mv, tree');
      printHTML('<span class="t-accent">Edit:</span>     nano &lt;file&gt;   (tiny text editor — Ctrl+O saves, Ctrl+X exits)');
      printHTML('<span class="t-accent">Inspect:</span>  head, tail, grep, wc, history');
      printHTML('<span class="t-accent">Git:</span>      git init | status | add | commit -m "msg" | log | branch | checkout | remote add | push');
      printHTML('<span class="t-accent">Python:</span>   python   (opens a real Python REPL — exit() to leave)');
      printHTML('<span class="t-accent">Other:</span>    clear, whoami, date, help');
    },
    clear() { outEl.innerHTML = ''; },
    pwd() { print('/' + cwd.join('/')); },
    whoami() { print('learner'); },
    date() { print(new Date().toString()); },
    ls(args) {
      const n = nodeAt(resolve(args[0]));
      if (!n) return print('ls: no such file or directory', 't-err');
      if (n.type === 'file') return print(args[0]);
      const names = Object.keys(n.children);
      if (!names.length) return;
      printHTML(names.map(name =>
        n.children[name].type === 'dir'
          ? '<span class="t-accent">' + esc(name) + '/</span>'
          : esc(name)
      ).join('  '));
    },
    cd(args) {
      if (!args[0]) { cwd = [...HOME]; return; }
      const p = resolve(args[0]);
      const n = nodeAt(p);
      if (!n) return print('cd: no such directory: ' + args[0], 't-err');
      if (n.type !== 'dir') return print('cd: not a directory: ' + args[0], 't-err');
      cwd = p;
    },
    mkdir(args) {
      if (!args[0]) return print('mkdir: missing folder name', 't-err');
      const p = resolve(args[0]);
      const name = p.pop();
      const parent = nodeAt(p);
      if (!parent) return print('mkdir: invalid path', 't-err');
      if (parent.children[name]) return print('mkdir: ' + name + ' already exists', 't-err');
      parent.children[name] = { type: 'dir', children: {} };
    },
    touch(args) {
      if (!args[0]) return print('touch: missing file name', 't-err');
      const p = resolve(args[0]);
      const name = p.pop();
      const parent = nodeAt(p);
      if (!parent) return print('touch: invalid path', 't-err');
      if (!parent.children[name]) parent.children[name] = { type: 'file', content: '' };
    },
    cat(args) {
      if (!args[0]) return print('cat: missing file name', 't-err');
      const n = nodeAt(resolve(args[0]));
      if (!n) return print('cat: no such file: ' + args[0], 't-err');
      if (n.type === 'dir') return print('cat: ' + args[0] + ' is a directory', 't-err');
      print(n.content || '(empty file)');
    },
    echo(args, rawLine) {
      // support: echo "text" > file.txt
      const gt = args.indexOf('>');
      if (gt !== -1) {
        const text = args.slice(0, gt).join(' ');
        const fname = args[gt + 1];
        if (!fname) return print('echo: missing file after >', 't-err');
        const p = resolve(fname); const name = p.pop();
        const parent = nodeAt(p);
        if (!parent) return print('echo: invalid path', 't-err');
        parent.children[name] = { type: 'file', content: text };
        return;
      }
      print(args.join(' '));
    },
    nano(args) {
      const target = args[0];
      if (!target) return print('nano: which file? try: nano notes.txt', 't-err');
      const p = resolve(target);
      const name = p.pop();
      const parent = nodeAt(p);
      if (!parent || parent.type !== 'dir') return print('nano: invalid path: ' + target, 't-err');
      const existing = parent.children[name];
      if (existing && existing.type === 'dir') return print('nano: ' + target + ' is a directory', 't-err');
      openNano(target, parent, name);
    },
    cp(args) {
      if (args.length < 2) return print('cp: usage: cp <source> <destination>', 't-err');
      const sp = resolve(args[0]);
      const src = nodeAt(sp);
      if (!src) return print('cp: no such file: ' + args[0], 't-err');
      if (src.type === 'dir') return print('cp: directories not supported here — copy files one by one', 't-err');
      const dnode = nodeAt(resolve(args[1]));
      let name, parent;
      if (dnode && dnode.type === 'dir') { parent = dnode; name = sp[sp.length - 1]; }
      else { const dp = resolve(args[1]); name = dp.pop(); parent = nodeAt(dp); }
      if (!parent || parent.type !== 'dir') return print('cp: invalid destination: ' + args[1], 't-err');
      parent.children[name] = { type: 'file', content: src.content };
    },
    mv(args) {
      if (args.length < 2) return print('mv: usage: mv <source> <destination>', 't-err');
      const srcPath = resolve(args[0]);
      const src = nodeAt(srcPath);
      if (!src) return print('mv: no such file or directory: ' + args[0], 't-err');
      const srcName = srcPath[srcPath.length - 1];
      const srcParent = nodeAt(srcPath.slice(0, -1));
      const dnode = nodeAt(resolve(args[1]));
      let name, parentPath;
      if (dnode && dnode.type === 'dir') { parentPath = resolve(args[1]); name = srcName; }
      else { parentPath = resolve(args[1]); name = parentPath.pop(); }
      const parent = nodeAt(parentPath);
      if (!parent || parent.type !== 'dir') return print('mv: invalid destination: ' + args[1], 't-err');
      if (src.type === 'dir' && srcPath.every((seg, i) => parentPath[i] === seg))
        return print('mv: cannot move a folder into itself', 't-err');
      if (parent === srcParent && name === srcName) return; // mv onto itself: no-op
      parent.children[name] = src;
      delete srcParent.children[srcName];
    },
    head(args) { viewLines(args, 'head'); },
    tail(args) { viewLines(args, 'tail'); },
    grep(args) {
      if (args.length < 2) return print('grep: usage: grep <text> <file>', 't-err');
      const node = nodeAt(resolve(args[1]));
      if (!node) return print('grep: no such file: ' + args[1], 't-err');
      if (node.type === 'dir') return print('grep: ' + args[1] + ' is a directory', 't-err');
      const hits = (node.content || '').split('\n').filter(l => l.includes(args[0]));
      if (!hits.length) return print('(no matches)', 't-dim');
      hits.forEach(l =>
        printHTML(esc(l).split(esc(args[0])).join('<span class="t-accent">' + esc(args[0]) + '</span>')));
    },
    wc(args) {
      if (!args[0]) return print('wc: missing file name', 't-err');
      const node = nodeAt(resolve(args[0]));
      if (!node) return print('wc: no such file: ' + args[0], 't-err');
      if (node.type === 'dir') return print('wc: ' + args[0] + ' is a directory', 't-err');
      const c = node.content || '';
      const lines = c === '' ? 0 : c.split('\n').length;
      const words = c.trim() === '' ? 0 : c.trim().split(/\s+/).length;
      print(lines + ' lines   ' + words + ' words   ' + c.length + ' chars   ' + args[0]);
    },
    history() {
      if (!history.length) return print('(no commands yet)', 't-dim');
      history.forEach((h, i) => print(String(i + 1).padStart(4, ' ') + '  ' + h));
    },
    rm(args) {
      let target = args[0];
      let recursive = false;
      if (target === '-r' || target === '-rf') { recursive = true; target = args[1]; }
      if (!target) return print('rm: missing file name', 't-err');
      const p = resolve(target);
      const name = p.pop();
      const parent = nodeAt(p);
      if (!parent || !parent.children[name]) return print('rm: no such file: ' + target, 't-err');
      if (parent.children[name].type === 'dir' && !recursive) return print('rm: ' + target + ' is a directory (use rm -r)', 't-err');
      delete parent.children[name];
    },
    tree(args, _raw, prefix = '', node = null) {
      const n = node || nodeAt(cwd);
      if (!node) print('.', 't-accent');
      Object.entries(n.children).forEach(([name, child], i, arr) => {
        const last = i === arr.length - 1;
        print(prefix + (last ? '└── ' : '├── ') + name + (child.type === 'dir' ? '/' : ''));
        if (child.type === 'dir') commands.tree(args, _raw, prefix + (last ? '    ' : '│   '), child);
      });
    },
    git(args) { gitCmd(args); },
    async python() {
      print('Loading Python… (first time takes a few seconds)', 't-dim');
      try {
        await window.loadPy();
      } catch (e) {
        return print('Could not load Python. Are you online? (Pyodide loads from a CDN)', 't-err');
      }
      mode = 'python';
      pyBuffer = [];
      print('Python 3 (Pyodide) — real Python in your browser!', 't-ok');
      print('Type exit() to return to the shell.', 't-dim');
      updatePrompt();
    },
    exit() { print('This is the shell — nothing to exit. (In Python mode, exit() leaves the REPL.)', 't-dim'); },
  };
  commands['ll'] = commands.ls;

  // ---------- python REPL ----------
  async function runPyLine(line) {
    if (line.trim() === 'exit()' || line.trim() === 'exit' || line.trim() === 'quit()') {
      mode = 'shell'; pyBuffer = [];
      print('Back to the shell. 👋', 't-dim');
      updatePrompt();
      return;
    }
    // multi-line blocks: keep buffering while line ends with ':' or we're inside a block
    if (pyBuffer.length) {
      if (line.trim() === '') {
        const code = pyBuffer.join('\n');
        pyBuffer = [];
        updatePrompt();
        await execPy(code);
      } else {
        pyBuffer.push(line);
      }
      return;
    }
    if (line.trimEnd().endsWith(':')) {
      pyBuffer.push(line);
      updatePrompt();
      return;
    }
    await execPy(line);
  }
  async function execPy(code) {
    try {
      const result = await window.runPython(code);
      if (result.out) print(result.out.replace(/\n$/, ''));
      if (result.err) print(result.err, 't-err');
      else if (result.value !== undefined && result.value !== null && String(result.value) !== 'undefined')
        print(String(result.value), 't-accent');
    } catch (e) {
      print(String(e.message || e).split('\n').slice(-3).join('\n'), 't-err');
    }
  }

  // ---------- input handling ----------
  function promptStr() {
    if (mode === 'python') return pyBuffer.length ? '...' : '>>>';
    return 'learner@coderoof:' + displayPath() + '$';
  }
  function updatePrompt() { promptEl.textContent = promptStr(); }

  async function submit() {
    const line = inputEl.value;
    inputEl.value = '';
    printHTML('<span class="t-prompt">' + esc(promptStr()) + '</span> <span class="t-cmd">' + esc(line) + '</span>');

    if (mode === 'python') { await runPyLine(line); return; }

    const trimmed = line.trim();
    if (!trimmed) return;
    history.push(trimmed); histIdx = history.length;
    commandLog.push(trimmed);

    const tokens = tokenize(trimmed);
    const cmd = tokens[0];
    const fn = commands[cmd];
    if (fn) await fn(tokens.slice(1), trimmed);
    else print(cmd + ': command not found — type help to see available commands', 't-err');

    updatePrompt();
    if (window.onTerminalCommand) window.onTerminalCommand(api);
  }

  // ---------- public API ----------
  const api = {
    init(panel, out, input, prompt) {
      panelEl = panel; outEl = out; inputEl = input; promptEl = prompt;
      updatePrompt();
      printHTML('<span class="t-ok">Welcome to the CodeRoof practice terminal.</span>');
      printHTML('<span class="t-dim">Type <span class="t-accent">help</span> to see what you can do. Everything here is a safe sandbox.</span>');
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') submit();
        else if (e.key === 'ArrowUp') {
          if (histIdx > 0) { histIdx--; inputEl.value = history[histIdx] || ''; }
          e.preventDefault();
        } else if (e.key === 'ArrowDown') {
          if (histIdx < history.length) { histIdx++; inputEl.value = history[histIdx] || ''; }
          e.preventDefault();
        }
      });
      panel.querySelector('.term-body').addEventListener('click', () => input.focus());
    },
    print, printHTML,
    get cwd() { return cwd; },
    get log() { return commandLog; },
    nodeAt, resolve,
    get home() { return nodeAt(HOME); },
    // find any repo in the FS that matches a predicate — used by lesson checks
    findRepo(pred) {
      let found = null;
      (function walk(n) {
        if (found) return;
        if (n.git && pred(n.git, n)) { found = n.git; return; }
        if (n.children) Object.values(n.children).forEach(walk);
      })(root);
      return found;
    },
    findNode(pred) {
      let found = null;
      (function walk(n, name) {
        if (found) return;
        if (pred(n, name)) { found = n; return; }
        if (n.children) Object.entries(n.children).forEach(([k, v]) => walk(v, k));
      })(root, '');
      return found;
    },
  };
  return api;
})();
