# Retro Racing League

A free top-down 16-bit-style arcade racing game built with HTML, CSS, Canvas and vanilla JavaScript. It is designed for static GitHub Pages hosting: no framework, build step, backend, third-party API, AI service, paid asset, advertisement, account, or subscription.

## Features
- Track-boundary physics with off-road slowdown, wet-weather grip, steering, damage, and rival collision response
- Five circuit layouts with different proportions and palettes
- Four selectable difficulty levels and four modes: Grand Prix, Time Attack, Elimination, and Endurance
- Scripted local rivals; no AI service or network calls
- Five-round Grand Prix career, points, wins, podiums, credits, achievements and personal bests
- Eight original car profiles; unlock cars and upgrade engine/handling using earned in-game credits
- Nitro, wet conditions, race telemetry, touch controls, keyboard controls and pause/resume
- Local save, JSON export/import and reset
- Responsive UI and original Canvas pixel-art cars/track, no external assets

## Run and publish
Open `index.html` in a modern browser, or serve the directory using any local static file server. For GitHub Pages, open **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/(root)`. GitHub documents this branch-based setup in its [Pages publishing guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Controls
- Arrow keys: steer, accelerate, brake
- Space: nitro
- P: pause/resume
- Enter: start/restart when not racing
- Touch buttons: on-screen controls on phones/tablets

## Save data
Career data stays in the browser's local storage. Export a JSON backup to move progress to another device. There is no global leaderboard or online synchronization.

## Validation
See `tests/manual-test-plan.md`. JavaScript syntax validation is run before commits; browser gameplay and the live GitHub Pages deployment must still be checked in a real browser after publishing.
