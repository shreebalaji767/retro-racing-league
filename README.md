# Retro Racing League

A free top-down 16-bit-style racing game for GitHub Pages. Built with HTML, CSS, Canvas and vanilla JavaScript. No framework, build process, backend, external API, paid assets, ads, or AI services.

## Features
- Keyboard and visible mobile touch controls
- Four difficulty settings and three selectable circuit palettes
- Local scripted rival drivers (ordinary JavaScript; no AI service)
- Three-lap races, race rewards, championship points and garage upgrades
- Engine and handling upgrades purchased only with earned in-game credits
- Browser-local save data through `localStorage`

## Run locally
Open `index.html` in a modern browser, or serve the folder with any local static file server.

## Deploy to GitHub Pages
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Select `main` and folder `/(root)`, then save.
4. Wait for the Pages workflow to finish and open the URL GitHub provides.

No build step is needed. Keep asset paths relative so the site works under a repository subpath.

## Controls
- Arrow keys: steer / accelerate / brake
- Space: nitro
- P: pause
- Touch buttons: mobile controls

## Save data
Progress is local to the browser/device and can be erased by clearing site data. There is no global online leaderboard or cross-device synchronization.

## Testing checklist
- [ ] Open the site from the repository root and from its GitHub Pages URL.
- [ ] Start, pause, resume and restart a race.
- [ ] Check all four difficulty levels and all three track palettes.
- [ ] Finish three laps; verify credits, points and best-lap data update.
- [ ] Buy engine and handling upgrades; verify insufficient credits and max level are handled.
- [ ] Test keyboard controls and touch controls on a phone-sized viewport.
- [ ] Reload and confirm saved credits/upgrades/best lap persist.
- [ ] Inspect browser console for errors and verify no external network requests are required.

The game is a compact first full-game foundation, not a professional racing simulator. Rival logic and championship progression are deliberately local and deterministic enough to run entirely on static hosting.