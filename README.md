# Retro Racing League

A dependency-free retro arcade racing game built with HTML, CSS, Canvas and vanilla JavaScript.

## Free by design
- No AI APIs or AI services (rivals use simple local scripted behavior).
- No paid assets, APIs, subscriptions, ads, backend, or build step.
- Runs locally and on GitHub Pages.
- Progress is saved in the browser with `localStorage`; records are device/browser-specific.

## Run locally
Open `index.html` in a modern browser.

## Publish with GitHub Pages
1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select `main` and `/(root)`, then save.
4. Open the published URL shown by GitHub Pages.

## Controls
- Arrow keys: steer, accelerate and brake.
- Space: nitro.
- P: pause.
- Touch buttons are included for mobile devices.

## Current project
The initial playable build is intentionally dependency-free. It can be expanded into separate `css/`, `js/core/`, `js/racing/`, `js/modes/`, `js/progression/` and `tests/` modules as the game grows.
