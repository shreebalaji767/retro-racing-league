# Retro Racing League

A free top-down 16-bit-style arcade racing game built with HTML, CSS, Canvas and vanilla JavaScript. It is designed for static GitHub Pages hosting: no framework, build step, backend, third-party API, AI service, paid asset, advertisement, account, or subscription.

## Features
- Track-edge driving physics, wet-weather traction loss, steering inertia, damage, nitro, collision knockback and checkpoint-sequenced lap validation
- **70 built-in circuits**: 20 original venues plus 50 new tracks with varied route profiles, distinct names, themed trackside scenery, and per-circuit surface grip (ice, sand, city asphalt and more). Choose from the clickable circuit grid or the native selector. Saved custom circuits remain supported.
- Four selectable difficulty levels and four modes: Grand Prix, Time Attack, Elimination and Endurance
- Local racing-line rivals with lane changes, passing attempts and corner-sensitive pace; no AI service, remote calls or online account
- Five-round Grand Prix career, saved race history, points, wins, podiums, credits, achievements and personal bests
- Local challenge board, saved custom circuit editor, season standings/archive, per-challenge records and earnable cosmetic paint with no performance advantage
- Automatic local race replays (last five races), with in-game playback controls
- Local split-screen two-player duel (P1: arrows + Space; P2: WASD + Shift)
- Rule-based race engineer tips for wet grip, damage, off-road driving, nitro and pit windows
- High-contrast, large-text, reduced-motion and alternate-theme options
- Twelve original car profiles; unlock cars and buy engine/handling upgrades with earned in-game credits only
- Local Time Attack ghost recording/playback and per-track records
- Endurance pit service, rain effects, original synthesized sound effects, optional CRT scanlines and reduced-effects mode
- Keyboard and visible touch controls, pause/resume and responsive layout
- Local save, JSON export/import and reset
- Original Canvas pixel-art visuals and a custom SVG logo used as the site favicon
- Installable PWA with offline app-shell caching after first successful visit (HTTPS/localhost required)
- Responsive desktop, tablet, mobile and landscape layouts with touch-sized controls
- No external images, fonts, libraries or paid dependencies

## Run and publish
Open index.html in a modern browser for gameplay, or serve the directory using a local static file server. PWA installation and offline caching require HTTPS (GitHub Pages provides HTTPS) or localhost. On supported browsers, use **INSTALL APP**; if the browser does not offer an install prompt, the button explains the browser-specific Add to Home Screen path. iPhone/iPad installation is available through Safari's Share → Add to Home Screen flow. For GitHub Pages, open Settings → Pages, choose Deploy from a branch, then select main and /(root). See the [GitHub Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

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
The game JavaScript was syntax-parsed and exercised in a mocked browser runtime. A GitHub Actions workflow now runs JavaScript syntax checks, static regression checks, and mocked-browser race simulations on all four difficulties plus local two-player duel on pushes and pull requests. Simulated Grand Prix, wet Time Attack, Elimination and eight-lap Endurance races all completed; tests also checked track/car counts, lap progression, rewards, time-trial ghost recording, elimination events, DOM ID coverage and sound control wiring. See tests/manual-test-plan.md for checks still recommended in a real browser, including a full race on each difficulty and testing saved custom circuits.

A real-browser play-through and the live GitHub Pages deployment were not independently verified as part of these checks.