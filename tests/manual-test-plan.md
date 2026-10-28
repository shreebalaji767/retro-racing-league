# Manual test plan

## Static/syntax checks
- Run `node --check js/game.js`.
- Verify `index.html` loads `css/style.css` and `js/game.js` with relative paths.
- Verify no external scripts, fonts, images, API endpoints, or build dependencies are present.

## Physics and laps
- Start each difficulty and verify acceleration, braking, steering and nitro.
- Steer beyond both track edges; speed should drop and damage should increase.
- Wet mode should reduce grip and speed.
- Verify the first lap is only counted after a full circuit, and the finish triggers once after 3 laps (or 8 for Endurance).
- Hit rivals from close range; speed/damage should react without locking controls.
- Pause and resume repeatedly; time should not jump while paused.

## Modes and progression
- Grand Prix: finish five rounds; verify points, round number, wins and podiums.
- Time Attack: verify solo race, best time per track and time-based reward.
- Elimination: verify rivals are removed at intervals and remaining field/position updates.
- Endurance: verify the target is eight laps.
- Earn credits, unlock cars, buy engine/handling upgrades and verify insufficient credits/max levels.
- Unlock achievements and verify they persist after reload.
- Export save, reset, import save; verify progression restores.
- Reload and verify local progress persists.

## Responsive/static hosting
- Test narrow mobile width and tap/hold/release each touch control.
- Check keyboard input, pause, tab focus and save import/export.
- Enable GitHub Pages from `main` and `/(root)`; verify the live page loads and inspect console/network requests.
