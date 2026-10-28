# Retro Racing League

A free top-down 16-bit-style arcade racing game built with HTML, CSS, Canvas and vanilla JavaScript. It is designed for static GitHub Pages hosting: no framework, build step, backend, third-party API, AI service, paid asset, advertisement, account, or subscription.

## Features
- Track-edge driving physics, wet-weather traction loss, steering inertia, damage, nitro, collision knockback and checkpoint-sequenced lap validation
- Ten visually distinct, procedurally shaped circuits
- Four selectable difficulty levels and four modes: Grand Prix, Time Attack, Elimination and Endurance
- Local racing-line rivals with lane changes, passing attempts and corner-sensitive pace; no AI service, remote calls or online account
- Five-round Grand Prix career, saved race history, points, wins, podiums, credits, achievements and personal bests
- Local challenge board, saved custom circuit editor, championship results table, per-challenge records and earnable cosmetic paint with no performance advantage
- High-contrast, large-text, reduced-motion and alternate-theme options
- Twelve original car profiles; unlock cars and buy engine/handling upgrades with earned in-game credits only
- Local Time Attack ghost recording/playback and per-track records
- Endurance pit service, rain effects, original synthesized sound effects, optional CRT scanlines and reduced-effects mode
- Keyboard and visible touch controls, pause/resume and responsive layout
- Local save, JSON export/import and reset
- Original Canvas pixel-art visuals, no external images, fonts, libraries or paid dependencies

## Run and publish
Open index.html in a modern browser, or serve the directory using any local static file server. For GitHub Pages, open Settings → Pages, choose Deploy from a branch, then select main and /(root). See the [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Controls
- Arrow keys: steer, accelerate, brake
- Space: nitro
- P: pause/resume
- Enter: start/restart when not racing
- Touch buttons: on-screen controls on phones/tablets
- Pit Stop button: service the car in Endurance mode when slow, in the outer pit lane

## Save data
Career data stays in the browser's local storage. Export a JSON backup to move progress to another device. There is no global leaderboard or online synchronization. Time-trial ghosts are also stored locally.

## Validation
The game JavaScript was syntax-parsed and exercised in a mocked browser runtime. A GitHub Actions workflow now runs JavaScript syntax checks and static regression checks on pushes and pull requests. Simulated Grand Prix, wet Time Attack, Elimination and eight-lap Endurance races all completed; tests also checked track/car counts, lap progression, rewards, time-trial ghost recording, elimination events, DOM ID coverage and sound control wiring. See tests/manual-test-plan.md for checks still recommended in a real browser, including a full race on each difficulty and testing saved custom circuits.

A real-browser play-through and the live GitHub Pages deployment were not independently verified as part of these checks.