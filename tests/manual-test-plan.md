# Manual test plan

## Automated checks already performed
- JavaScript syntax parsing and startup in a mocked browser environment.
- All referenced HTML element IDs exist.
- Ten circuit definitions and twelve car profiles are present.
- Simulated Grand Prix completed 3 laps, awarded credits and advanced the round.
- Simulated wet Time Attack completed and saved a local ghost recording.
- Simulated Elimination removed rivals during a race and completed.
- Simulated Endurance completed eight laps.
- Sound toggle event wiring was checked.

## Real-browser physics and laps
- Start each difficulty and verify acceleration, braking, steering and nitro.
- Steer beyond both track edges; speed should drop and damage should increase.
- Wet mode should reduce grip; handling upgrades should improve grip.
- Verify the first lap is counted only after a full circuit and finish triggers once after 3 laps (or 8 for Endurance).
- Confirm each of the ten circuit shapes, start line and pit marker align with the track.
- Hit rivals; speed/damage should react without locking controls.
- Pause/resume repeatedly; time should not jump while paused.

## Modes, progression and garage
- Grand Prix: finish five rounds; verify points, round number, wins, podiums and champion achievement.
- Time Attack: verify solo race, ghost playback on a subsequent attempt and best time per track.
- Elimination: verify rivals are removed at intervals and finish position reflects eliminated drivers.
- Endurance: verify eight laps and pit stop only works when slow in the outer pit lane.
- Earn credits, unlock cars, buy engine/handling upgrades and verify insufficient credits/max levels.
- Unlock achievements and verify they persist after reload.
- Export save, reset, import save; verify progression and ghosts restore.

## Sound, accessibility and static hosting
- Enable sound after a user click and check synthesized effects; disable it again.
- Toggle CRT scanlines and reduced-effects mode.
- Test touch controls with pointer release/cancel and keyboard controls.
- Check narrow mobile width and button tap targets.
- Enable GitHub Pages from main and /(root); verify the live page loads and inspect console/network requests.

## New phase 1-4 regression coverage
- [ ] Run the GitHub Actions "Static regression checks" workflow and confirm it passes.
- [ ] Complete a full Grand Prix at Easy, Normal, Hard and Expert; verify checkpoints advance in order and one finish/reward occurs per race.
- [ ] Repeatedly contact rivals at high speed; steering remains responsive and damage/speed react.
- [ ] Test passing rivals on inside/outside lines and confirm no rival can permanently block the player.
- [ ] Complete multiple Grand Prix rounds and verify recent results and local points render in Championship Standings.
- [ ] Complete each challenge preset; confirm Time Attack records improve only when a faster time is achieved.
- [ ] Create, save, reload and race a custom circuit; verify it appears in the circuit selector.
- [ ] Test high contrast, large text, reduced motion and alternate theme; refresh and verify preferences persist.
- [ ] Use touch controls on a narrow phone viewport, including pointer cancellation and loss of focus.
- [ ] Test keyboard-only navigation, visible focus indicators and screen-reader labels/status messages.
- [ ] Confirm no external network requests are required and the page still runs as static files.


## Replay and championship season checks
- [ ] Finish a race on each difficulty and verify a replay appears in the replay selector.
- [ ] Play a saved replay, let it finish, stop it early, and start a new race afterward.
- [ ] Finish five Grand Prix rounds and verify season standings archive and reset for the next season.
- [ ] Finish Time Attack, Elimination and Endurance; verify they do not add Grand Prix championship points.
- [ ] Verify the race ranking does not penalize the player merely for cars eliminated earlier.
- [ ] Confirm the automated runtime smoke test completes three laps on Easy, Normal, Hard and Expert.


## Local multiplayer and race engineer
- [ ] Run Local 2-Player Duel; confirm top/bottom views show both cars.
- [ ] Drive P1 with arrow keys and Space nitro; drive P2 with WASD and Shift nitro.
- [ ] Confirm the duel ends when either player completes three laps and reports the winner.
- [ ] Play a saved duel replay and confirm both cars are visible.
- [ ] Confirm engineer guidance changes for wet conditions, off-road driving, damage, low nitro and endurance pit windows.
