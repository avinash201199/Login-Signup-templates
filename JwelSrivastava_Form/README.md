# Modern Login Form

A beautiful, modern login form built with pure HTML, CSS, and vanilla JavaScript featuring glassmorphism design, smooth animations, and interactive elements.

## Features

### 🎨 Design
- **Glassmorphism UI** - Modern glass-like appearance with backdrop blur
- **Gradient Background** - Dynamic gradient with floating particles
- **3D Card Effects** - Interactive tilt and hover animations
- **Responsive Design** - Works perfectly on all device sizes

### ⚡ Functionality
- **Real-time Validation** - Instant feedback on form inputs
- **Password Toggle** - Show/hide password with eye icon
- **Remember Me** - Persistent login preference using localStorage
- **Loading States** - Smooth loading animations during form submission
- **Social Login Buttons** - Google and GitHub integration ready
- **Keyboard Shortcuts** - Enter to submit, Escape to clear form

### 🔧 Technical Features
- **Pure Vanilla JavaScript** - No external dependencies
- **CSS Custom Properties** - Easy theme customization
- **Smooth Animations** - CSS transitions and keyframe animations
- **Form Validation** - Client-side validation with error messages
- **Accessibility** - Proper labels, focus states, and keyboard navigation

## Demo Credentials

For testing purposes, use:
- **Email:** demo@example.com
- **Password:** password

## File Structure

```
JwelSrivastava_Form/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
└── README.md           # This documentation
```

## Customization

### Colors
Modify the CSS custom properties in `:root` to change the color scheme:

```css
:root {
    --primary-color: #6366f1;
    --primary-dark: #4f46e5;
    --text-primary: #1e293b;
    /* ... other variables */
}
```

### Animations
All animations are defined in CSS and can be customized by modifying the keyframe animations and transition properties.

### Validation Rules
Update the validation functions in `script.js`:

```javascript
function validateEmail(email) {
    // Custom email validation logic
}

function validatePassword(password) {
    // Custom password validation logic
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Integration

To integrate with a backend:

1. Replace the simulated API call in the form submission handler
2. Update the social login button handlers with actual OAuth flows
3. Modify the success/error handling as needed

## License

This project is open source and available under the MIT License.