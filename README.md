# CodeRoof 🏠

Learn to code — all under one roof. A beginner-friendly interactive learning site with:

- **Course 1 — Programming Basics** (17 lessons): the terminal, Git, GitHub, Python fundamentals (variables, input, if/else, loops, lists/dicts, functions, importing libraries like `random`), then three guided projects — calculator, number guessing game, to-do list app.
- **Course 2 — Vibe Coding & Prompt Engineering** (7 lessons): building with AI tools, writing strong prompts, context engineering, the vibe-coding workflow, debugging with AI, and shipping to a real URL.
- **Course 3 — Web Development with Flask** (9 lessons): how the web works, routes, dynamic URLs, Jinja templates, forms & POST, JSON APIs, a guestbook capstone project, and running/deploying Flask for real. Flask installs into the in-browser Python on demand (via micropip) and exercises use Flask's own test client as a "pretend browser".
- **🪜 The Attic** — optional beginner-to-pro deep-dive pages (Terminal, Git, GitHub), linked from related lessons via "Explore more". They count toward course progress too.

Every lesson ends with hands-on practice that is **auto-checked**:

- 🖥 A **practice terminal** in the page — simulated bash + Git on a virtual file system (`ls`, `cd`, `mkdir`, `cp`, `mv`, `head`, `tail`, `grep`, `wc`, `git init/add/commit/branch/push`…), a tiny **`nano` editor** (Ctrl+O saves, Ctrl+X exits), plus a **real Python REPL** via the `python` command.
- 🐍 **Real Python** code editors powered by [Pyodide](https://pyodide.org) (Python compiled to WebAssembly — runs in the browser, `input()` included).
- ✅ Quizzes and an AI-prompt grader for the vibe-coding course.

Progress is saved in `localStorage`. Lessons are linkable via URL hash (e.g. `#py-hello`).

## Run it

```bash
cd coderoof
python -m http.server 8321
# open http://localhost:8321
```

(Or just open `index.html` directly — an internet connection is needed the first time Python loads, since Pyodide comes from a CDN.)

## Files

| File | What it is |
|---|---|
| `index.html` | Page shell: sidebar, content area, terminal panel |
| `style.css` | Design system — warm cream, serif headings, terracotta accent, dark-mode aware |
| `lessons.js` | All course content + exercise definitions and auto-check logic |
| `terminal.js` | Virtual file system, simulated bash + Git, Python REPL bridge |
| `app.js` | Rendering, navigation, progress, Pyodide loader, exercise wiring |

No build step, no frameworks — plain HTML/CSS/JS. Deploy anywhere static (Vercel, Netlify, GitHub Pages).
