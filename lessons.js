/* ============ CodeRoof course content ============
   Written in the style of The Odin Project:
   friendly intro → "what you'll learn" overview → tiny steps
   with every word explained → assignment → knowledge check.

   Exercise types:
     terminal — do it in the practice terminal, auto-checked
     python   — write & run real Python, output auto-checked
     quiz     — quick multiple choice
     prompt   — write an AI prompt, graded by a checklist   */

function overview(items) {
  return '<div class="overview"><div class="ov-title">What you will learn</div><ul>' +
    items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';
}

const COURSES = [

/* ================================================================
   COURSE 1 — PROGRAMMING BASICS
   ================================================================ */
{
  id: 'basics',
  title: 'Programming Basics',
  icon: '⌨',
  blurb: 'Start from absolute zero. Terminal, Git, GitHub and Python — explained like you have never touched code before.',
  modules: [

  /* ---------- MODULE: Getting started ---------- */
  { title: 'Getting started', lessons: [

  {
    id: 'what-is-programming',
    title: 'What is programming?',
    minutes: 5,
    html: `
<p>Welcome! 👋 You are about to learn programming from absolute zero. No experience needed. If you can send a WhatsApp message, you can learn this.</p>
<p>So… what actually <em>is</em> programming?</p>
` + overview([
  'What programming really is (it is simpler than you think)',
  'A few words programmers use every day',
  'What you will be able to build by the end of this course',
]) + `
<h3>Programming is giving instructions</h3>
<p>Imagine teaching your friend to make tea, but your friend takes <strong>everything</strong> literally. If you say "put tea in water" without saying "boil the water first", you get cold tea. You have to spell out every single step, in order.</p>
<p>A computer is exactly that friend. It is very fast, but it has zero common sense. <strong>Programming is writing step-by-step instructions that a computer follows exactly.</strong></p>
<p>Here are two instructions written in Python, the language you will learn:</p>
<pre><code>print("Hello!")     # step 1: show the word Hello! on the screen
print(2 + 2)        # step 2: work out 2 + 2 and show the answer (4)</code></pre>
<p>The computer reads this from top to bottom, one line at a time — just like you read a recipe.</p>
<div class="note">The text after the <code>#</code> is a <strong>comment</strong> — a note for humans. The computer completely ignores it. Programmers use comments to explain their code to themselves and others.</div>
<h3>Five words you will hear constantly</h3>
<ul>
<li><strong>Code</strong> — the instructions you write. That's it. Code = instructions.</li>
<li><strong>Program</strong> — a complete set of instructions that does something useful, like a calculator or a game.</li>
<li><strong>Run</strong> — telling the computer "okay, follow these instructions now".</li>
<li><strong>Programming language</strong> — the special "language" you write instructions in. We will use <strong>Python</strong> because it looks almost like normal English.</li>
<li><strong>Bug</strong> — a mistake in your code. Here's a secret: <em>everyone</em> writes bugs. Beginners, experts, people at Google — every single day. Fixing bugs is a normal part of the job, not a sign you are bad at this.</li>
</ul>
<h3>What's under this roof</h3>
<p>Here is your journey, in order. Each step builds on the one before it:</p>
<ol>
<li><strong>The terminal</strong> — the "chat box" programmers use to talk to the computer</li>
<li><strong>Git and GitHub</strong> — how to save your work and show it to the world</li>
<li><strong>Python</strong> — your first programming language</li>
<li><strong>Three real projects</strong> — a calculator, a guessing game, and a to-do list</li>
<li><strong>Vibe coding</strong> — the second course: building things with AI helping you</li>
</ol>
<div class="tip">You do NOT need to memorize anything here. Real programmers google things all day long. Your job is just to understand the ideas — the details you can always look up.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Knowledge check — no pressure, you can retry as many times as you like:',
      questions: [
        { q: 'A computer follows your instructions…', options: ['In whatever order it feels like', 'One line at a time, from top to bottom', 'All at once'], a: 1 },
        { q: 'A "bug" is…', options: ['A virus someone sent you', 'A mistake in code — totally normal, everyone makes them', 'A sign you should give up'], a: 1 },
      ]
    }
  },

  {
    id: 'terminal-basics',
    title: 'The terminal — talking to your computer',
    minutes: 12,
    explore: { id: 'deep-terminal', label: 'The Terminal, beginner to pro', desc: 'Every essential daily-use command — searching, pipes, shortcuts, safety and more.' },
    html: `
<p>You know how hackers in movies type green text into a black window? That black window is real, it is called the <strong>terminal</strong> — and it is far less scary than the movies make it look.</p>
` + overview([
  'What the terminal is and why programmers love it',
  'How to move around folders by typing',
  'How to create folders and files without touching the mouse',
]) + `
<h3>What is the terminal?</h3>
<p>Normally you control your computer by clicking things — folders, icons, buttons. The terminal is another way: instead of clicking, you <strong>type short commands</strong>.</p>
<p>Think of it like texting your computer. You type a command, press Enter, and the computer replies. That's the whole idea.</p>
<p>Why bother, when clicking works? Because typing is faster, more precise, and — most importantly — <strong>all the tools programmers use live in the terminal</strong>. Git (next lesson), Python, AI coding tools… all of them. You cannot avoid it, so let's make friends with it early.</p>
<h3>Folders are the same, just with typing</h3>
<p>You already understand folders: they contain files and other folders. The terminal just gives them typed commands. Here are the only ones you need for now:</p>
<pre><code>pwd            # "where am I right now?" (shows the current folder)
ls             # "what is inside this folder?" (list)
cd projects    # "go into the folder called projects"
cd ..          # "go back / up one level"
mkdir app      # "make a new folder called app"
touch main.py  # "make a new empty file called main.py"
cat notes.txt  # "show me what is written inside notes.txt"</code></pre>
<p>Don't try to memorize them — you'll use them so often they'll stick by themselves.</p>
<h3>Watch a real session</h3>
<p>Here is what it looks like when someone creates a project folder. Read it line by line:</p>
<pre><code>$ pwd
/home/learner              ← the computer answers: "you are in /home/learner"
$ mkdir my-first-project   ← make a folder
$ cd my-first-project      ← step inside it
$ touch app.py             ← create an empty file
$ ls
app.py                     ← the computer confirms: the file is there</code></pre>
<div class="note">The <code>$</code> at the start of a line is called the <strong>prompt</strong>. It is the terminal saying "your turn, type something". You never type the <code>$</code> yourself — only what comes after it.</div>
<div class="tip">Made a typo? Press the <strong>↑ (up arrow)</strong> key — it brings back the last command you typed so you can fix it. Programmers press ↑ hundreds of times a day.</div>
<h3>Don't worry about breaking anything</h3>
<p>The practice terminal on this site is a <strong>sandbox</strong> — a safe pretend computer inside the page. Nothing you type can harm your real computer. Type anything, break everything, experiment freely. That is exactly how you learn.</p>`,
    exercise: {
      type: 'terminal',
      task: `<strong>Your assignment:</strong> click the <strong>▣ Terminal</strong> button (top right of this page) and type these commands one at a time, pressing Enter after each:
<ol>
<li><code>pwd</code> — see where you are</li>
<li><code>mkdir projects</code> — make a folder called projects</li>
<li><code>cd projects</code> — go inside it</li>
<li><code>touch hello.txt</code> — create a file called hello.txt</li>
<li><code>ls</code> — check the file is really there</li>
</ol>
The moment you finish, this lesson marks itself complete automatically. ✨`,
      check(term) {
        const projects = term.home && term.home.children && term.home.children.projects;
        return !!(projects && projects.type === 'dir' && projects.children['hello.txt']);
      },
      hint: 'Type each command exactly, one per line: mkdir projects → cd projects → touch hello.txt. Watch for typos!'
    }
  },

  {
    id: 'file-extensions',
    title: 'File extensions — .py, .txt and friends',
    minutes: 8,
    html: `
<p>In the last lesson you created <code>hello.txt</code> — but why the <code>.txt</code>? What is that dot-something at the end of every file name? Time to decode it, because you are about to meet a lot of them.</p>
` + overview([
  'What a file extension is and what it actually does',
  'The extensions you will meet constantly as a programmer',
  'The truth: an extension is a label, not magic',
]) + `
<h3>The name tag after the dot</h3>
<p>A file name has two parts: <code>hello</code> <strong>.</strong> <code>txt</code> — the name you chose, and the <strong>extension</strong> after the last dot. The extension is a <strong>name tag</strong> that announces what kind of content is inside, so your computer knows which program should open it.</p>
<ul>
<li>Double-click <code>song.mp3</code> → opens in a music player 🎵</li>
<li>Double-click <code>photo.jpg</code> → opens in an image viewer 🖼</li>
<li>Double-click <code>app.py</code> → your editor opens it, and Python can run it 🐍</li>
</ul>
<h3>The extensions programmers meet daily</h3>
<p><strong>Code files</strong> — plain text with a promise about the language inside:</p>
<pre><code>app.py        Python code           ← you write these already!
index.html    a web page's structure
style.css     a web page's styling
script.js     JavaScript (the language of web browsers)
main.c        C code ... every language has its extension</code></pre>
<p><strong>Data & text files:</strong></p>
<pre><code>notes.txt     plain text, no formatting at all
README.md     Markdown - text with simple formatting (GitHub loves these)
data.json     structured data that programs exchange
sales.csv     spreadsheet-style data (rows and commas)</code></pre>
<p><strong>Everything else you know already:</strong> <code>.jpg</code> <code>.png</code> images, <code>.mp3</code> <code>.mp4</code> media, <code>.pdf</code> documents, <code>.zip</code> compressed bundles, <code>.exe</code> Windows programs.</p>
<h3>Here is the secret: it's just a label</h3>
<p>Brace yourself: <strong>the extension does not change what is inside the file.</strong> A <code>.py</code> file and a <code>.txt</code> file are both just plain text inside. Rename <code>notes.txt</code> to <code>notes.py</code> and the contents are 100% unchanged — you only changed the name tag.</p>
<p>So why does it matter? Because <em>everyone trusts the tag</em>:</p>
<ul>
<li>Your editor sees <code>.py</code> and turns on Python colors and helpers</li>
<li>The <code>python</code> command expects to run files ending in <code>.py</code></li>
<li>Browsers expect web pages to be <code>.html</code></li>
</ul>
<p>Wrong tag = confusion. Renaming <code>song.mp3</code> to <code>song.pdf</code> doesn't create a PDF — it creates a music file that PDF readers choke on. To truly change a file's type, you must <em>convert</em> its contents, not rename it.</p>
<div class="tip">Windows hides extensions by default, which causes the classic trap: you "rename" a file to <code>notes.txt</code> and it is secretly <code>notes.txt.txt</code>. First thing programmers do on a new Windows machine: File Explorer → View → tick <strong>"File name extensions"</strong>.</div>
<div class="note">Bonus trivia: files starting with a dot (like <code>.gitignore</code> — you'll meet it in the Git page up in the Attic) are <em>hidden files</em> on Linux/Mac. Not an extension — a convention meaning "settings file, usually leave me alone". See them with <code>ls -a</code>.</div>`,
    exercise: {
      type: 'terminal',
      task: `<strong>Your assignment:</strong> build a tiny project skeleton with the right extensions. In the practice terminal:
<ol>
<li><code>mkdir website</code> and <code>cd website</code></li>
<li>Create three files: <code>touch index.html</code>, <code>touch style.css</code>, <code>touch app.py</code></li>
<li><code>ls</code> — three file types, three name tags, one folder ✓</li>
</ol>`,
      check(term) {
        const site = term.findNode((n, name) => n.type === 'dir' && n.children &&
          n.children['index.html'] && n.children['style.css'] && n.children['app.py']);
        return !!site;
      },
      hint: 'mkdir website → cd website → then three touch commands, one per file. Check with ls.'
    }
  },

  {
    id: 'git-basics',
    title: 'Git — save points for your code',
    minutes: 15,
    explore: { id: 'deep-git', label: 'Git, beginner to pro', desc: 'Undoing mistakes, comparing changes, stash, merge conflicts, .gitignore — the full daily toolkit.' },
    html: `
<p>Ever played a video game with save points? You save before a boss fight, and if things go badly, you reload and try again. Nothing is ever truly lost.</p>
<p><strong>Git gives your code save points.</strong> It is the most-used tool in all of programming, and today you will use it for the first time.</p>
` + overview([
  'What Git is and why every programmer on Earth uses it',
  'The 3-step save routine: init → add → commit',
  'How to check what is going on with git status',
]) + `
<h3>Why do you need save points?</h3>
<p>Picture this: your project works. You change some things. Now it is broken, and you cannot remember exactly what you changed. Panic. 😱</p>
<p>With Git, no panic: you saved a snapshot when it worked, so you can always go back to it. A snapshot in Git is called a <strong>commit</strong>. Remember that word — you will say it every day for the rest of your programming life.</p>
<h3>The 3-step save routine</h3>
<p>Saving with Git is always the same three steps. Here they are — read the comments carefully:</p>
<pre><code>git init                  # step 1: "Git, start watching this folder"
                          #         (you do this ONCE per project)

git add .                 # step 2: "prepare ALL my changed files for saving"
                          #         (the dot means "everything here")

git commit -m "add homepage"   # step 3: "save the snapshot!"
                               # the text in quotes is YOUR note
                               # describing what you did</code></pre>
<h3>Wait — why two steps to save? What is "add"?</h3>
<p>Fair question! Think of online shopping:</p>
<ul>
<li><code>git add</code> = putting items <strong>in your cart</strong> 🛒 (choosing what to save)</li>
<li><code>git commit</code> = pressing <strong>place order</strong> ✅ (actually saving it)</li>
</ul>
<p>The cart step exists so you can choose exactly what goes into each snapshot. As a beginner you will usually just <code>git add .</code> (everything) — and that is perfectly fine.</p>
<h3>Your two best friends: status and log</h3>
<pre><code>git status    # "what changed? what is in the cart?"
              # confused? run this. it always tells you where you stand.

git log       # "show me every snapshot I have ever saved"</code></pre>
<h3>Writing the note (commit message)</h3>
<p>The message after <code>-m</code> is for humans — mostly future-you. Compare:</p>
<ul>
<li>✅ <code>git commit -m "add login button"</code> — future-you says thanks</li>
<li>✅ <code>git commit -m "fix crash when cart is empty"</code></li>
<li>❌ <code>git commit -m "stuff"</code> — future-you says <em>what stuff?!</em> 😤</li>
</ul>
<div class="tip">When should you commit? <strong>Every time your code reaches a state you would be sad to lose.</strong> Finished a small feature? Commit. Fixed a bug? Commit. Small, frequent saves are the habit that separates beginners from pros.</div>`,
    exercise: {
      type: 'terminal',
      task: `<strong>Your assignment:</strong> make your first ever commit! In the practice terminal:
<ol>
<li><code>mkdir my-repo</code> then <code>cd my-repo</code> — a fresh folder for this</li>
<li><code>git init</code> — tell Git to watch this folder</li>
<li><code>touch index.html</code> — create a file</li>
<li><code>git status</code> — look! Git noticed your new file</li>
<li><code>git add .</code> — put it in the cart</li>
<li><code>git commit -m "first commit"</code> — save the snapshot 🎉</li>
<li><code>git log</code> — see your snapshot in history</li>
</ol>`,
      check(term) {
        return !!term.findRepo(g => g.commits.length >= 1);
      },
      hint: 'The steps in order: git init → touch index.html → git add . → git commit -m "first commit". The quotes around the message matter!'
    }
  },

  {
    id: 'git-branches',
    title: 'Branches — experiment without fear',
    minutes: 10,
    explore: { id: 'deep-git', label: 'Git, beginner to pro', desc: 'Merging branches, resolving conflicts, undoing anything — the full daily toolkit.' },
    html: `
<p>Last lesson you learned to save snapshots. Now the second big Git idea: <strong>branches</strong> — parallel universes for your code.</p>
` + overview([
  'What a branch is (parallel universe for your code)',
  'How to create one, switch between them, and why this removes all fear',
]) + `
<h3>The parallel universe trick</h3>
<p>Your project's normal timeline is a branch called <code>main</code>. Imagine you want to try a crazy new design, but you are scared of ruining what already works.</p>
<p>With a branch you say: <em>"Git, copy my universe. I'll experiment in the copy. The original stays untouched."</em></p>
<pre><code>git checkout -b crazy-idea   # create a new universe called "crazy-idea"
                             # AND jump into it (that is what -b does)

git branch                   # list all universes; the * shows where you are

git checkout main            # jump back to the original universe</code></pre>
<h3>See it in action</h3>
<ol>
<li>You are on <code>main</code>. Everything works. You commit. 💾</li>
<li><code>git checkout -b crazy-idea</code> — new universe.</li>
<li>You change everything. It's a disaster. 🔥</li>
<li><code>git checkout main</code> — …and you are home. Everything is exactly as you left it. The disaster stays quarantined in <code>crazy-idea</code> forever.</li>
</ol>
<p>And if the experiment had gone <em>well</em>? Git can pull those changes into <code>main</code> (that is called <strong>merging</strong> — you will meet it when you need it).</p>
<div class="note">Fun fact: in real companies, <strong>nobody</strong> works directly on <code>main</code>. Every feature, every fix gets its own branch, and teammates review each other's branches before merging. That is how 1000 people can work on one app without stepping on each other.</div>
<div class="tip">Branch names should say what they are for: <code>login-page</code>, <code>fix-cart-bug</code>, <code>new-design</code>. Lowercase with dashes is the usual style.</div>`,
    exercise: {
      type: 'terminal',
      task: `<strong>Your assignment:</strong> create your first parallel universe. In the repo from last lesson (type <code>cd my-repo</code> if you are not inside it):
<ol>
<li><code>git checkout -b experiment</code> — create and enter a branch called experiment</li>
<li><code>git branch</code> — see both universes; the <code>*</code> marks where you are</li>
<li><code>git checkout main</code> — travel back home</li>
</ol>`,
      check(term) {
        return !!term.findRepo(g => g.branches.length >= 2);
      },
      hint: 'First cd into a folder where you ran git init before. Then: git checkout -b experiment (the -b means "create it").'
    }
  },

  {
    id: 'github',
    title: 'GitHub — your code, online',
    minutes: 10,
    explore: { id: 'deep-github', label: 'GitHub, beginner to pro', desc: 'Creating your account, personal access tokens, SSH keys, your first real push — a full walkthrough with a demo account.' },
    html: `
<p>People mix up Git and GitHub all the time, so let's clear it up with one sentence each:</p>
<ul>
<li><strong>Git</strong> = the save-point tool <em>on your computer</em>.</li>
<li><strong>GitHub</strong> = a <em>website</em> that stores a copy of your Git projects online.</li>
</ul>
<p>Git is the camera. GitHub is the photo album you share. 📸</p>
` + overview([
  'What GitHub is for (backup, portfolio, teamwork)',
  'How to connect your project to GitHub and upload it with git push',
  'The GitHub words everyone uses: repo, clone, pull request, fork',
]) + `
<h3>Three reasons you want GitHub</h3>
<ol>
<li><strong>Backup.</strong> Laptop stolen? Chai spilled on the keyboard? Your code lives safely online.</li>
<li><strong>Portfolio.</strong> Your GitHub profile is your programmer CV. When you apply for jobs or internships, people <em>will</em> look at it. Every project you push makes it stronger.</li>
<li><strong>Teamwork.</strong> It is how basically every company and open-source project on Earth shares code.</li>
</ol>
<h3>Connecting your project (3 commands)</h3>
<p>You have a project with commits. Here is how it gets online:</p>
<pre><code># 1. On github.com, click the green "New" button to create
#    an empty repository (their word for "project space")

# 2. Tell your local Git where that online home is:
git remote add origin https://github.com/yourname/my-repo.git
#    ("remote" = the online copy, "origin" = its nickname)

# 3. Upload your commits:
git push
#    push = send my snapshots UP to GitHub</code></pre>
<p>After this one-time setup, your daily routine is just: <code>git add .</code> → <code>git commit -m "..."</code> → <code>git push</code>. Save, then upload. That's it — that is the workflow used by millions of professionals.</p>
<h3>Words you will see on GitHub</h3>
<ul>
<li><strong>Repository ("repo")</strong> — one project and its whole snapshot history.</li>
<li><strong>Clone</strong> — download a repo from GitHub to your computer.</li>
<li><strong>Pull request ("PR")</strong> — "I made changes on my branch — please review and merge them." How teams collaborate.</li>
<li><strong>Fork</strong> — your personal copy of someone else's repo, to play with freely.</li>
</ul>
<div class="tip">Do one real thing today: create a free account at <a href="https://github.com" target="_blank">github.com</a>. From now on, every project you build goes there. Future-you (and future employers) will thank you.</div>`,
    exercise: {
      type: 'terminal',
      task: `<strong>Your assignment:</strong> practice the upload flow (safely simulated — no account needed here). In a repo that has at least one commit:
<ol>
<li><code>git remote add origin https://github.com/you/my-repo.git</code> — connect the online home</li>
<li><code>git push</code> — upload! 🚀</li>
</ol>`,
      check(term) {
        return !!term.findRepo(g => g.pushed);
      },
      hint: 'cd into your repo (with a commit already made), then run the two commands from the assignment exactly as shown.'
    }
  },
  ]},

  /* ---------- MODULE: Python ---------- */
  { title: 'Python fundamentals', lessons: [

  {
    id: 'py-hello',
    title: 'Python — Hello, World!',
    minutes: 8,
    html: `
<p>The moment has arrived: you are going to write and run <strong>real code</strong>. 🎉</p>
<p>By tradition, every programmer's first program makes the computer say "Hello, World!". Millions of programmers started exactly here. Today you join them.</p>
` + overview([
  'How to make the computer display text with print()',
  'What a "function" and a "string" are (two words you will use forever)',
]) + `
<h3>Your first line of Python</h3>
<pre><code>print("Hello, World!")</code></pre>
<p>Run that, and the screen shows: <code>Hello, World!</code></p>
<p>Let's break the line into its three parts — every part matters:</p>
<ul>
<li><code>print</code> — a <strong>function</strong>: a built-in ability Python already has. This one means "show something on the screen". (It has nothing to do with paper printers!)</li>
<li><code>( )</code> — parentheses are how you <em>use</em> a function. Whatever you put inside is what the function works with.</li>
<li><code>"Hello, World!"</code> — text wrapped in quotes. Text in quotes is called a <strong>string</strong> (as in, a string of characters). The quotes tell Python "this is literal text, don't try to understand it".</li>
</ul>
<h3>Play with it</h3>
<pre><code>print("I am learning Python")   # any text you like
print(42)                       # numbers work too - no quotes needed
print(7 * 6)                    # Python does the math FIRST, prints 42
print("7 * 6")                  # with quotes it is just text: prints 7 * 6</code></pre>
<p>Notice the last two lines! Quotes = "show exactly this text". No quotes = "work this out". The <code>*</code> means multiply (there is no × key, so programmers use *).</p>
<div class="note">The editor in the assignment below runs <strong>100% real Python</strong>, right inside your browser. Everything you learn here works exactly the same on any real computer.</div>
<div class="tip">The #1 beginner error: forgetting a quote or a parenthesis. If Python complains, count your quotes and brackets first — they must come in pairs.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> make the program print <strong>two lines</strong>:
<ol><li><code>Hello, World!</code></li><li>Your own name</li></ol>
Write the code, then press <strong>▶ Run</strong> and watch it happen.`,
      starter: '# The first line is done for you.\n# Add a second print() line with your name!\n\nprint("Hello, World!")\n',
      validate(out) {
        const lines = out.trim().split('\n').filter(l => l.trim());
        return out.includes('Hello, World!') && lines.length >= 2;
      },
      hint: 'You need two print() lines. The second one looks like: print("Simal") — but with YOUR name.'
    }
  },

  {
    id: 'py-variables',
    title: 'Variables — boxes with labels',
    minutes: 12,
    html: `
<p>Programs need to remember things: a player's score, a user's name, the price of a product. In Python, you remember things by putting them in <strong>variables</strong>.</p>
` + overview([
  'How to store values in variables (labelled boxes)',
  'The 4 basic types of value: text, whole numbers, decimals, True/False',
  'The magic of f-strings — mixing variables into sentences',
]) + `
<h3>A variable is a labelled box</h3>
<p>Imagine boxes on a shelf, each with a name written on it. You can put a value in a box, look at it later, or replace it. That is literally all a variable is:</p>
<pre><code>name = "Simal"    # a box labelled "name", containing the text Simal
age = 20          # a box labelled "age", containing the number 20</code></pre>
<p>The <code>=</code> sign means <strong>"put this value into this box"</strong> (not "equals" like in math class!). Left side: the label. Right side: what goes in.</p>
<p>Once a value is in a box, use the label anywhere:</p>
<pre><code>print(name)       # shows: Simal
print(age + 5)    # shows: 25  ← Python opened the box, found 20, added 5</code></pre>
<h3>Four kinds of values</h3>
<pre><code>name = "Simal"        # text (called a "string", or str)
age = 20              # whole number (called an "int", short for integer)
height = 5.9          # decimal number (called a "float")
is_learning = True    # yes/no value (called a "bool" - True or False)</code></pre>
<p>Why care about the difference? Because <code>20 + 5</code> is 25, but <code>"20" + 5</code> is an error — Python won't add text to a number. This will matter a lot in the next lesson!</p>
<h3>f-strings — building sentences with variables</h3>
<p>You will constantly want to mix variables into text. The clean way: put an <code>f</code> before the opening quote, then wrap variable names in curly braces <code>{ }</code>:</p>
<pre><code>name = "Simal"
age = 20
print(f"My name is {name} and I am {age} years old")</code></pre>
<p>Output: <code>My name is Simal and I am 20 years old</code></p>
<p>Python sees the <code>f</code>, notices the <code>{name}</code>, opens the box called <code>name</code>, and drops the value into the sentence. Beautiful.</p>
<div class="tip">Naming rules: no spaces allowed. Python style is lowercase with underscores: <code>my_favorite_food</code>. Pick names that say what is inside — <code>score</code> beats <code>s</code>, always.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong>
<ol>
<li>Fill three boxes: <code>name</code>, <code>age</code>, and <code>city</code> (put your real info, or invent someone!)</li>
<li>Print <strong>one sentence</strong> that uses all three — with an f-string</li>
</ol>`,
      starter: 'name = "Your Name"\nage = 20\ncity = "Kochi"\n\n# Now print ONE sentence using all three boxes.\n# Remember: f before the quote, {curly braces} around box names!\n',
      validate(out, code) {
        return /f["']/.test(code) && /\{name\}|\{age\}|\{city\}/.test(code) && out.trim().length > 0;
      },
      hint: 'It looks like: print(f"I am {name}, {age} years old, from {city}") — the f before the first quote is essential!'
    }
  },

  {
    id: 'py-input',
    title: 'input() — talking with the user',
    minutes: 8,
    html: `
<p>So far your programs only talk. Now they will <strong>listen</strong>. The <code>input()</code> function asks the user a question and waits for their answer — this is the moment your programs become interactive.</p>
` + overview([
  'How to ask the user questions with input()',
  'The classic trap: input() always gives you TEXT, even when the user types a number',
]) + `
<h3>Asking a question</h3>
<pre><code>name = input("What is your name? ")
print(f"Nice to meet you, {name}!")</code></pre>
<p>What happens, step by step:</p>
<ol>
<li>Python shows <em>What is your name?</em> and <strong>pauses</strong>, waiting.</li>
<li>The user types, say, <code>Priya</code> and presses Enter.</li>
<li>Whatever they typed goes into the <code>name</code> box.</li>
<li>The program continues: <em>Nice to meet you, Priya!</em></li>
</ol>
<div class="note">On this website, <code>input()</code> pops up a small dialog box for typing. On a real computer it waits in the terminal instead. Same idea, same code.</div>
<h3>⚠️ The trap every beginner falls into</h3>
<p>Whatever the user types, <code>input()</code> hands it to you <strong>as text</strong> — a string. Even if they type <code>25</code>, you get the <em>text</em> <code>"25"</code>, not the number 25.</p>
<p>Remember from last lesson: Python refuses to do math with text. So this crashes:</p>
<pre><code>age = input("How old are you? ")
print(age + 1)      # 💥 ERROR! Cannot add a number to text</code></pre>
<p>The fix: convert the text into a number with <code>int()</code> (for whole numbers) or <code>float()</code> (for decimals):</p>
<pre><code>age = int(input("How old are you? "))    # int(...) converts "25" → 25
print(f"Next year you will be {age + 1}")  # works! shows 26</code></pre>
<p>Read <code>int(input(...))</code> from the inside out: first <code>input()</code> gets the text, then <code>int()</code> turns it into a number. You will type this pattern a thousand times.</p>
<div class="tip">Put a space at the end of your question, like <code>"Name? "</code> — otherwise the user's typing squashes right against the question mark.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> write a program that:
<ol>
<li>Asks the user for their favorite food using <code>input()</code></li>
<li>Replies with a sentence that includes their answer (f-string!)</li>
</ol>
Press ▶ Run — a dialog will pop up for you to answer your own question.`,
      starter: '# 1. ask with input(), store the answer in a box\n# 2. reply with print() and an f-string\n',
      validate(out, code) {
        return code.includes('input(') && out.trim().length > 0;
      },
      hint: 'Two lines: food = input("Favorite food? ") then print(f"Yum, {food} is delicious!")'
    }
  },

  {
    id: 'py-if',
    title: 'if / else — making decisions',
    minutes: 12,
    html: `
<p>"IF it rains, take an umbrella. OTHERWISE, wear sunglasses." You make if/else decisions all day without thinking. Today your programs learn the same trick — this is the lesson where they start feeling <em>smart</em>.</p>
` + overview([
  'How to make your program choose between paths with if / elif / else',
  'Comparing values: ==, >, <, and friends',
  'Why those spaces at the start of lines are a big deal in Python',
]) + `
<h3>Your first decision</h3>
<pre><code>age = 18

if age >= 18:
    print("You can vote!")
else:
    print("Not yet - a few more years.")</code></pre>
<p>Read it out loud: <em>"if age is at least 18, print 'You can vote!', otherwise print 'Not yet'."</em> — Python really is almost English.</p>
<p>Two small things that beginners miss, so look closely:</p>
<ul>
<li>The <strong>colon</strong> <code>:</code> at the end of the <code>if</code> and <code>else</code> lines. Forget it and Python complains.</li>
<li>The lines under them are pushed in by <strong>4 spaces</strong>. That is called <strong>indentation</strong>, and in Python it is not decoration — the indentation is how Python knows which lines belong to the if. (The editor's Tab key does it for you.)</li>
</ul>
<h3>The comparing symbols</h3>
<pre><code>==   is equal to        ← TWO equals signs!
!=   is NOT equal to
&gt;    greater than
&lt;    less than
&gt;=   greater or equal
&lt;=   less or equal</code></pre>
<div class="tip">Why two equals signs? Because one <code>=</code> already means "put value in box" (from the variables lesson). So comparing needed a different symbol: <code>==</code>. Mixing them up is the single most common beginner bug — when your if line misbehaves, check this first!</div>
<h3>More than two paths: elif</h3>
<p>Sometimes life has more than two options. <code>elif</code> (short for "else if") adds middle paths:</p>
<pre><code>score = 85

if score >= 90:
    print("Grade A")
elif score >= 75:
    print("Grade B")        # ← our score lands here
elif score >= 60:
    print("Grade C")
else:
    print("Keep practicing!")</code></pre>
<p>Python checks each condition from the top and runs the <strong>first</strong> one that is true, skipping all the rest. If none are true, <code>else</code> catches it.</p>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> the box <code>number</code> holds a number. Write if / elif / else so the program prints:
<ul>
<li><code>positive</code> if the number is more than 0</li>
<li><code>negative</code> if it is less than 0</li>
<li><code>zero</code> otherwise</li>
</ul>
Then change the value of <code>number</code> and run again — test all three paths!`,
      starter: 'number = 7\n\n# your if / elif / else here\n# (colons at line ends, 4 spaces before the print lines!)\n',
      validate(out, code) {
        return code.includes('if') && code.includes('else') && /positive|negative|zero/.test(out);
      },
      hint: 'Pattern: if number > 0: (new line, 4 spaces) print("positive") — then elif number < 0: ... then else: ...'
    }
  },

  {
    id: 'py-loops',
    title: 'Loops — repeat without repeating yourself',
    minutes: 12,
    html: `
<p>Suppose I ask you to print the numbers 1 to 100. Are you going to write 100 print lines? Of course not — you are going to write a <strong>loop</strong>: 2 lines of code that repeat as many times as you want.</p>
<p>Computers exist to repeat boring things fast. Loops are how you order them to.</p>
` + overview([
  'for loops — repeat something an exact number of times',
  'while loops — keep repeating until something changes',
  'How range() counts (it is slightly weird, but predictably weird)',
]) + `
<h3>The for loop — "do this N times"</h3>
<pre><code>for i in range(5):
    print(i)</code></pre>
<p>Output:</p>
<pre><code>0
1
2
3
4</code></pre>
<p>What is happening: <code>range(5)</code> produces the numbers 0,1,2,3,4 and the loop runs its indented lines once for each, with <code>i</code> holding the current number.</p>
<p>Two things surprise everyone at first:</p>
<ul>
<li>Counting starts at <strong>0</strong>, not 1 (computers love starting at 0 — you'll get used to it).</li>
<li><code>range(5)</code> stops <strong>before</strong> 5. It gives five numbers, just starting from 0.</li>
</ul>
<p>Want 1 to 5 instead? Give range a start and an end: <code>range(1, 6)</code> → 1,2,3,4,5. (End is still "stop before".)</p>
<h3>The while loop — "keep going until…"</h3>
<p>Use <code>while</code> when you don't know in advance how many repeats you need — you just know the condition to keep going:</p>
<pre><code>lives = 3
while lives > 0:                    # keep looping AS LONG AS this is true
    print(f"You have {lives} lives")
    lives = lives - 1               # 3 → 2 → 1 → 0, then the loop stops
print("Game over!")</code></pre>
<div class="tip">⚠️ If the condition never becomes false, the loop runs <strong>forever</strong> (an "infinite loop" — a rite of passage; every programmer has made one). Rule: something inside the loop must change the condition. Here, <code>lives</code> shrinks each round.</div>
<h3>Bonus: loop over anything</h3>
<pre><code>for letter in "hello":
    print(letter)        # prints h, e, l, l, o - one per line</code></pre>
<p>Loops can walk through strings, lists (next lesson!), and much more.</p>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> use a <code>for</code> loop with <code>range()</code> to print the numbers <strong>1 to 10</strong>, one per line. (Careful — remember how range counts!)`,
      starter: '# print 1 to 10 with a for loop\n# hint: range needs a start AND an end here\n',
      validate(out, code) {
        if (!code.includes('for')) return false;
        const nums = out.trim().split('\n').map(s => s.trim());
        for (let i = 1; i <= 10; i++) if (!nums.includes(String(i))) return false;
        return true;
      },
      hint: 'range(1, 11) gives 1 to 10 — the end number is where it STOPS, so you need one more than 10… which is 11.'
    }
  },

  {
    id: 'py-lists',
    title: 'Lists & dictionaries — organizing data',
    minutes: 14,
    html: `
<p>One variable holds one value. But real programs deal with <em>many</em>: 50 to-do tasks, 11 players, 200 products. Meet Python's two great containers: <strong>lists</strong> and <strong>dictionaries</strong>.</p>
` + overview([
  'Lists — one box holding many values in order',
  'How positions work (spoiler: counting starts at 0 again)',
  'Dictionaries — storing labelled facts about one thing',
  'When to use which',
]) + `
<h3>Lists — many values, in order</h3>
<p>A list is a row of values inside square brackets:</p>
<pre><code>foods = ["dosa", "biryani", "pizza"]</code></pre>
<p>Everything useful you can do with it:</p>
<pre><code>print(foods[0])        # dosa    ← position 0 is the FIRST item!
print(foods[1])        # biryani
print(len(foods))      # 3       ← len() = how many items
foods.append("idli")   # add to the end of the list
foods.remove("pizza")  # remove by name</code></pre>
<div class="note">Yes — positions start at 0, just like <code>range()</code>. First item = <code>[0]</code>, second = <code>[1]</code>. Every programmer has typed <code>[1]</code> expecting the first item. Once. 😄</div>
<p>And here is where last lesson pays off — loop through a list:</p>
<pre><code>for food in foods:
    print(f"I love {food}")</code></pre>
<p>The loop visits each item in order and puts it in the <code>food</code> box for that round. Lists + loops together run half the software you use daily.</p>
<h3>Dictionaries — labelled facts</h3>
<p>A list is great for <em>many similar things</em>. But how do you describe <em>one thing with several facts</em> — like a player with a name, score, and level? A <strong>dictionary</strong> stores label → value pairs:</p>
<pre><code>player = {
    "name": "Simal",
    "score": 120,
    "level": 3
}

print(player["name"])     # Simal  ← look up by label, not position
player["score"] = 150     # change a value
player["coins"] = 10      # add a brand new label</code></pre>
<p>It is called a dictionary because it works like one: you look up a word (the <strong>key</strong>) to find its meaning (the <strong>value</strong>).</p>
<h3>Which one when?</h3>
<ul>
<li>Many of the same kind of thing → <strong>list</strong>: tasks, scores, names.</li>
<li>Named facts about one thing → <strong>dictionary</strong>: a user, a product, a player.</li>
<li>They combine! A list of dictionaries = many players, each with their facts. That is how real apps store data.</li>
</ul>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong>
<ol>
<li>Make a list called <code>foods</code> with at least <strong>3</strong> foods you love</li>
<li>Use a <code>for</code> loop to print a little message about each one</li>
</ol>`,
      starter: 'foods = []  # put 3 or more foods between the brackets, in quotes, separated by commas\n\n# now loop through and print each one\n',
      validate(out, code) {
        return code.includes('[') && code.includes('for') && out.trim().split('\n').length >= 3;
      },
      hint: 'foods = ["dosa", "biryani", "idli"] — then: for food in foods: (new line, 4 spaces) print(f"I love {food}")'
    }
  },

  {
    id: 'py-functions',
    title: 'Functions — create your own commands',
    minutes: 12,
    html: `
<p>You have been <em>using</em> functions since your first lesson — <code>print()</code>, <code>input()</code>, <code>len()</code> are all functions someone made for you. Today you make your own.</p>
<p>A function is a <strong>recipe with a name</strong>: you write the steps once, then run them whenever you want by saying the name.</p>
` + overview([
  'How to define a function with def',
  'Parameters — the ingredients your recipe accepts',
  'return vs print — the difference that unlocks real programs',
]) + `
<h3>Defining your first function</h3>
<pre><code>def greet(name):
    print(f"Hello, {name}! Welcome to CodeRoof.")</code></pre>
<p>Piece by piece:</p>
<ul>
<li><code>def</code> — "I am <strong>def</strong>ining a new recipe."</li>
<li><code>greet</code> — the name you chose for it.</li>
<li><code>(name)</code> — the ingredient it needs (called a <strong>parameter</strong>). Whoever uses the recipe must supply a name.</li>
<li>The indented lines — the steps of the recipe. (Colon and 4 spaces, just like if and for!)</li>
</ul>
<p>Here is the key thing: defining the recipe <strong>does not run it</strong>. It just teaches Python the recipe. To actually run it, <strong>call</strong> it by name:</p>
<pre><code>greet("Simal")    # Hello, Simal! Welcome to CodeRoof.
greet("Priya")    # Hello, Priya! Welcome to CodeRoof.</code></pre>
<p>Write once, use forever. Same recipe, different ingredient each time.</p>
<h3>return — recipes that hand something back</h3>
<p>Some recipes don't show anything on screen — they <strong>produce a result</strong> and hand it back to your code:</p>
<pre><code>def add(a, b):
    return a + b            # hand the answer back

result = add(3, 4)          # result box now contains 7
print(result)               # 7
print(add(100, 200))        # 300 - use it anywhere</code></pre>
<h3>print vs return — get this and you're ahead of most beginners</h3>
<ul>
<li><code>print</code> shows a value <strong>to the human</strong> and it's gone.</li>
<li><code>return</code> hands the value <strong>back to your code</strong>, so you can store it, add to it, pass it to another function…</li>
</ul>
<p>A calculator's add function should <code>return</code>, so the program can keep using the answer. It becomes natural fast — and it clicks fully in the projects module, which is next!</p>
<div class="tip">Real programmer rule: if you catch yourself copy-pasting the same lines twice, stop — turn them into a function.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong>
<ol>
<li>Define a function <code>greet(name)</code> that prints a friendly greeting using the name</li>
<li>Call it at least <strong>twice</strong>, with different names</li>
</ol>
Remember: the calls go OUTSIDE the function (no indentation).`,
      starter: 'def greet(name):\n    # step of the recipe: print a greeting that uses {name}\n\n# down here (no spaces before!): call greet() twice with different names\n',
      validate(out, code) {
        return code.includes('def') && out.trim().split('\n').filter(l => l.trim()).length >= 2;
      },
      hint: 'Inside: print(f"Hello, {name}!") with 4 spaces before it. Below, at the left edge: greet("Anu") and greet("Ben").'
    }
  },

  {
    id: 'py-imports',
    title: 'import — borrow superpowers',
    minutes: 12,
    html: `
<p>Here is a huge secret of programming: <strong>you don't build everything yourself</strong>. Need random numbers? Dates? Math? Someone already wrote that code, polished it for years, and gave it to you for free. You just have to say the magic word: <code>import</code>.</p>
` + overview([
  'What a library is and how import unlocks it',
  'The random library — dice rolls, random picks, shuffles',
  'A peek at math, datetime, and the millions of libraries beyond',
]) + `
<h3>What is a library?</h3>
<p>A <strong>library</strong> (also called a module) is a collection of ready-made functions around one theme. Python comes with dozens built in. <code>import</code> loads one into your program:</p>
<pre><code>import random     # ← one line, and all its powers are yours</code></pre>
<h3>The random library — instant fun</h3>
<pre><code>import random

print(random.randint(1, 6))    # a random whole number from 1 to 6
                               # ...you just rolled a dice! 🎲

colors = ["red", "green", "blue"]
print(random.choice(colors))   # picks one item at random

names = ["Anu", "Ben", "Chris"]
random.shuffle(names)          # mixes the list into random order
print(names)</code></pre>
<p>Notice the pattern: <code>random.something()</code> — the library's name, a dot, then the function you want from it. Read the dot as "…'s": <em>random's randint</em>.</p>
<p>Run that code twice — different results each time. That tiny bit of unpredictability is how games, shuffled playlists and OTP codes work. In two lessons you will build a whole game on <code>random.randint()</code>.</p>
<h3>Two more built-in libraries worth meeting</h3>
<pre><code>import math
print(math.sqrt(144))     # 12.0 - square root
print(math.pi)            # 3.141592653589793

from datetime import datetime
print(datetime.now().year)     # the current year</code></pre>
<p>(That second style — <code>from ... import ...</code> — grabs one specific tool out of the library so you can use its name directly. You'll see both styles everywhere; they both work.)</p>
<h3>And beyond: the whole universe</h3>
<p>Besides the built-in ones, there are <strong>millions</strong> of free libraries anyone can download: <code>flask</code> builds websites, <code>pandas</code> crunches data, <code>pygame</code> makes games. On a real computer you install one by typing <code>pip install flask</code> in the terminal — then import it like any other. This is why Python people say: "there's a library for that."</p>
<div class="tip">Import lines go at the very top of your file. That's the convention everyone follows — anyone opening your code sees at a glance what it borrows.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong>
<ol>
<li><code>import random</code></li>
<li>Print a random number between 1 and 100 (that's <code>random.randint</code>)</li>
<li>Make a list of 3+ things and print a random pick from it (that's <code>random.choice</code>)</li>
</ol>
Run it several times — enjoy never getting the same answer twice. 🎲`,
      starter: 'import random\n\n# 1. print a random number from 1 to 100\n\n# 2. make a list, print one random item from it\n',
      validate(out, code) {
        return code.includes('import random') && code.includes('randint') && code.includes('choice') && out.trim().split('\n').length >= 2;
      },
      hint: 'print(random.randint(1, 100)) and then print(random.choice(["a", "b", "c"])) — with your own list of course!'
    }
  },
  ]},

  /* ---------- MODULE: Projects ---------- */
  { title: 'Build real projects', lessons: [

  {
    id: 'proj-calculator',
    title: 'Project: Calculator',
    minutes: 20,
    html: `
<p>Enough lessons — time to <strong>build</strong>. Everything you have learned is about to click together into a real, working program: a calculator that talks to the user.</p>
<p>Feeling nervous? Good, that's normal before a first project. You already know every single piece this needs. Promise.</p>
` + overview([
  'How to plan a program before writing it (pros always do this)',
  'Combining functions + input() + if/elif into one real program',
]) + `
<h3>Step 0: plan in plain English</h3>
<p>Never start by typing code. Start by writing what the program should do, as steps a human understands:</p>
<ol>
<li>Ask the user for two numbers</li>
<li>Ask which operation they want: + − × ÷</li>
<li>Calculate the answer</li>
<li>Show it nicely</li>
</ol>
<p>Now look at those steps. Ask for numbers → that's <code>input()</code> with <code>float()</code>. Choose between operations → that's <code>if/elif</code>. Calculate → little functions with <code>return</code>. <strong>You know all of it.</strong> Planning turns a scary project into a checklist of things you already know — that trick works for every project forever.</p>
<h3>Step 1: the skeleton</h3>
<p>Here is the program half-built. Read every line and check you understand it — then your assignment is to finish it:</p>
<pre><code>def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

num1 = float(input("First number: "))    # float() because 2.5 is allowed
num2 = float(input("Second number: "))
op = input("Operation (+, -, *, /): ")

if op == "+":
    print(f"Answer: {add(num1, num2)}")
elif op == "-":
    print(f"Answer: {subtract(num1, num2)}")
# your job: multiply (*) and divide (/) !</code></pre>
<h3>One professional touch</h3>
<p>What is 10 ÷ 0? There is no answer — and Python <em>crashes</em> if you ask. A pro checks for trouble before it happens:</p>
<pre><code>def divide(a, b):
    if b == 0:
        return "Cannot divide by zero!"
    return a / b</code></pre>
<p>Handling the weird cases is half of real programming. Users type the strangest things. 😅</p>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> finish the calculator!
<ul>
<li>Add <code>multiply</code> and <code>divide</code> functions</li>
<li>Add <code>elif</code> branches for <code>*</code> and <code>/</code></li>
<li>Protect against dividing by zero</li>
</ul>
Then run it and do some math! Stuck? The Hint and Solution buttons are there — using them is learning, not cheating.`,
      starter: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\n# add multiply and divide functions here\n\nnum1 = float(input("First number: "))\nnum2 = float(input("Second number: "))\nop = input("Operation (+, -, *, /): ")\n\nif op == "+":\n    print(f"Answer: {add(num1, num2)}")\nelif op == "-":\n    print(f"Answer: {subtract(num1, num2)}")\n# handle * and / here!\n',
      validate(out, code) {
        return code.includes('def') && code.includes('input(') && /Answer|answer|=/.test(out) && (code.match(/elif|if/g) || []).length >= 3;
      },
      hint: 'Copy the pattern that already works: def multiply(a, b): return a * b — then elif op == "*": print(f"Answer: {multiply(num1, num2)}"). Same for divide.',
      solution: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    if b == 0:\n        return "Cannot divide by zero!"\n    return a / b\n\nnum1 = float(input("First number: "))\nnum2 = float(input("Second number: "))\nop = input("Operation (+, -, *, /): ")\n\nif op == "+":\n    print(f"Answer: {add(num1, num2)}")\nelif op == "-":\n    print(f"Answer: {subtract(num1, num2)}")\nelif op == "*":\n    print(f"Answer: {multiply(num1, num2)}")\nelif op == "/":\n    print(f"Answer: {divide(num1, num2)}")\nelse:\n    print("Unknown operation!")'
    }
  },

  {
    id: 'proj-guessing',
    title: 'Project: Number guessing game',
    minutes: 20,
    html: `
<p>Project two: an actual <strong>game</strong>. The computer thinks of a secret number, you hunt it down with hints. Simple to build, genuinely fun to play — and it uses <code>random</code>, <code>while</code>, and <code>if/else</code> all at once.</p>
` + overview([
  'Turning game rules into code, step by step',
  'Using a while loop to repeat "until the player wins"',
  'A famous computer science trick you will discover just by playing',
]) + `
<h3>The rules</h3>
<ol>
<li>Computer secretly picks a number from 1 to 100</li>
<li>You guess</li>
<li>It answers "Higher!" or "Lower!"</li>
<li>Repeat until you hit it — then it tells you how many tries you took</li>
</ol>
<h3>Translate the rules into Python, one by one</h3>
<p><strong>"Computer secretly picks a number"</strong> — you learned this two lessons ago:</p>
<pre><code>import random
secret = random.randint(1, 100)</code></pre>
<p><strong>"You guess"</strong> — asking for a number, the classic combo:</p>
<pre><code>guess = int(input("Your guess: "))</code></pre>
<p><strong>"Repeat until correct"</strong> — repeat-until-something-changes is exactly what <code>while</code> is for. Keep looping <em>as long as the guess is wrong</em>:</p>
<pre><code>while guess != secret:          # != means "not equal"
    if guess < secret:
        print("Higher!")
    else:
        print("Lower!")
    guess = int(input("Try again: "))   # new guess, loop checks again</code></pre>
<p>When the player finally guesses right, <code>guess != secret</code> becomes false and the loop ends. Whatever comes after the loop is your victory moment. 🏆</p>
<p><strong>"Count the tries"</strong> — a counter variable: start it at 1 (the first guess counts!), and add 1 inside the loop each round: <code>attempts = attempts + 1</code> (or the short form <code>attempts += 1</code>).</p>
<h3>While you play: try this strategy</h3>
<p>Always guess the <strong>middle</strong> of what's left. Start at 50. "Higher!" → the answer is in 51–100, so guess 75. "Lower!" → guess 63… Each guess cuts the possibilities in half, so you corner <em>any</em> number in at most 7 guesses.</p>
<p>Congratulations — you just discovered <strong>binary search</strong>, one of the most famous algorithms in computer science. It is how apps search huge amounts of data at lightning speed. You found it by playing a game. 😎</p>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> build the full game —
<ul>
<li>random secret from 1 to 100</li>
<li>"Higher!" / "Lower!" hints in a while loop</li>
<li>attempt counter, announced when the player wins</li>
</ul>
Then play it — with the binary search trick, can you win in 7?`,
      starter: 'import random\n\nsecret = random.randint(1, 100)\nattempts = 1\n\n# get the first guess (int + input!)\n# while the guess is wrong: give a hint, get a new guess, count it\n# after the loop: celebrate + show the attempt count\n',
      validate(out, code) {
        return code.includes('import random') && code.includes('while') && code.includes('input(');
      },
      hint: 'Skeleton: guess = int(input("Guess: ")) → while guess != secret: → hint with if/else → guess = int(input("Again: ")) → attempts += 1. Victory print goes AFTER the loop (no indentation).',
      solution: 'import random\n\nsecret = random.randint(1, 100)\nattempts = 1\nguess = int(input("Guess a number 1-100: "))\n\nwhile guess != secret:\n    if guess < secret:\n        print("Higher!")\n    else:\n        print("Lower!")\n    guess = int(input("Try again: "))\n    attempts += 1\n\nprint(f"Correct! The number was {secret}.")\nprint(f"You got it in {attempts} attempts!")'
    }
  },

  {
    id: 'proj-todo',
    title: 'Project: To-do list app',
    minutes: 25,
    html: `
<p>Your final basics project — and this one has the same shape as <em>real professional tools</em>: a menu that keeps serving the user until they choose to quit.</p>
` + overview([
  'The "menu loop" pattern that powers countless real programs',
  'while True + break — the infinite loop you actually want',
  'Numbered lists with enumerate()',
]) + `
<h3>What we're building</h3>
<pre><code>1. Show tasks  2. Add task  3. Remove task  4. Quit
Choose: 2
New task: learn python
Added!

1. Show tasks  2. Add task  3. Remove task  4. Quit
Choose: 1
1. learn python</code></pre>
<p>See the rhythm? Show menu → user picks → do it → <strong>show menu again</strong>. Around and around, until they quit.</p>
<h3>The menu loop pattern</h3>
<p>"Around and around forever until quit" translates to a funny-looking but very common piece of Python:</p>
<pre><code>tasks = []                       # empty list, ready for tasks

while True:                      # True is always true → loop forever!
    print("1. Show  2. Add  3. Remove  4. Quit")
    choice = input("Choose: ")

    if choice == "1":
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")
    elif choice == "2":
        tasks.append(input("New task: "))
    elif choice == "4":
        print("Bye!")
        break                    # break = "exit the loop NOW"</code></pre>
<p>Two new tools, both small:</p>
<ul>
<li><strong><code>while True</code> + <code>break</code></strong> — deliberately loop forever, and <code>break</code> is the emergency exit that fires when the user picks Quit. This exact pattern runs games, ATMs, chat apps…</li>
<li><strong><code>enumerate(tasks, 1)</code></strong> — like a normal for loop, but it also counts for you starting from 1. You get the number (<code>i</code>) and the item (<code>task</code>) together — perfect for numbered lists.</li>
</ul>
<h3>Removing by number</h3>
<p>For option 3, ask which number to remove, then delete that item:</p>
<pre><code>n = int(input("Which number? "))
tasks.pop(n - 1)      # pop removes by POSITION</code></pre>
<p>Why <code>n - 1</code>? The user sees the list starting from 1, but Python positions start from 0 (remember?). The user's #1 is Python's #0. Off-by-one moments like this are a daily part of programming — you have officially arrived. 😄</p>
<div class="tip">Think like a villain: what if the user removes task 99 when there are only 2 tasks? Check first: <code>if 1 &lt;= n &lt;= len(tasks):</code> — and complain politely otherwise. (The solution shows it done.)</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> complete the to-do app — all four menu options working: show (numbered), add, remove by number, quit.
<br><br>Test it like a user: add three tasks, list them, remove the middle one, list again, quit. <em>(Each input() is a popup here — that's normal.)</em>`,
      starter: 'tasks = []\n\nwhile True:\n    print("\\n1. Show  2. Add  3. Remove  4. Quit")\n    choice = input("Choose: ")\n\n    if choice == "1":\n        # show numbered tasks (or "No tasks yet!" if empty)\n        pass\n    elif choice == "2":\n        # ask for a task and append it\n        pass\n    elif choice == "3":\n        # ask which number, remove with pop(n - 1)\n        pass\n    elif choice == "4":\n        print("Bye!")\n        break\n',
      validate(out, code) {
        return code.includes('while') && code.includes('append') && code.includes('break');
      },
      hint: 'Replace each pass with real code. Show: for i, task in enumerate(tasks, 1): print(f"{i}. {task}"). Add: tasks.append(input("New task: ")). Remove: n = int(input("Number? ")) then tasks.pop(n - 1).',
      solution: 'tasks = []\n\nwhile True:\n    print("\\n1. Show  2. Add  3. Remove  4. Quit")\n    choice = input("Choose: ")\n\n    if choice == "1":\n        if not tasks:\n            print("No tasks yet!")\n        for i, task in enumerate(tasks, 1):\n            print(f"{i}. {task}")\n    elif choice == "2":\n        tasks.append(input("New task: "))\n        print("Added!")\n    elif choice == "3":\n        n = int(input("Which number? "))\n        if 1 <= n <= len(tasks):\n            removed = tasks.pop(n - 1)\n            print(f"Removed: {removed}")\n        else:\n            print("No such task!")\n    elif choice == "4":\n        print("Bye!")\n        break\n    else:\n        print("Pick 1-4!")'
    }
  },

  {
    id: 'whats-next',
    title: 'What next? Your roadmap',
    minutes: 6,
    html: `
<p>Stop and look at what you just did. 🎉 You started knowing <em>nothing</em>. Now you can drive a terminal, save your work with Git, put code on GitHub, and you have built <strong>three working programs</strong> in Python. That is genuinely more than most people who "always wanted to learn coding" ever do.</p>
<p>Here is exactly how to keep going:</p>
` + overview([
  'Setting up the real tools on your own computer',
  'The single most effective exercise: rebuild from memory',
  'How to level up — and what to do when you get stuck',
]) + `
<h3>Step 1: install the real tools (about 30 minutes)</h3>
<ul>
<li><strong>Python</strong> — <a href="https://python.org" target="_blank">python.org</a> → Downloads. (Windows: tick <em>"Add Python to PATH"</em> during install — it matters!)</li>
<li><strong>VS Code</strong> — <a href="https://code.visualstudio.com" target="_blank">code.visualstudio.com</a>. The free editor most of the world's programmers use. It has a terminal built in — which you now know how to drive.</li>
<li><strong>Git</strong> — <a href="https://git-scm.com" target="_blank">git-scm.com</a>, plus your free <a href="https://github.com" target="_blank">GitHub</a> account.</li>
</ul>
<h3>Step 2: rebuild your three projects — from memory</h3>
<p>This is the highest-value exercise in all of learning to code: recreate the calculator, the game and the to-do app on your real computer, <strong>peeking only when truly stuck</strong>. It will feel harder than the first time. That feeling is the learning. Then:</p>
<pre><code>git init
git add .
git commit -m "my first real project"
git push     # (after connecting to GitHub)</code></pre>
<p>Three projects on GitHub = a real, visible portfolio. Day one of it.</p>
<h3>Step 3: level up, gently</h3>
<ul>
<li>Make the to-do list <strong>remember tasks</strong> after closing (look up: Python <code>open()</code> and the <code>json</code> library)</li>
<li>Build: a quiz game, a password generator, a rupee↔dollar converter</li>
<li>Curious about websites? Look up <strong>Flask</strong> — Python for web apps. And for HTML/CSS, <a href="https://www.theodinproject.com" target="_blank">The Odin Project</a> is a wonderful free course (it inspired the style of this one!)</li>
</ul>
<h3>When you get stuck — and you will, daily, forever 🙂</h3>
<ol>
<li><strong>Read the error message, bottom line first.</strong> It names the problem and the line number. Half the time that's enough.</li>
<li><strong>Search the exact error text.</strong> Someone hit it before you. Guaranteed.</li>
<li><strong>Ask an AI assistant</strong> — which is a skill of its own, and exactly what the next course teaches. 👉</li>
</ol>
<div class="tip">The one rule that matters: <strong>30 minutes every day beats 6 hours once a week.</strong> And always be building something you actually want to exist — motivation does the rest.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Final knowledge check — lock in the big ideas:',
      questions: [
        { q: 'You broke your code badly and want yesterday\'s working version back. What saves you?', options: ['Pressing Ctrl+Z a thousand times', 'Git — you committed yesterday, right?', 'Rewriting everything from scratch'], a: 1 },
        { q: 'input() gives you "25" but you need to do math with it. You…', options: ['Just write "25" + 5 and hope', 'Convert it first: int(input(...))', 'Ask the user to do the math themselves'], a: 1 },
        { q: 'The best way to actually get good at programming is…', options: ['Watch 100 hours of tutorials', 'Memorize every function name', 'Build small projects, constantly'], a: 2 },
      ]
    }
  },
  ]},
]},

/* ================================================================
   COURSE 2 — VIBE CODING & PROMPT ENGINEERING
   ================================================================ */
{
  id: 'vibe',
  title: 'Vibe Coding & Prompt Engineering',
  icon: '✦',
  blurb: 'Build real software with AI as your partner — and learn to ask it for things like a pro.',
  modules: [

  { title: 'Coding with AI', lessons: [

  {
    id: 'vibe-intro',
    title: 'What is vibe coding?',
    minutes: 8,
    html: `
<p>You may have seen people online build entire apps by just… <em>chatting</em> with an AI. No typing out code line by line. That is called <strong>vibe coding</strong>, and it is real — people ship actual products this way.</p>
<p>This course teaches you to do it <em>well</em>, because there is a right way and a very wrong way.</p>
` + overview([
  'What vibe coding actually means',
  'The 5-step loop that all AI-assisted building follows',
  'Why the basics you just learned make you 10× better at this',
]) + `
<h3>The idea</h3>
<p><strong>Vibe coding = describing what you want in plain language, letting AI write the code, then steering it by running and reacting.</strong> You stay in the creative flow (the "vibe") while the AI handles the typing. The term was coined by AI researcher Andrej Karpathy in 2025, and it stuck.</p>
<h3>The loop (memorize this one)</h3>
<ol>
<li><strong>Describe</strong> — tell the AI what you want, clearly</li>
<li><strong>Generate</strong> — it writes the code</li>
<li><strong>Run</strong> — try it immediately. Always actually run it!</li>
<li><strong>React</strong> — "the button is too small", "it crashes when I press save", paste the error back</li>
<li><strong>Repeat</strong> — until it matches what you imagined</li>
</ol>
<p>Notice: the AI does the typing, but <em>you</em> do the deciding, the testing, and the judging. You are the director; the AI is a very fast crew.</p>
<h3>"So why did I just learn all those basics?!"</h3>
<p>Because of what the director has to do. Your basics are what let you:</p>
<ul>
<li><strong>Read</strong> the AI's code and smell when something's off (AI code is often <em>subtly</em> wrong — it will confidently write the guessing game with the attempts counter starting at 0…)</li>
<li><strong>Run</strong> the project — terminals, files, running programs: that's you now</li>
<li><strong>Save</strong> working versions with Git, so no AI mistake can ever destroy good work</li>
</ul>
<div class="note">Think of it this way: AI is leverage — it multiplies what you have. 10 × a beginner with basics = amazing output. 10 × zero = zero. You just spent a course making sure you're not the zero. 😉</div>`,
    exercise: {
      type: 'quiz',
      task: 'Knowledge check:',
      questions: [
        { q: 'The vibe coding loop is…', options: ['Prompt once and ship whatever comes out', 'Describe → generate → run → react → repeat', 'Copy random code and pray'], a: 1 },
        { q: 'Why do the basics still matter when AI writes the code?', options: ['They don\'t anymore, delete this course', 'So you can read, run, verify and fix what the AI produces', 'Because AI code never works at all'], a: 1 },
        { q: 'Before letting AI make big changes to working code, you should…', options: ['git commit — create a save point first', 'Close your eyes and trust', 'Delete the old version'], a: 0 },
      ]
    }
  },

  {
    id: 'vibe-tools',
    title: 'Your AI toolbox',
    minutes: 8,
    html: `
<p>New AI coding tools launch every month, which sounds overwhelming — until you realize they all fall into just <strong>three categories</strong>. Learn the categories, and you'll instantly understand any new tool forever.</p>
` + overview([
  'The 3 kinds of AI coding tools and what each is best at',
  'How to pick the right one for the job in front of you',
]) + `
<h3>1. Chat assistants 💬</h3>
<p><strong>Claude (claude.ai), ChatGPT, Gemini</strong> — a conversation in your browser. You ask, it answers; you copy code between the chat and your editor.</p>
<p><em>Best for:</em> learning ("explain loops like I'm five"), debugging one error, generating one file, understanding someone else's code.</p>
<h3>2. Agentic coding tools 🛠 — the serious ones</h3>
<p><strong>Claude Code, Cursor, Windsurf, GitHub Copilot</strong> — these live in your terminal or editor and can <em>act</em>: read your whole project, edit many files at once, run commands, see the errors, and fix themselves. Less copy-paste, more "make it so".</p>
<p><em>Best for:</em> building and changing real multi-file projects. This is where the term "vibe coding" gets serious.</p>
<h3>3. Instant app builders ⚡</h3>
<p><strong>v0, Bolt, Lovable, Replit</strong> — type "a booking site for my tuition classes", get a running website in minutes, hosted and all.</p>
<p><em>Best for:</em> prototypes, landing pages, weekend ideas. <em>The catch:</em> as projects grow complex, you have less control — serious projects eventually move to category 2.</p>
<h3>Cheat sheet</h3>
<ul>
<li>Question or one tricky error → <strong>chat assistant</strong></li>
<li>Real project, real features → <strong>agentic tool</strong></li>
<li>Idea you want to see <em>today</em> → <strong>app builder</strong>, migrate later if it grows</li>
</ul>
<div class="tip">Whatever tool you use: <strong>keep the project in Git</strong>. Commit before big AI changes, commit after every working state. Git turns AI experiments from scary into completely safe — you can always go back.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Pick the right tool for each job:',
      questions: [
        { q: '"Explain why my loop prints one number too many" — best tool?', options: ['A chat assistant — quick question, quick answer', 'Rebuild everything in an app builder', 'Buy a new laptop'], a: 0 },
        { q: 'You want AI to add a feature that touches many files of your real project…', options: ['Paste all 30 files into a chat window one by one', 'An agentic tool like Claude Code or Cursor', 'Give up — AI can\'t help with big projects'], a: 1 },
      ]
    }
  },

  {
    id: 'prompt-basics',
    title: 'Prompt engineering — asking well',
    minutes: 15,
    html: `
<p>Here is the most important fact about AI tools: <strong>the same AI gives wildly different results depending on how you ask.</strong> The skill of asking well is called <strong>prompt engineering</strong>, and it is the closest thing to a superpower in 2026.</p>
` + overview([
  'Why "make a website" is a terrible prompt (and what to say instead)',
  'The 5 ingredients every strong prompt contains',
  'Habits that separate pro prompters from frustrated ones',
]) + `
<h3>Watch the difference</h3>
<pre><code>❌ "make a website"

✅ "Build a single-page portfolio website for a 3D-printing
   business. Plain HTML/CSS/JS, one file. Sections: hero,
   product gallery with 6 cards, about, WhatsApp contact
   button. Warm minimal design, mobile-friendly. Indian
   audience - prices in ₹."</code></pre>
<p>Both take under a minute to type. The first gets you a random generic page. The second gets you 90% of a finished product. Same AI!</p>
<h3>Why? Every missing detail becomes a guess</h3>
<p>The AI cannot read your mind. Anything you don't specify, it <em>decides for you</em> — tech, look, structure, everything. A vague prompt isn't a shorter good prompt; it's a pile of decisions you handed to a random-number generator. <strong>Prompting well simply means deciding on purpose.</strong></p>
<h3>The 5 ingredients</h3>
<ol>
<li><strong>Goal</strong> — what exactly should exist when it's done?</li>
<li><strong>Context</strong> — who is it for? what already exists? what tech?</li>
<li><strong>Constraints</strong> — one file? no frameworks? must work on phones? free hosting?</li>
<li><strong>Example</strong> — "like X but simpler", or paste a snippet of the style you like</li>
<li><strong>Output shape</strong> — "one complete runnable file", "plan first, then code", "explain your changes"</li>
</ol>
<p>Check the ✅ prompt above against this list — it hits all five in four sentences. No essay needed.</p>
<h3>Pro habits</h3>
<ul>
<li><strong>One thing at a time.</strong> "Add login AND dark mode AND payments" → three prompts. Small asks = far better results.</li>
<li><strong>Iterate, don't restart.</strong> Next message: "Keep everything, just make the header stay fixed when scrolling."</li>
<li><strong>Big task? Ask for the plan first:</strong> "Before writing code, list the steps you'll take." Correct the plan, <em>then</em> say go.</li>
<li><strong>Say what NOT to touch:</strong> "Don't change anything outside the gallery section."</li>
</ul>`,
    exercise: {
      type: 'prompt',
      task: `<strong>Your assignment:</strong> write a prompt asking an AI to build a <strong>portfolio website about you</strong>. Work in all 5 ingredients: goal, context, constraints, style, output shape. Then press <em>Grade my prompt</em> — the grader checks for the ingredients like an AI would experience them.`,
      placeholder: 'Build a ... for ...\nTech: ...\nSections: ...\nDesign: ...\nConstraints: ...',
      grade(text) {
        const t = text.toLowerCase();
        const fb = [];
        if (text.trim().length < 120) fb.push('Too short — a strong build-prompt is a few sentences. Every missing detail becomes the AI\'s guess.');
        if (!/html|css|javascript|js|react|next|vue|python|flask|tailwind/.test(t)) fb.push('Name a tech stack (e.g. "plain HTML/CSS/JS in one file").');
        if (!/section|page|hero|about|contact|gallery|project|navbar|footer|feature/.test(t)) fb.push('List the sections or features you want (hero, about, projects, contact…).');
        if (!/design|style|color|colour|minimal|modern|dark|light|clean|warm|font/.test(t)) fb.push('Describe the design feel (minimal? colorful? dark?).');
        if (!/mobile|responsive|one file|single file|no framework|fast|simple|accessib/.test(t)) fb.push('Add at least one constraint (mobile-friendly, single file, no frameworks…).');
        return { pass: fb.length <= 1, feedback: fb };
      },
      hint: 'Cover: what to build, who you are, tech stack, a list of sections, the design style, and a constraint like "mobile-friendly, single HTML file".'
    }
  },

  {
    id: 'context-eng',
    title: 'Context engineering — show, don\'t summarize',
    minutes: 12,
    html: `
<p>Prompt engineering is how you <em>ask</em>. <strong>Context engineering</strong> is what you <em>show</em>. The AI cannot see your screen, your files, or your errors — it only knows what you paste. Feed it well and it performs like a senior engineer; feed it vague summaries and it guesses.</p>
` + overview([
  'What to show the AI in each situation',
  'The bug-report formula that gets bugs fixed in one message',
  'The golden rule: paste errors, never describe them',
]) + `
<h3>What to include, by situation</h3>
<ul>
<li><strong>Fixing a bug</strong> → the full error message, the code around the failing line, and what you expected vs. what happened</li>
<li><strong>Adding a feature</strong> → the relevant existing code, your tech stack, and exactly how the feature should behave</li>
<li><strong>"It looks wrong"</strong> → a screenshot, plus a description of what "right" looks like</li>
</ul>
<h3>The bug-report formula 📋</h3>
<p>When something breaks, fill in these six lines. It takes two minutes and usually gets a correct fix on the first try:</p>
<pre><code>WHAT I'M DOING:   clicking "Save" on the signup form
WHAT I EXPECTED:  user saved, success message shown
WHAT HAPPENED:    page freezes, error below appears
ERROR:            TypeError: Cannot read properties of
                  undefined (reading 'id') at saveUser (app.js:42)
CODE:             [paste the saveUser function]
ALREADY TRIED:    refreshing; checking the user object exists</code></pre>
<p>Compare that with what most people send: <em>"my save button doesn't work, fix it"</em>. The AI now has to guess your code, your error, everything — and wrong guesses cost you an hour of back-and-forth.</p>
<h3>The golden rule</h3>
<p><strong>Never summarize an error message. Paste it. All of it.</strong> The line you think is irrelevant is usually the one that names the real problem. Error text is written by machines for machines — let the machine read it.</p>
<h3>Context for agentic tools</h3>
<p>Tools like Claude Code read your project files themselves, so your job shifts from pasting to <em>curating</em>:</p>
<ul>
<li>Keep a <code>README.md</code> or <code>CLAUDE.md</code> in the project describing what it is, the stack, and your conventions — agents read those first</li>
<li>Point, don't make it wander: "the bug is somewhere in the checkout flow, probably cart.js"</li>
<li>Fence off danger zones: "don't touch the database schema"</li>
</ul>`,
    exercise: {
      type: 'prompt',
      task: `<strong>Your assignment:</strong> your Python program crashed when a user typed their age in words:
<pre>Traceback (most recent call last):
  File "app.py", line 12, in &lt;module&gt;
    age = int(input("Age: "))
ValueError: invalid literal for int() with base 10: 'twenty'</pre>
Write the <strong>complete debugging prompt</strong> you would send an AI — use the whole bug-report formula (and remember the golden rule about the error text).`,
      placeholder: 'WHAT I\'M DOING: ...\nWHAT I EXPECTED: ...\nWHAT HAPPENED: ...\nERROR: ...\nALREADY TRIED: ...',
      grade(text) {
        const t = text.toLowerCase();
        const fb = [];
        if (text.trim().length < 100) fb.push('Too short — walk through the whole formula, line by line.');
        if (!/valueerror|invalid literal|int\(/.test(t)) fb.push('Golden rule! Paste the actual error (the ValueError line) into the prompt.');
        if (!/expect/.test(t)) fb.push('Say what you EXPECTED to happen.');
        if (!/tried|attempt/.test(t)) fb.push('Mention what you already tried.');
        if (!/age|input|type|user/.test(t)) fb.push('Describe what you (or the user) were doing when it crashed.');
        return { pass: fb.length <= 1, feedback: fb };
      },
      hint: 'Six lines: doing / expected / happened / ERROR (paste the traceback!) / code / already tried.'
    }
  },

  {
    id: 'vibe-workflow',
    title: 'The vibe coding workflow',
    minutes: 12,
    html: `
<p>Everyone who ships real products with AI — from solo makers to professional teams — converges on the same working rhythm. Here it is, ready to steal.</p>
` + overview([
  'Planning before prompting (5 lines is enough)',
  'Building in thin slices instead of asking for everything',
  'Why git commit is the most important key you press all day',
  'Testing like a villain 😈',
]) + `
<h3>1. Plan before prompting</h3>
<p>Five lines, plain language: what am I building? for whom? core features? tech? what does "done" look like?</p>
<p>Even better — make the AI do the planning <em>with</em> you: <em>"I want to build X. Ask me questions until the requirements are clear, then propose a plan."</em> The questions it asks will surface things you hadn't decided.</p>
<h3>2. Build in thin slices 🍰</h3>
<p>Never prompt "build the whole app". Get the tiniest version that runs, then add one feature at a time:</p>
<ol>
<li>"Create a page that says hello" → <strong>run it ✓</strong></li>
<li>"Add a form to submit a task" → <strong>run it ✓</strong></li>
<li>"Save tasks so they survive refresh" → <strong>run it ✓</strong></li>
</ol>
<p>Each slice works before the next begins. When something breaks, you know <em>exactly</em> which slice broke it. (Sound familiar? It's the to-do project all over again — plan, piece, test, repeat.)</p>
<h3>3. Commit at every green step</h3>
<pre><code>git add .
git commit -m "tasks now saved to file"</code></pre>
<p>Now the AI can never destroy more than one slice of progress. Broken beyond repair? Jump back to the last commit and re-prompt. <strong>This single habit is what makes vibe coding safe.</strong></p>
<h3>4. Test like a villain 😈</h3>
<p>AI code usually handles the normal path. Your job is to attack it: empty inputs, huge numbers, letters where numbers go, double-clicks, going back mid-flow. Every crash you cause → paste it back (bug-report formula!) → next round. You know this game from the calculator's divide-by-zero.</p>
<h3>5. Ask "why", not just "fix"</h3>
<p>When the AI fixes something, add one line: <em>"explain what was wrong and why this fixes it."</em> Do this for two months and you will start predicting bugs before the AI sees them. That is the road from vibe coder to real engineer.</p>
<div class="note">Anti-patterns — the ways people burn hours: asking for 10 features in one prompt · never running the code between prompts · hours of changes with no commit to retreat to · believing "this should work now" without testing it.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Workflow check:',
      questions: [
        { q: 'The AI finally got your app working after 3 broken attempts. First move?', options: ['Straight to the next feature!', 'git commit — lock in the working state', 'Close the laptop, you earned it'], a: 1 },
        { q: 'Best opening prompt for a brand-new project?', options: ['"Build the complete app with all 12 features"', 'The tiniest runnable version — then one slice at a time', '"Write as much code as possible"'], a: 1 },
        { q: 'The AI says "this should work now". You…', options: ['Trust it — it sounded confident', 'Run it, then actively try to break it', 'Ship it to real users immediately'], a: 1 },
      ]
    }
  },

  {
    id: 'vibe-debugging',
    title: 'Debugging with AI',
    minutes: 12,
    html: `
<p>Things will break. Daily. That is not failure — it is the job. With AI, debugging becomes a conversation… <em>if</em> you run it right. Here is the ladder to climb, in order:</p>
` + overview([
  'The 4-step debugging ladder',
  'Ready-made prompts that untangle stubborn bugs',
  'The escape hatch for when the AI goes in circles',
]) + `
<h3>The debugging ladder 🪜</h3>
<ol>
<li><strong>Read the error yourself first — 30 seconds.</strong> Bottom line names the problem, the lines above name the location. You learned this in the basics — and you will fix half of all errors without any AI, faster than typing a prompt.</li>
<li><strong>Paste, don't paraphrase.</strong> The golden rule: full error + relevant code + what triggered it.</li>
<li><strong>Diagnosis before surgery.</strong> Say: <em>"What is the actual root cause? Explain first — don't write code yet."</em> Otherwise the AI eagerly 'fixes' the wrong thing and you drift further from working.</li>
<li><strong>One change at a time.</strong> If it suggests four changes, apply and test them one by one — or you will never know which one mattered.</li>
</ol>
<h3>Prompts that earn their keep</h3>
<pre><code>"Here is my code and the full error. What is the root cause?
 Explain before writing any code."

"This worked before I added the save feature. Here is what
 changed. What broke?"

"Add print statements to this function so we can see where
 the value goes wrong."

"Explain this error like I am new to Python, then fix it."</code></pre>
<p>(That third one is a classic human trick the AI is great at: make the invisible visible, watch the values move, spot where they go bad.)</p>
<h3>When the AI goes in circles 🔄</h3>
<p>Fix #1 fails. Fix #2 fails. <strong>Stop — do not ask for fix #3.</strong> Long broken conversations accumulate confusion; the AI starts patching its own patches. The escape hatch:</p>
<ol>
<li><code>git checkout .</code> — back to the last working commit (there's the habit again 😉)</li>
<li>Open a <strong>fresh</strong> chat</li>
<li>Send one clean bug-report-formula prompt</li>
</ol>
<p>A clean start with good context beats round 7 of "still doesn't work" every single time.</p>
<div class="tip">Keep a <strong>bug diary</strong> while learning: one line per bug — what broke, what the cause turned out to be. After 20 entries you'll see the same few causes repeating. That pattern-library in your head is 80% of debugging skill.</div>`,
    exercise: {
      type: 'prompt',
      task: `<strong>Your assignment:</strong> remember your guessing game? Imagine it has a bug — when the player guesses correctly on the <strong>very first try</strong>, it prints <em>"You got it in 0 attempts!"</em> instead of 1.
<br><br>Write the debugging prompt: describe the bug precisely (expected vs. actual), and use the ladder's step 3 — diagnosis before surgery.`,
      placeholder: 'My guessing game has a bug: ...\nExpected: ...\nActual: ...\nPlease explain the cause before ...',
      grade(text) {
        const t = text.toLowerCase();
        const fb = [];
        if (text.trim().length < 80) fb.push('A bit more detail — a good bug report is a few sentences.');
        if (!/first (try|guess)|0 attempts|zero attempts/.test(t)) fb.push('Describe the exact trigger: a correct FIRST guess shows "0 attempts".');
        if (!/expect/.test(t)) fb.push('State the expected behavior (it should say 1 attempt).');
        if (!/explain|why|cause|reason|diagnos/.test(t)) fb.push('Ask for the cause BEFORE the fix — diagnosis before surgery!');
        return { pass: fb.length <= 1, feedback: fb };
      },
      hint: 'Include: what the game does, what happens on a first-try win (actual vs expected), and "explain the root cause before writing any code".'
    }
  },

  {
    id: 'vibe-ship',
    title: 'Ship it — from vibe to live product',
    minutes: 10,
    html: `
<p>A project on your laptop is a diary entry. A project with a <strong>URL</strong> is a product — something you can send to a friend, put in a bio, show an interviewer. And getting a URL is much easier than you think.</p>
` + overview([
  'The push-to-deploy pipeline (free!)',
  'Which hosting service for which kind of project',
  'The safety checklist before you share the link',
]) + `
<h3>The pipeline: push → live</h3>
<p>Modern hosting works like magic on top of what you already know:</p>
<ol>
<li>Your project is on GitHub (you know how: <code>git push</code>)</li>
<li>You connect a hosting service to the repo — a few clicks on their website</li>
<li>From then on, <strong>every push deploys automatically</strong>. Save, commit, push… and the live site updates itself. That's the whole workflow.</li>
</ol>
<h3>Which host for what</h3>
<ul>
<li><strong>Websites & frontends</strong> (HTML/CSS/JS, React…) → <strong>Vercel</strong>, <strong>Netlify</strong>, or <strong>GitHub Pages</strong>. Free, live in ~2 minutes.</li>
<li><strong>Python apps</strong> (Flask, FastAPI…) → <strong>Render</strong>, <strong>Railway</strong>, <strong>PythonAnywhere</strong>. Free tiers to start.</li>
<li><strong>Need accounts & a database?</strong> → <strong>Supabase</strong> or <strong>Firebase</strong> — ready-made backends, so you don't have to build one.</li>
</ul>
<h3>Before you share the link 🔒</h3>
<ul>
<li><strong>Secrets stay secret.</strong> Passwords and API keys must NEVER be in code you push to GitHub — they go in "environment variables" (every host has a settings page for them). If a key does leak: revoke it immediately, don't just delete the file — Git history remembers everything (that's its whole job!).</li>
<li><strong>Open it on your phone.</strong> Half your visitors are mobile.</li>
<li><strong>One last villain pass</strong> on the live site. 😈</li>
</ul>
<h3>Then: tell people</h3>
<p>Send it to friends. Post it. And do the scariest, most valuable thing in product-making: <strong>watch someone use it without helping them</strong>. Wherever they get confused — that's your next iteration. Idea → build → ship → feedback → build… you now own the whole loop.</p>
<div class="note">Three small <em>shipped</em> projects with live URLs beat thirty finished tutorials. It's not close. Go make the first one.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Final knowledge check — then go build something real:',
      questions: [
        { q: 'Your API key was in code you pushed to a public repo…', options: ['Probably fine, who reads code', 'Revoke the key NOW, then move it to an environment variable', 'Just delete the file — Git forgets, right? (…right?)'], a: 1 },
        { q: 'Free & easy hosting for a static website:', options: ['Buy a server rack for the bedroom', 'Vercel / Netlify / GitHub Pages connected to your repo', 'Email the HTML file to everyone'], a: 1 },
        { q: 'A project is really "done" when…', options: ['The code runs without errors', 'It has a URL, real people tried it, and you iterated on their feedback', 'The README is long enough'], a: 1 },
      ]
    }
  },
  ]},
]},

/* ================================================================
   COURSE 3 — WEB DEVELOPMENT WITH FLASK
   ================================================================ */
{
  id: 'flask',
  title: 'Web Development with Flask',
  icon: '⚗',
  blurb: 'Turn your Python into real websites and APIs. Routes, pages, forms and JSON — with Flask running live in your browser.',
  modules: [

  /* ---------- MODULE: How the web works ---------- */
  { title: 'How the web works', lessons: [

  {
    id: 'web-how-it-works',
    title: 'How the web actually works',
    minutes: 8,
    html: `
<p>You use the web all day — WhatsApp, YouTube, this very page. But what <em>actually</em> happens when you type an address and press Enter? Turns out it is one simple conversation, repeated billions of times a day. Once you see it, web development stops being mysterious.</p>
<div class="note">This course assumes you finished the Python lessons in <strong>Programming Basics</strong>. If <code>def</code>, f-strings and dictionaries feel comfortable, you are ready.</div>
` + overview([
  'What "client" and "server" mean (two computers, one conversation)',
  'The request–response cycle — the heartbeat of the entire web',
  'How to read a URL like a programmer',
]) + `
<h3>Two computers, one conversation</h3>
<p>Every website involves exactly two roles:</p>
<ul>
<li><strong>The client</strong> — your browser (on your phone or laptop). It <em>asks</em> for pages.</li>
<li><strong>The server</strong> — a computer somewhere that never sleeps, running the website's code. It <em>answers</em>.</li>
</ul>
<p>Think of a restaurant. You (the browser) are the customer: you look at the menu and place an order. The kitchen (the server) receives the order, cooks, and sends the dish out. You never enter the kitchen — you just order and receive.</p>
<h3>The request–response cycle</h3>
<p>Here is the whole conversation, step by step:</p>
<pre><code>YOU type   coderoof.com/menu   and press Enter
   ↓
your browser sends a REQUEST:   "GET /menu please"
   ↓
the SERVER runs some code and prepares the page
   ↓
it sends back a RESPONSE: the HTML for that page
   ↓
your browser draws it on your screen</code></pre>
<p>That's it. Every click, every page load, every "pull to refresh" — this exact cycle. The language the two sides speak is called <strong>HTTP</strong> (that is the <code>http://</code> you see in addresses).</p>
<p>Two HTTP words you will use constantly:</p>
<ul>
<li><strong>GET</strong> — "please <em>give</em> me a page" (what happens when you visit any link)</li>
<li><strong>POST</strong> — "here, I am <em>sending</em> you some data" (what happens when you submit a form)</li>
</ul>
<h3>Reading a URL</h3>
<pre><code>https://  coderoof.com  /menu
   │           │           │
protocol    domain        path
"speak      "which        "which page
 HTTP(S)"    server?"      on it?"</code></pre>
<ul>
<li><strong>Protocol</strong> — how to talk. <code>https</code> is HTTP with encryption (the s = secure).</li>
<li><strong>Domain</strong> — the server's address, like a house address for a computer.</li>
<li><strong>Path</strong> — which page you want from that server. <code>/</code> alone means the homepage.</li>
</ul>
<div class="tip">So where does <em>your Python</em> fit in? On the server! "The server runs some code" — that code is what you are about to write. Code that receives requests and decides what to send back is called a <strong>web application</strong>, and Flask is the tool that makes writing one easy.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Knowledge check:',
      questions: [
        { q: 'In the web conversation, your browser is…', options: ['The server — it stores the websites', 'The client — it sends requests and shows the responses', 'The kitchen'], a: 1 },
        { q: 'A GET request means…', options: ['"Please give me a page"', '"Delete this page"', '"Here is my password"'], a: 0 },
        { q: 'In coderoof.com/menu, the /menu part is…', options: ['The protocol', 'The domain', 'The path — which page you want'], a: 2 },
      ]
    }
  },

  {
    id: 'flask-what-is',
    title: 'What is Flask?',
    minutes: 7,
    html: `
<p>You <em>could</em> write a web server in raw Python — listening for connections, reading HTTP messages character by character, formatting responses by hand… People did that in the 90s. It was miserable. So programmers built <strong>web frameworks</strong>: toolkits that handle all the plumbing, so you only write the interesting part — <em>what each page should say</em>.</p>
` + overview([
  'What a web framework does for you',
  'Why Flask is the perfect first one',
  'How this site runs Flask right inside your browser',
]) + `
<h3>Why Flask?</h3>
<p><strong>Flask</strong> is a small, famous Python web framework. It is beloved for one reason: a complete working website is <em>five lines</em> of code that read almost like English:</p>
<pre><code>from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from Flask!"</code></pre>
<p>Don't worry about what each line means yet — next lesson we go through it word by word. Just notice how small it is.</p>
<p>Flask is called a <strong>micro-framework</strong>: it gives you the essentials and stays out of your way. Its big sibling <strong>Django</strong> ships with everything including the kitchen sink. Flask is a scooter, Django is a bus — for learning (and for a huge number of real products), the scooter is perfect. Real companies run Flask in production; it is a genuinely employable skill, not a toy.</p>
<h3>Flask on this site</h3>
<p>Normally you install Flask on your computer with one terminal command:</p>
<pre><code>pip install flask     # pip = Python's app store for code libraries</code></pre>
<p>On this site you don't even need that: the first time you press <strong>▶ Run</strong> on code that imports Flask, the site installs Flask <em>into the Python living in your browser</em>. It takes a few seconds, once. After that it is instant. Everything you write here is real Flask — the same library, the same code you would write on your own machine.</p>
<h3>One honest difference</h3>
<p>On your own computer, <code>app.run()</code> starts a real server and your browser can visit it at a local address. A web page (like this one) is not allowed to open servers — so here we use Flask's built-in <strong>test client</strong> instead:</p>
<pre><code>client = app.test_client()   # a pretend browser, made by Flask itself
print(client.get("/").text)  # "visit" the homepage, print what came back</code></pre>
<p>The test client sends real requests through your real routes — it is exactly what professional developers use to write automated tests for their Flask apps. So you are not learning a workaround; you are learning a pro habit early. 😉</p>
<div class="note">In the final lesson you will set Flask up on a real computer and see <code>app.run()</code> in action — everything you build here transfers directly.</div>`,
    exercise: {
      type: 'quiz',
      task: 'Knowledge check:',
      questions: [
        { q: 'A web framework is…', options: ['A website template you fill in', 'A toolkit that handles HTTP plumbing so you write only the interesting part', 'A type of server computer'], a: 1 },
        { q: 'On a real computer you install Flask with…', options: ['pip install flask', 'flask download', 'git clone flask'], a: 0 },
        { q: 'The test client (app.test_client()) is…', options: ['A fake toy, nothing like real Flask', 'A pretend browser that sends real requests through your routes — pros use it for testing', 'Only for websites with customers'], a: 1 },
      ]
    }
  },
  ]},

  /* ---------- MODULE: Your first Flask app ---------- */
  { title: 'Your first Flask app', lessons: [

  {
    id: 'flask-hello',
    title: 'Hello, Flask — your first web app',
    minutes: 12,
    html: `
<p>Time to build. By the end of this lesson you will have written a complete, working web application. It is five lines. Let's go through every single word.</p>
` + overview([
  'What each of the five famous lines does',
  'What a route is',
  'How to "visit" your app with the test client',
]) + `
<h3>The five lines, word by word</h3>
<pre><code>from flask import Flask    # 1. get the Flask toolkit from the library
app = Flask(__name__)      # 2. create your web application, call it app

@app.route("/")            # 3. a signpost: "when someone visits /, run the function below"
def home():                # 4. a normal Python function — you know these!
    return "Hello from Flask!"   # 5. whatever it returns is what the visitor sees</code></pre>
<ul>
<li><strong>Line 1–2</strong> — import Flask and create one app object. <code>__name__</code> is a bit of Python magic that tells Flask where it lives; every Flask app starts with these exact two lines, so type them on autopilot.</li>
<li><strong>Line 3</strong> — the line starting with <code>@</code> is called a <strong>decorator</strong>. You don't need the theory yet: read it as a <em>signpost</em> stuck onto the function below it. This one says: "requests for the path <code>/</code> go here."</li>
<li><strong>Line 4–5</strong> — an ordinary function. Flask calls it whenever someone visits <code>/</code>, and <strong>whatever it returns becomes the response</strong> the browser receives.</li>
</ul>
<p>A path + its function together are called a <strong>route</strong>. A website is just a collection of routes. That is genuinely the whole mental model.</p>
<h3>Take it for a spin</h3>
<p>Remember: in the browser we use Flask's <strong>test client</strong> — a pretend browser — instead of starting a real server:</p>
<pre><code>client = app.test_client()   # make the pretend browser
response = client.get("/")   # visit the homepage (a GET request!)
print(response.text)         # print what the server sent back</code></pre>
<p>Run those after your app and you'll see <code>Hello from Flask!</code> — your route, answering a request. That is a real request–response cycle from last lesson, happening entirely inside your page.</p>
<div class="tip">Function names (<code>home</code>) are for you — visitors never see them. The path in <code>@app.route(...)</code> is what matters. Name functions after what the page is: <code>home</code>, <code>about</code>, <code>menu</code>.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> finish the app so that visiting <code>/</code> returns exactly <code>Hello from Flask!</code> — then run it and watch your first web app answer a request.`,
      starter: 'from flask import Flask\napp = Flask(__name__)\n\n# 1. Add your route here: visiting "/" should return "Hello from Flask!"\n\n\n# 2. Take it for a spin with the pretend browser:\nclient = app.test_client()\nprint(client.get("/").text)\n',
      validate(out, code) {
        return out.includes('Hello from Flask!') && /@app\.route/.test(code);
      },
      solution: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Hello from Flask!"\n\nclient = app.test_client()\nprint(client.get("/").text)\n',
      hint: 'Three lines: @app.route("/") on top, then def home():, then return "Hello from Flask!" (indented). The @ line has no colon; the def line does.'
    }
  },

  {
    id: 'flask-routes',
    title: 'Routes — giving your site more pages',
    minutes: 10,
    html: `
<p>One page is a business card. Real sites have many pages: a homepage, an about page, a profile page for every user. In Flask, more pages = more routes. And some routes are <em>smart</em> — one route that handles a million different URLs.</p>
` + overview([
  'Adding multiple routes (this part is almost too easy)',
  'Dynamic routes — one route, endless pages',
  'What a 404 actually is',
]) + `
<h3>More pages, more routes</h3>
<p>Just stack them. Each route is its own signpost + function:</p>
<pre><code>@app.route("/")
def home():
    return "Welcome to my site!"

@app.route("/about")
def about():
    return "I am learning Flask on CodeRoof."</code></pre>
<p>Visit <code>/</code> → first function runs. Visit <code>/about</code> → second one. That's all there is to it.</p>
<h3>Dynamic routes — the superpower</h3>
<p>Now imagine a greeting page for every person on Earth. You cannot write a route per person. Instead, put part of the path in <strong>angle brackets</strong>, and Flask captures it and hands it to your function:</p>
<pre><code>@app.route("/hello/&lt;name&gt;")
def hello(name):                      # ← whatever was in the URL lands here
    return f"Hello, {name}!"</code></pre>
<pre><code>/hello/Asha   →  Hello, Asha!
/hello/Ravi   →  Hello, Ravi!
/hello/Simal  →  Hello, Simal!</code></pre>
<p>One route, infinite pages. This is exactly how <code>instagram.com/cristiano</code> works — one profile route with a <code>&lt;username&gt;</code> in it, not 2 billion routes.</p>
<p>Captured values arrive as text. If you want a number, say so and Flask converts it for you:</p>
<pre><code>@app.route("/double/&lt;int:n&gt;")
def double(n):
    return f"{n} doubled is {n * 2}"   # n is a real int here</code></pre>
<div class="note">A route function must return a <strong>string</strong> (later: HTML or JSON). Returning a number crashes — wrap it in an f-string like above.</div>
<h3>When there is no route: 404</h3>
<p>Visit a path with no signpost — say <code>/pizza</code> — and Flask answers with the famous <strong>404 Not Found</strong>. A 404 is not a crash; it is the server politely saying "no such page here". Now you know what it means every time you see one in the wild.</p>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> build a site with three routes:
<ol>
<li><code>/</code> — a homepage returning any welcome message</li>
<li><code>/about</code> — a sentence about you</li>
<li><code>/hello/&lt;name&gt;</code> — a dynamic route returning <code>Hello, [name]!</code> for anyone</li>
</ol>`,
      starter: 'from flask import Flask\napp = Flask(__name__)\n\n# your three routes here\n\n\n# --- test drive ---\nclient = app.test_client()\nprint(client.get("/").text)\nprint(client.get("/about").text)\nprint(client.get("/hello/Asha").text)\n',
      validate(out, code) {
        return out.includes('Hello, Asha!') && code.includes('/about') && /<name>/.test(code);
      },
      solution: 'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef home():\n    return "Welcome to my site!"\n\n@app.route("/about")\ndef about():\n    return "I am learning Flask on CodeRoof."\n\n@app.route("/hello/<name>")\ndef hello(name):\n    return f"Hello, {name}!"\n\nclient = app.test_client()\nprint(client.get("/").text)\nprint(client.get("/about").text)\nprint(client.get("/hello/Asha").text)\n',
      hint: 'The dynamic one: @app.route("/hello/<name>") — then def hello(name): and return f"Hello, {name}!". The angle brackets in the route and the parameter name must match.'
    }
  },

  {
    id: 'flask-html',
    title: 'Real pages — HTML and templates',
    minutes: 12,
    html: `
<p>So far your routes return plain sentences. Browsers can do much better — headings, lists, colors — using <strong>HTML</strong>, the formatting language of every web page. Good news: your routes can return HTML right now, and Flask has a beautiful trick for mixing Python data into it.</p>
` + overview([
  'Returning HTML from a route (30-second version of HTML included)',
  'Templates — mixing Python values into pages with Jinja',
  'Loops inside a page',
]) + `
<h3>HTML in 30 seconds</h3>
<p>HTML wraps text in <strong>tags</strong> that say what each piece is:</p>
<pre><code>&lt;h1&gt;Big heading&lt;/h1&gt;
&lt;p&gt;A paragraph of text.&lt;/p&gt;
&lt;ul&gt;                    ← a bulleted list…
  &lt;li&gt;first item&lt;/li&gt;   ← …with list items inside
&lt;/ul&gt;</code></pre>
<p>Return that from a route and the browser renders it as a formatted page:</p>
<pre><code>@app.route("/")
def home():
    return "&lt;h1&gt;My Snack Shop&lt;/h1&gt;&lt;p&gt;Open daily!&lt;/p&gt;"</code></pre>
<h3>The problem, and the fix: templates</h3>
<p>Gluing Python variables into long HTML strings gets ugly <em>fast</em>. Flask ships with a template engine called <strong>Jinja</strong>: you write the page like a fill-in-the-blanks form, and pass in the values:</p>
<pre><code>from flask import Flask, render_template_string

@app.route("/")
def home():
    return render_template_string(
        "&lt;h1&gt;Hello {{ name }}!&lt;/h1&gt;",   # {{ blanks }} get filled in…
        name="Asha")                       # …with values you pass here</code></pre>
<p><code>{{ name }}</code> is a <strong>placeholder</strong> — Jinja swaps it for the value you passed. The double curly braces mean "print this value here".</p>
<h3>Loops inside a page</h3>
<p>Jinja can also repeat parts of the page — perfect for lists that come from Python:</p>
<pre><code>snacks = ["idli", "dosa", "banana chips"]

@app.route("/menu")
def menu():
    return render_template_string("""
      &lt;h1&gt;Menu&lt;/h1&gt;
      &lt;ul&gt;
      {% for snack in snacks %}
        &lt;li&gt;{{ snack }}&lt;/li&gt;
      {% endfor %}
      &lt;/ul&gt;""", snacks=snacks)</code></pre>
<p><code>{% for %} … {% endfor %}</code> is a loop <em>inside the page</em> — one <code>&lt;li&gt;</code> is stamped out per snack. Add a snack to the Python list, and the page updates itself. Data and page, finally separate.</p>
<div class="note">In real projects the HTML lives in its own files in a <code>templates/</code> folder, and you call <code>render_template("menu.html", snacks=snacks)</code> — same idea, same <code>{{ }}</code> and <code>{% %}</code>, just in a separate file. <code>render_template_string</code> is the in-one-file version, ideal here.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> make a <code>/menu</code> route that uses <code>render_template_string</code> to show:
<ol>
<li>An <code>&lt;h1&gt;</code> heading for your shop</li>
<li>A <code>&lt;ul&gt;</code> list with one <code>&lt;li&gt;</code> per snack — using a <code>{% for %}</code> loop over the Python list (at least 3 snacks!)</li>
</ol>`,
      starter: 'from flask import Flask, render_template_string\napp = Flask(__name__)\n\nsnacks = ["idli", "dosa", "banana chips"]\n\n# your /menu route here\n\n\nclient = app.test_client()\nprint(client.get("/menu").text)\n',
      validate(out, code) {
        return out.includes('<h1>') && (out.match(/<li>/g) || []).length >= 3 && code.includes('{% for');
      },
      solution: 'from flask import Flask, render_template_string\napp = Flask(__name__)\n\nsnacks = ["idli", "dosa", "banana chips"]\n\n@app.route("/menu")\ndef menu():\n    return render_template_string("""\n      <h1>My Snack Shop</h1>\n      <ul>\n      {% for snack in snacks %}\n        <li>{{ snack }}</li>\n      {% endfor %}\n      </ul>""", snacks=snacks)\n\nclient = app.test_client()\nprint(client.get("/menu").text)\n',
      hint: 'Use a triple-quoted """string""" for the HTML. Inside it: {% for snack in snacks %} <li>{{ snack }}</li> {% endfor %} — and remember to pass snacks=snacks after the string.'
    }
  },
  ]},

  /* ---------- MODULE: Data in, data out ---------- */
  { title: 'Data in, data out', lessons: [

  {
    id: 'flask-forms',
    title: 'Forms and query strings — the visitor talks back',
    minutes: 12,
    html: `
<p>So far the conversation is one-way: the visitor asks for a page, your app answers. But the web's best parts are two-way — search boxes, signup forms, comments. Time to receive data <em>from</em> the visitor.</p>
` + overview([
  'Query strings — data riding along in the URL',
  'POST + forms — sending data properly',
  'The request object, your envelope from the visitor',
]) + `
<h3>Way 1: query strings (data in the URL)</h3>
<p>Ever noticed a URL like <code>google.com/search?q=flask</code>? Everything after the <code>?</code> is the <strong>query string</strong> — little labeled values riding along with a GET request. <code>q=flask</code> means "the value of q is flask".</p>
<p>Flask hands them to you on the <code>request</code> object:</p>
<pre><code>from flask import Flask, request     # ← note the extra import!

@app.route("/search")
def search():
    q = request.args.get("q")        # grab ?q=... from the URL
    return f"You searched for: {q}"</code></pre>
<p><code>request</code> is an envelope describing <em>the current visit</em> — who asked, for what, with what data. <code>request.args</code> holds the query-string values. It is a dictionary-style object, so <code>.get("q")</code> works just like on the dicts you know.</p>
<h3>Way 2: POST + forms (sending data properly)</h3>
<p>Query strings are fine for searches, but you would not send a password in a URL (it shows on screen and in history!). For real submissions — signups, messages, orders — the browser makes a <strong>POST</strong> request with the data tucked inside the request body.</p>
<p>A route only answers POST if you allow it, and the submitted values arrive in <code>request.form</code>:</p>
<pre><code>@app.route("/register", methods=["POST"])   # this route accepts POST
def register():
    name = request.form.get("name")         # form data, not URL data
    return f"Welcome, {name}!"</code></pre>
<h3>Trying both with the test client</h3>
<pre><code>client.get("/search?q=chai")                     # GET with a query string
client.post("/register", data={"name": "Asha"})  # POST with form data</code></pre>
<p>That <code>data={...}</code> is exactly what a browser sends when someone fills in a form and clicks Submit — you are simulating the Submit button.</p>
<div class="tip">Rule of thumb: <strong>GET asks, POST sends.</strong> Reading pages and searching → GET + <code>request.args</code>. Submitting or changing something → POST + <code>request.form</code>.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> two talking-back routes:
<ol>
<li><code>/search</code> — reads <code>q</code> from the query string, returns <code>You searched for: [q]</code></li>
<li><code>/register</code> — accepts <strong>POST</strong>, reads <code>name</code> from the form, returns <code>Welcome, [name]!</code></li>
</ol>`,
      starter: 'from flask import Flask, request\napp = Flask(__name__)\n\n# your two routes here\n\n\n# --- test drive ---\nclient = app.test_client()\nprint(client.get("/search?q=chai").text)\nprint(client.post("/register", data={"name": "Asha"}).text)\n',
      validate(out, code) {
        return out.includes('You searched for: chai') && out.includes('Welcome, Asha!') &&
          code.includes('request.args') && code.includes('request.form');
      },
      solution: 'from flask import Flask, request\napp = Flask(__name__)\n\n@app.route("/search")\ndef search():\n    q = request.args.get("q")\n    return f"You searched for: {q}"\n\n@app.route("/register", methods=["POST"])\ndef register():\n    name = request.form.get("name")\n    return f"Welcome, {name}!"\n\nclient = app.test_client()\nprint(client.get("/search?q=chai").text)\nprint(client.post("/register", data={"name": "Asha"}).text)\n',
      hint: 'Search route: q = request.args.get("q"). Register route needs methods=["POST"] in the @app.route line, then name = request.form.get("name").'
    }
  },

  {
    id: 'flask-json',
    title: 'JSON APIs — when apps talk to apps',
    minutes: 10,
    html: `
<p>Not every visitor to a server is a human with a browser. When your weather app shows today's temperature, it asked a server. When a food delivery app lists restaurants — a server. No web page involved: <em>an app asked a server for raw data</em>. That kind of route is called an <strong>API</strong>, and you are one lesson away from building one.</p>
` + overview([
  'What an API is (you use twenty of them every day)',
  'JSON — the data format apps speak',
  'Building API routes with jsonify',
]) + `
<h3>APIs: pages made of data</h3>
<p><strong>API</strong> stands for Application Programming Interface — but forget the expansion. An API route is simply a route that returns <strong>data instead of a page</strong>. Same Flask, same routes, same request–response cycle; the only difference is what comes back: no HTML decoration, just facts, for another program to use.</p>
<h3>JSON — the data language</h3>
<p>The data format of the web is <strong>JSON</strong> (JavaScript Object Notation — again, forget the expansion). Here is some:</p>
<pre><code>[
  {"name": "idli", "price": 30},
  {"name": "dosa", "price": 50}
]</code></pre>
<p>Look familiar? It is almost exactly Python's lists and dictionaries. That is why Python and JSON are best friends — your data structures translate directly.</p>
<h3>jsonify: dict in, API out</h3>
<p>Flask converts for you — import <code>jsonify</code>, hand it your list or dict:</p>
<pre><code>from flask import Flask, jsonify

menu = [
    {"name": "idli", "price": 30},
    {"name": "dosa", "price": 50},
]

@app.route("/api/menu")
def api_menu():
    return jsonify(menu)</code></pre>
<p>Now any app in the world could request <code>/api/menu</code> and get your menu as clean JSON — ready to display, total up, or translate. Your first API. It is genuinely that small.</p>
<div class="note">Starting API paths with <code>/api/…</code> is a naming convention, not a Flask rule — it keeps human pages (<code>/menu</code>) and data routes (<code>/api/menu</code>) clearly separated. Follow it; future-you says thanks.</div>
<div class="tip">This is exactly how the apps on your phone work: a beautiful app on the front, JSON APIs like this one underneath. When people say "backend developer" — this lesson is the heart of that job.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Your assignment:</strong> build an API route <code>/api/menu</code> that returns your snack menu as JSON — a list of at least <strong>two</strong> dictionaries, each with a <code>"name"</code> and a <code>"price"</code>.`,
      starter: 'from flask import Flask, jsonify\napp = Flask(__name__)\n\n# 1. build your menu: a list of dicts with "name" and "price"\nmenu = [\n]\n\n# 2. your /api/menu route here\n\n\nclient = app.test_client()\nprint(client.get("/api/menu").text)\n',
      validate(out, code) {
        return out.includes('"name"') && out.includes('"price"') && code.includes('jsonify');
      },
      solution: 'from flask import Flask, jsonify\napp = Flask(__name__)\n\nmenu = [\n    {"name": "idli", "price": 30},\n    {"name": "dosa", "price": 50},\n]\n\n@app.route("/api/menu")\ndef api_menu():\n    return jsonify(menu)\n\nclient = app.test_client()\nprint(client.get("/api/menu").text)\n',
      hint: 'Each menu item looks like {"name": "idli", "price": 30}. The route is one line of body: return jsonify(menu).'
    }
  },
  ]},

  /* ---------- MODULE: Project & the real world ---------- */
  { title: 'Project & the real world', lessons: [

  {
    id: 'project-flask-guestbook',
    title: 'Project: the guestbook',
    minutes: 18,
    html: `
<p>Final build. You are going to make a <strong>guestbook</strong> — a little site where visitors sign their name and leave a message, like the register at a homestay. It uses <em>everything</em> from this course: routes, HTML, forms, POST, and a JSON API. This is a real, complete web application.</p>
` + overview([
  'Designing an app as a set of routes',
  'Keeping data in memory between requests',
  'Combining pages, forms and an API in one app',
]) + `
<h3>The spec</h3>
<p>Professionals start by listing the routes. Here is yours:</p>
<pre><code>messages = []          # each entry: {"name": ..., "text": ...}

POST /sign             # accepts form data (name, text), stores the message,
                       #   returns "Signed!"
GET  /                 # the guestbook page: an &lt;h1&gt; plus one &lt;li&gt; per
                       #   message, like "Asha: Hello from Kochi!"
GET  /api/messages     # the same messages as JSON — the API view</code></pre>
<h3>Hints before you build</h3>
<ul>
<li>The <code>messages</code> list lives <em>outside</em> the functions — so every request sees the same list. Append a dict to it in <code>/sign</code>.</li>
<li>For the page, either build the HTML with an f-string loop, or use <code>render_template_string</code> with <code>{% for %}</code> — your choice. (The template way is prettier; you learned it two lessons ago.)</li>
<li><code>/api/messages</code> is one line of body. You know the line. 😉</li>
</ul>
<p>The starter code includes a <strong>test drive script</strong> that signs the book twice, then views the page and the API — exactly the kind of test a professional would write. When all its output looks right, you have shipped.</p>
<div class="note">Notice the messages vanish every time you re-run: the list lives in memory, and memory resets. Real apps fix this with a <strong>database</strong> — that is the very next thing to learn after this course, and now you understand exactly <em>why</em> it is needed.</div>`,
    exercise: {
      type: 'python',
      task: `<strong>Build the guestbook:</strong> implement the three routes from the spec — <code>POST /sign</code> (store a message from form data), <code>GET /</code> (HTML page listing every message as an <code>&lt;li&gt;</code>), and <code>GET /api/messages</code> (the JSON version). The test drive at the bottom checks all three.`,
      starter: 'from flask import Flask, request, jsonify, render_template_string\napp = Flask(__name__)\n\nmessages = []   # each entry: {"name": ..., "text": ...}\n\n# your three routes here\n\n\n# --- test drive ---\nclient = app.test_client()\nclient.post("/sign", data={"name": "Asha", "text": "Hello from Kochi!"})\nclient.post("/sign", data={"name": "Ravi", "text": "Flask is fun"})\nprint(client.get("/").text)\nprint(client.get("/api/messages").text)\n',
      validate(out, code) {
        return out.includes('Asha') && out.includes('Ravi') && out.includes('Flask is fun') &&
          /<li>/.test(out) && out.includes('[') &&
          code.includes('request.form') && code.includes('jsonify');
      },
      solution: 'from flask import Flask, request, jsonify, render_template_string\napp = Flask(__name__)\n\nmessages = []\n\n@app.route("/sign", methods=["POST"])\ndef sign():\n    messages.append({\n        "name": request.form.get("name"),\n        "text": request.form.get("text"),\n    })\n    return "Signed!"\n\n@app.route("/")\ndef home():\n    return render_template_string("""\n      <h1>Guestbook</h1>\n      <ul>\n      {% for m in messages %}\n        <li>{{ m.name }}: {{ m.text }}</li>\n      {% endfor %}\n      </ul>""", messages=messages)\n\n@app.route("/api/messages")\ndef api_messages():\n    return jsonify(messages)\n\nclient = app.test_client()\nclient.post("/sign", data={"name": "Asha", "text": "Hello from Kochi!"})\nclient.post("/sign", data={"name": "Ravi", "text": "Flask is fun"})\nprint(client.get("/").text)\nprint(client.get("/api/messages").text)\n',
      hint: '/sign needs methods=["POST"] and appends {"name": request.form.get("name"), "text": request.form.get("text")} to messages. The page loops over messages; the API is return jsonify(messages).'
    }
  },

  {
    id: 'flask-real-computer',
    title: 'Flask on your real computer (and the world)',
    minutes: 8,
    html: `
<p>Everything you built here is real Flask — so let's end by moving it to a real machine, seeing <code>app.run()</code> finally do its thing, and pointing you at what comes next.</p>
` + overview([
  'Setting up and running Flask locally, step by step',
  'What localhost:5000 means',
  'Putting a Flask app on the internet, and what to learn next',
]) + `
<h3>The local setup ritual</h3>
<pre><code>mkdir guestbook && cd guestbook   # a folder for the project
python -m venv venv               # a private Python for this project (good hygiene)
source venv/bin/activate          # switch it on (Windows: venv\\Scripts\\activate)
pip install flask                 # install Flask into it
</code></pre>
<p>Then put your app in <code>app.py</code>, with two new lines at the bottom instead of the test client:</p>
<pre><code>if __name__ == "__main__":
    app.run(debug=True)</code></pre>
<p>Run <code>python app.py</code>, and Flask prints:</p>
<pre><code> * Running on http://127.0.0.1:5000</code></pre>
<p>Open that address in your browser — <strong>your app, served by a real server, on your machine</strong>. <code>127.0.0.1</code> (nickname: <code>localhost</code>) means "this very computer", and <code>:5000</code> is the <strong>port</strong> — a numbered door on the machine; Flask's favorite door is 5000.</p>
<p><code>debug=True</code> is your development best friend: the server auto-restarts when you save the file, and errors show a helpful page instead of a blank one. (Switch it off for anything public.)</p>
<h3>Growing the project</h3>
<p>As an app grows, the pro folder layout appears naturally:</p>
<pre><code>guestbook/
├── app.py           # your routes
├── templates/       # HTML files → render_template("home.html")
└── static/          # CSS, images, JavaScript</code></pre>
<h3>Putting it on the internet</h3>
<p>Remember deploying from the vibe-coding course? Same story, Python edition. Free-tier friendly homes for Flask apps: <strong>PythonAnywhere</strong> (easiest for beginners), <strong>Render</strong>, and <strong>Railway</strong>. Push your code to GitHub, connect the service, and your guestbook gets a real URL your friends can sign.</p>
<h3>Where to go next</h3>
<ul>
<li><strong>A database</strong> — SQLite first. Your guestbook forgets everything on restart; a database is how it remembers. This is the single most valuable next step.</li>
<li><strong>Sessions and login</strong> — letting users sign in and be remembered.</li>
<li><strong>The Flask docs</strong> — genuinely well-written; you now know enough to read them.</li>
</ul>
<div class="tip">You now hold the full stack of ideas behind every web app you use: requests, routes, templates, forms, APIs. Everything bigger — Django, FastAPI, even backends in other languages — is these same ideas wearing different clothes. 🎓</div>`,
    exercise: {
      type: 'quiz',
      task: 'Final knowledge check:',
      questions: [
        { q: 'http://localhost:5000 means…', options: ['A website on the internet', 'Your own computer, door number 5000', 'Flask\'s official homepage'], a: 1 },
        { q: 'debug=True is great in development because…', options: ['It makes the app faster', 'Auto-restart on save + helpful error pages (but switch it off in public!)', 'It is required for Flask to run'], a: 1 },
        { q: 'Your guestbook forgets all messages when restarted. The fix is…', options: ['A bigger messages list', 'A database, like SQLite — data that survives restarts', 'Never restarting the server'], a: 1 },
      ]
    }
  },
  ]},
]},
];

/* ================================================================
   THE ATTIC — deep-dive "Explore more" reference pages.
   Counted in course progress; linked from related lessons.
   ================================================================ */
const DEEPDIVES = {

'deep-terminal': {
  title: 'The Terminal — beginner to pro',
  icon: '🖥',
  course: 'basics',
  minutes: 15,
  back: 'terminal-basics',
  html: `
<p>This is your complete field guide to the terminal — every command you will actually use, organized by what you are trying to do. Bookmark it, come back whenever you forget one (everyone forgets them constantly — that is normal).</p>
<div class="note">Commands marked 🏠 work right here in the practice terminal. The rest are for a real Linux/Mac terminal (or Git Bash / WSL on Windows) — this page tells you what they do so nothing surprises you out there.</div>

<h3>Moving around 🏠</h3>
<pre><code>pwd              # where am I? (print working directory)
ls               # list what is here
ls -l            # list with details: sizes, dates, permissions
ls -a            # list ALL - including hidden files (names starting with .)
cd projects      # go into a folder
cd ..            # up one level
cd ../..         # up two levels
cd ~             # jump straight home from anywhere
cd -             # jump BACK to where you just were (so useful!)
tree             # draw the whole folder structure 🏠</code></pre>

<h3>Creating, copying, moving, deleting</h3>
<pre><code>mkdir app                # make a folder 🏠
mkdir -p a/b/c           # make nested folders in one go
touch notes.txt          # make an empty file 🏠
cp file.txt backup.txt   # copy a file
cp -r folder1 folder2    # copy a whole folder (-r = recursive)
mv old.txt new.txt       # rename a file
mv file.txt ~/docs/      # ...or move it somewhere
rm file.txt              # delete a file 🏠  (NO recycle bin - it is GONE)
rm -r folder             # delete a folder and everything in it 🏠</code></pre>
<div class="tip">⚠️ The most feared command in existence is <code>rm -rf /</code> — "delete everything, don't ask". Never run it, never paste commands you don't understand, and be slow and careful anytime you type <code>rm</code>. There is no undo.</div>

<h3>Reading files</h3>
<pre><code>cat notes.txt        # print the whole file 🏠
less notes.txt       # scroll through a big file (q to quit)
head notes.txt       # just the first 10 lines
tail notes.txt       # just the last 10 lines
tail -f app.log      # watch a file LIVE as it grows (great for logs)</code></pre>

<h3>Writing without an editor 🏠</h3>
<pre><code>echo "hello"                  # print text to the screen
echo "hello" &gt; notes.txt      # write text INTO a file (replaces content!)
echo "more" &gt;&gt; notes.txt      # append to the end (keeps content)</code></pre>

<h3>Finding things</h3>
<pre><code>grep "error" app.log         # show lines containing "error" in a file
grep -r "TODO" .             # search inside EVERY file, in every subfolder
grep -i "error" app.log      # -i = ignore uppercase/lowercase
find . -name "*.py"          # find files by name pattern
which python                 # where does this command live?</code></pre>
<p><code>grep</code> alone will save you hours. "Where did I use that variable?" — one grep away.</p>

<h3>Power tools: pipes and wildcards</h3>
<p>Here is where the terminal beats clicking forever. The <code>|</code> (pipe) feeds one command's output into the next:</p>
<pre><code>history | grep git           # every git command you have ever typed
cat app.log | grep error | head    # first few error lines - 3 tools chained!
ls | wc -l                   # count files (wc -l counts lines)</code></pre>
<p>And <code>*</code> (wildcard) means "anything matching":</p>
<pre><code>ls *.py            # only Python files
cp *.jpg photos/   # copy every jpg at once
rm *.tmp           # delete all temp files (careful, as always!)</code></pre>

<h3>System info & processes</h3>
<pre><code>whoami             # your username 🏠
date               # current date & time 🏠
history            # everything you have typed
df -h              # disk space (-h = human readable sizes)
du -sh folder      # how big is this folder?
ps aux             # every running program
kill 1234          # stop the program with ID 1234
top                # live view of what is using your CPU (q to quit)</code></pre>

<h3>Keyboard shortcuts — the real pro speed</h3>
<pre><code>Tab        # AUTOCOMPLETE. type "cd pro" + Tab → "cd projects/"
           # the single biggest terminal upgrade. use it always.
↑ / ↓      # scroll through previous commands
Ctrl + C   # STOP whatever is running (your emergency brake)
Ctrl + L   # clear the screen (same as typing clear)
Ctrl + R   # search your command history as you type
Ctrl + A   # jump to start of the line,  Ctrl + E → end</code></pre>

<h3>Getting help</h3>
<pre><code>man ls           # the full manual for any command (q to quit)
ls --help        # quick summary of options
tldr ls          # community cheat sheet - install with: pip install tldr</code></pre>

<h3>A word about sudo</h3>
<pre><code>sudo apt install python3     # Linux: install software system-wide</code></pre>
<p><code>sudo</code> means "run this as the computer's administrator". It exists for installing software and changing system settings. Rule of thumb for beginners: only use <code>sudo</code> when a trusted guide tells you to, and read the command twice before pressing Enter.</p>

<h3>Your daily top 10</h3>
<p>If you only remember ten: <code>cd</code> <code>ls</code> <code>pwd</code> <code>mkdir</code> <code>touch</code> <code>cat</code> <code>rm</code> <code>grep</code> <code>Tab</code> <code>↑</code>. Everything else, you now know exists — and knowing it exists is enough to look it up in five seconds.</p>`
},

'deep-git': {
  title: 'Git — beginner to pro',
  icon: '🌿',
  course: 'basics',
  minutes: 18,
  back: 'git-basics',
  html: `
<p>Everything you will actually use in daily Git work — including the part nobody teaches beginners: <strong>how to undo things</strong>. Because the whole point of Git is that nothing is ever truly lost.</p>
<div class="note">The 🏠 basics (init, status, add, commit, log, branch, checkout, remote, push) work in the practice terminal. The rest is for real projects on your machine — which, after the GitHub page in the Attic, you will have.</div>

<h3>One-time setup on a real machine</h3>
<p>The very first thing after installing Git — tell it who you are (this name/email gets stamped on every commit you make):</p>
<pre><code>git config --global user.name "Demo Coder"
git config --global user.email "demo.coder@example.com"
git config --global init.defaultBranch main
git config --list        # check what you set</code></pre>

<h3>The daily loop (recap + upgrades) 🏠</h3>
<pre><code>git init                   # start tracking (once per project)
git status                 # ALWAYS your first move when unsure
git add file.py            # stage one file
git add .                  # stage everything
git commit -m "message"    # save the snapshot
git log                    # full history
git log --oneline          # compact history - one line per commit ✨</code></pre>

<h3>Seeing what actually changed</h3>
<p>Before you commit, look at what you did:</p>
<pre><code>git diff                 # what changed, but is NOT staged yet
git diff --staged        # what is staged and about to be committed
git show                 # what did the last commit change?</code></pre>
<p>Lines starting with <code>+</code> were added, <code>-</code> were removed. Reading diffs before committing catches so many mistakes.</p>

<h3>Undoing things — the superpower section 🦸</h3>
<p><strong>"I messed up a file and want it back how it was":</strong></p>
<pre><code>git restore file.py          # throw away unstaged changes to that file
git restore .                # ...for everything (careful!)</code></pre>
<p><strong>"I staged something I didn't mean to":</strong></p>
<pre><code>git restore --staged file.py   # take it out of the cart (keeps your edits)</code></pre>
<p><strong>"My last commit message has a typo / I forgot a file":</strong></p>
<pre><code>git add forgotten.py
git commit --amend -m "better message"   # redo the last commit</code></pre>
<p><strong>"That whole commit was a mistake":</strong></p>
<pre><code>git revert abc1234     # makes a NEW commit that undoes commit abc1234
                       # (history stays honest - the safe choice)</code></pre>
<p><strong>"I need to switch tasks NOW but I'm mid-mess":</strong></p>
<pre><code>git stash              # sweep uncommitted changes into a drawer
git stash pop          # ...and take them back out later</code></pre>
<div class="tip">You will also see <code>git reset --hard</code> online — "erase recent commits like they never happened". It really erases. As a beginner, prefer <code>revert</code> (safe) and treat <code>reset --hard</code> like power tools: useful, but read the manual first.</div>

<h3>Branches, properly 🏠</h3>
<pre><code>git branch                  # list branches (* = you are here)
git checkout -b feature     # create + switch  (new style: git switch -c feature)
git checkout main           # switch back      (new style: git switch main)
git branch -d feature       # delete a merged branch (tidy!)</code></pre>
<p><strong>Merging</strong> — bringing your experiment home. Stand on the branch that should RECEIVE the changes:</p>
<pre><code>git checkout main
git merge feature      # pull feature's commits into main</code></pre>

<h3>Merge conflicts — don't panic 🧯</h3>
<p>If two branches changed the <em>same lines</em>, Git stops and asks you to choose. It marks the spot right in the file:</p>
<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
print("hello from main")
=======
print("hello from feature")
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature</code></pre>
<p>Your job: edit the file to keep what you want (maybe one side, maybe both, maybe something new), delete the <code>&lt;&lt;&lt;</code> <code>===</code> <code>&gt;&gt;&gt;</code> marker lines, then <code>git add .</code> and <code>git commit</code>. That's the whole scary "merge conflict" — a fill-in-the-blank exercise.</p>

<h3>Remotes (recap + the missing pieces) 🏠</h3>
<pre><code>git remote add origin &lt;url&gt;   # connect to GitHub (once)
git push -u origin main       # first push (-u remembers the destination)
git push                      # every push after that
git pull                      # download other people's new commits
git clone &lt;url&gt;               # download a whole repo for the first time</code></pre>

<h3>.gitignore — teaching Git to look away</h3>
<p>Some files should never be committed: passwords, huge downloads, junk your tools generate. Create a file named exactly <code>.gitignore</code> in your project root:</p>
<pre><code># .gitignore
.env                 # secret keys live here - NEVER commit
__pycache__/         # python's auto-generated junk
node_modules/        # huge auto-installed folder (JS projects)
*.log                # any log file</code></pre>
<p>Git now treats those as invisible. Every real project has a <code>.gitignore</code>, and <code>.env</code> belongs in it from day one.</p>

<h3>The cheat sheet to end all cheat sheets</h3>
<pre><code>git status                    # what is going on?
git add .  &&  git commit -m "..."   # save
git push                      # upload
git pull                      # download
git checkout -b name          # new experiment
git restore file              # undo my edits
git stash                     # hide my mess for a minute
git log --oneline             # what happened here?</code></pre>
<p>That is 95% of real-world Git. The other 5% you will learn one Stack Overflow search at a time, like everyone before you. 🙂</p>`
},

'deep-github': {
  title: 'GitHub — beginner to pro',
  icon: '🐙',
  course: 'basics',
  minutes: 20,
  back: 'github',
  html: `
<p>The complete walkthrough: from "I have no account" to "I push code from my terminal like a professional". We will follow a fictional beginner — <strong>Demo Coder</strong>, username <code>demo-coder</code>, email <code>demo.coder@example.com</code> — through every single step. Wherever you see their details, substitute your own.</p>

<h3>Step 1 — Create the account (5 minutes)</h3>
<ol>
<li>Go to <a href="https://github.com" target="_blank">github.com</a> → <strong>Sign up</strong></li>
<li>Email: <code>demo.coder@example.com</code> (use a real email you own — GitHub sends a verification code)</li>
<li>Password: long and unique. A password manager is your friend.</li>
<li>Username: <code>demo-coder</code> — <strong>choose yours carefully!</strong> It becomes your public identity and lives in all your URLs: <code>github.com/demo-coder</code>. Short, professional, ideally close to your real name. (You're naming your programmer self. No <code>xX_dark_lord_Xx</code>. 😄)</li>
<li>Verify the email code, skip the personalization questions — the <strong>Free plan has everything you need</strong>, now and for years.</li>
</ol>

<h3>Step 2 — A 60-second tour</h3>
<ul>
<li><strong>Your profile</strong> — <code>github.com/demo-coder</code> — your public page: repos, activity graph (the green squares!), bio.</li>
<li><strong>Repository page</strong> — one project: its files, history, and README shown front and center.</li>
<li><strong>Issues</strong> — a to-do/bug list attached to every repo.</li>
<li><strong>Pull requests</strong> — proposed changes waiting for review. The heart of teamwork.</li>
<li><strong>Stars ⭐</strong> — bookmarks/likes for repos. (A repo with 50k stars = the whole world uses it.)</li>
</ul>

<h3>Step 3 — Create your first repository</h3>
<ol>
<li>Click the <strong>+</strong> (top right) → <strong>New repository</strong></li>
<li>Name: <code>my-first-repo</code> (lowercase-with-dashes is the convention)</li>
<li>Description: "My first repository — hello, world!"</li>
<li><strong>Public</strong> (it's your portfolio — let it be seen!)</li>
<li>Tick <strong>"Add a README file"</strong> → <strong>Create repository</strong> 🎉</li>
</ol>
<p>The README (a <code>.md</code> Markdown file — remember extensions?) is your repo's front page. Every project deserves three lines: what it is, how to run it, what you learned.</p>

<h3>Step 4 — The password problem (read this, it confuses everyone)</h3>
<p>Here is what trips up every beginner: when your terminal pushes to GitHub, <strong>your account password will not work</strong>. GitHub removed that years ago for security. The terminal needs one of two special credentials:</p>
<ul>
<li><strong>Personal Access Token (PAT)</strong> — a generated password just for tools. Easier today.</li>
<li><strong>SSH key</strong> — a cryptographic key pair. Better forever (no expiry, nothing to retype).</li>
</ul>
<p>Set up both once, and you'll never think about this again.</p>

<h3>Step 5a — The token way (HTTPS + PAT)</h3>
<ol>
<li>GitHub → your avatar → <strong>Settings</strong> → scroll to <strong>Developer settings</strong> → <strong>Personal access tokens → Tokens (classic)</strong></li>
<li><strong>Generate new token (classic)</strong> · Note: "my laptop" · Expiration: 90 days · tick the <code>repo</code> scope</li>
<li>Generate — it shows something like:<br><code>ghp_DEMO1234abcd5678efgh9012ijkl3456mnop</code><br><strong>Copy it immediately</strong> — GitHub never shows it again (lose it = just make a new one, no harm).</li>
<li>Now, on your machine:</li>
</ol>
<pre><code>$ git push -u origin main
Username: demo-coder
Password: ghp_DEMO1234abcd5678efgh9012ijkl3456mnop   ← the TOKEN, not your password!</code></pre>
<p>To stop retyping it, let Git remember credentials:</p>
<pre><code>git config --global credential.helper store   # remembers after the next push</code></pre>

<h3>Step 5b — The SSH way (what pros settle on)</h3>
<p>Think of SSH as a matching pair: a <strong>private key</strong> (stays secret on your computer) and a <strong>public key</strong> (you hand to GitHub). When you push, they recognize each other — no passwords, ever. Watch Demo Coder set it up, command by command:</p>
<pre><code># 1. generate the key pair (press Enter at every question - defaults are fine)
$ ssh-keygen -t ed25519 -C "demo.coder@example.com"
Generating public/private ed25519 key pair.
Your key has been saved in /home/demo/.ssh/id_ed25519

# 2. show the PUBLIC key (the .pub one - never share the other!)
$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 AAAAC3NzDEMOKEYxyz123... demo.coder@example.com

# 3. copy that whole line, then on GitHub:
#    Settings → SSH and GPG keys → New SSH key
#    Title: "my laptop" · paste the key · Add SSH key

# 4. test the handshake:
$ ssh -T git@github.com
Hi demo-coder! You've successfully authenticated. ✓</code></pre>
<p>One detail: with SSH, repo addresses use the SSH form — <code>git@github.com:demo-coder/my-first-repo.git</code> instead of <code>https://github.com/...</code>. GitHub's green <strong>Code</strong> button shows both; just pick the SSH tab.</p>

<h3>Step 6 — The full ceremony: local project → GitHub</h3>
<p>Demo Coder has a calculator project (sound familiar?) on their laptop. Here is the complete, real sequence — you will run exactly this with your own details:</p>
<pre><code>$ cd calculator
$ git init
$ git add .
$ git commit -m "my calculator project"

# create an EMPTY repo named calculator on github.com (+ → New, no README this time)

$ git remote add origin git@github.com:demo-coder/calculator.git
$ git push -u origin main

# refresh the GitHub page... your code is on the internet! 🎉</code></pre>
<p>From then on, updating is just: <code>git add .</code> → <code>git commit -m "..."</code> → <code>git push</code>.</p>

<h3>Step 7 — Working with the rest of the world</h3>
<pre><code>git clone git@github.com:demo-coder/calculator.git
                      # download any repo (yours, or anyone's public one)
git pull              # fetch the latest commits (new laptop? teammate pushed?)</code></pre>
<p><strong>Fork + Pull Request</strong> — how strangers improve each other's code: you <em>fork</em> someone's repo (your own copy), fix something on a branch, push to your fork, then open a <strong>pull request</strong> — "here is my improvement, want it?". They review, discuss, merge. This is how open source works, and yes — beginners' PRs get merged every day. Fixing a typo in a project's README is a real, celebrated first contribution.</p>

<h3>Step 8 — Pro touches</h3>
<ul>
<li><strong>The gh CLI</strong> — GitHub's official terminal tool. <code>gh auth login</code> once (it handles all the token stuff for you interactively!), then <code>gh repo create</code>, <code>gh repo clone</code>, <code>gh pr create</code> without leaving the terminal.</li>
<li><strong>Profile README</strong> — create a repo named exactly <code>demo-coder</code> (your username) with a README; it appears on your profile page. Say who you are and what you're building.</li>
<li><strong>Green squares</strong> — every commit paints your activity graph. Push those three course projects and watch it come alive. Recruiters really do glance at it.</li>
<li><strong>Never commit secrets</strong> — <code>.env</code> in <code>.gitignore</code>, always. If a token/key ever lands in a pushed commit: revoke it immediately. Git history remembers forever — remembering is its whole job.</li>
</ul>

<h3>Your GitHub checklist</h3>
<pre><code>☐ Account created (good username!)
☐ First repo with a README
☐ PAT or SSH key set up (SSH recommended)
☐ Pushed a real project from the terminal
☐ Profile README telling the world who you are</code></pre>
<p>Tick all five and you are — no exaggeration — ahead of most computer science students. 🚀</p>`
},
};
