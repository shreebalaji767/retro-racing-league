# Manual test plan

## Smoke tests
1. Load `index.html`; verify canvas, controls, selectors, telemetry and garage render.
2. Start a race. Verify the overlay hides and speed/lap/position update.
3. Pause with P and the pause button; resume; start a new race.
4. Change difficulty and circuit then start another race.

## Controls
- Hold each arrow key and verify steering, throttle and braking.
- Hold Space for nitro; release and verify recharge.
- Touch each on-screen control; verify pointer release/cancel stops the input.
- Resize to a narrow viewport and verify controls remain visible and tappable.

## Progression
- Finish a race and verify credits and championship points are awarded.
- Buy upgrades when balance is sufficient; verify credits decrease by 100.
- Verify upgrade buttons disable at zero credits and level 5.
- Reload and verify credits, upgrades and best lap persist.

## Static hosting
- Confirm all paths are relative and no build command is required.
- Open DevTools Network: gameplay should not require third-party requests.
- Enable GitHub Pages from `main` and `/(root)`; verify the published site loads.
- Check the browser console for errors during the complete race flow.
