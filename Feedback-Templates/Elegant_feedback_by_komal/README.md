# Elegant Feedback (by Komal)

A polished, responsive feedback form template designed to match the project's homepage look & feel.

## Preview
Open in browser:
- Feedback-Templates/index.html -> click "Elegant_Feedback_by_komal" card  
Or open directly:
- Feedback-Templates/Elegant_Feedback_by_komal/index.html

## Files
- index.html — HTML markup for the feedback form
- styles.css — styles (inherits Feedback-Templates/styles.css)
- form.js — client-side validation + simulated submit
- README.md — this file

## Dependencies
- No build tools required. Works with plain HTML/CSS/JS.
- Uses the shared Feedback-Templates styles for fonts and colors.

## Integration
To use this template in your project:
1. Copy the entire `Elegant_Feedback_by_komal` folder into your project.
2. Include the CSS and JS files (or inline the markup) in your target page.
3. Update the form action or AJAX handler to post feedback to your backend (currently simulated).

Example: replace simulated submit in `form.js` with your API call:
```js
// submit form data to /api/feedback
fetch('/api/feedback', { method: 'POST', body: formData })
```

## Show up on Feedback index
1. Add a screenshot named exactly:
   `Feedback-Templates/screenshots/Elegant_Feedback_by_komal.png`
2. Ensure `feedback-script.js` contains `"Elegant_Feedback_by_komal"` in the `feedbackTemplateFolders` array.

## Customization
- Colors and typography inherit from `Feedback-Templates/styles.css`.
- Override local styles in `styles.css` inside this folder.

## Accessibility & Notes
- Form fields include labels and basic validation.
- Ensure server-side validation is added when integrating.

## License
Include the repository license or your preferred license in this folder if different.
