Accessibility changes (How to contribute dialog)

Summary

- Made the "How to contribute" dialog keyboard- and screen-reader-friendly.
- Replaced the non-focusable close <span> with a proper <button> (focusable, actionable).
- Added ARIA states on the trigger: aria-expanded and aria-controls.
- Made the dialog container focusable (tabindex="-1") and preserved role="dialog" aria-modal="true".
- Implemented focus management: save/restore focus when opening/closing.
- Implemented keyboard handling: Esc to close and Tab/Shift+Tab focus trap inside the dialog.
- Overlay click closes the dialog (click outside popup-content).

How to test (manual)

1. Open `index.html` in your browser.
2. Keyboard-only test:
   - Tab to the "How to contribute" button.
   - Press Enter or Space to open the dialog.
   - Focus should move inside the dialog (close button or first focusable element).
   - Tab should cycle focus inside the dialog (should not escape to page behind).
   - Shift+Tab should cycle in reverse.
   - Press Escape — the dialog should close and focus should return to the trigger.
3. Mouse/overlay test:
   - Click outside the dialog content (on the overlay) to close.
   - Click the close (×) button to close and focus should return to the trigger.
4. Screen reader:
   - Open the dialog, ensure it is announced (role="dialog" and labelled by the dialog heading).

Notes

- A small comment describing these changes was added to `script.js`.
- I attempted a syntax check with Node.js, but Node is not available in the environment ("node" not found). Please run a quick smoke test in a browser to validate runtime behavior.

If you want, I can also add this summary into `README.md` instead of a separate file.
