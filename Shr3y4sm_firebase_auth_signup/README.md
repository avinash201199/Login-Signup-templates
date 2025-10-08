# Firebase Authentication Template

A basic, responsive sign-up form template with Firebase Authentication integration supporting multiple authentication methods.

## 🚀 Features

- **Email/Password Authentication** - Traditional sign-up with email validation
- **Google Sign-In** - One-click authentication with Google OAuth
- **Phone Authentication** - SMS-based verification with reCAPTCHA
- **Form Validation** - Client-side validation with error handling
- **Firebase v12** - Latest Firebase SDK with modular imports

## 📁 Template Structure

```
Shr3y4sm_firebase_auth_signup/
├── index.html          # Main HTML file with sign-up form
├── styles.css          # Modern CSS with glassmorphism design
├── register.js         # Firebase authentication logic
├── app.js             # Alternative vanilla JS implementation
├── config.example.js  # Firebase configuration template
├── config.js          # Your Firebase project configuration
└── README.md          # This documentation
```

## 🛠️ Dependencies

- **Firebase SDK v12.1.0** (loaded via CDN)
- **Google Fonts** (Inter font family)
- **No build tools required** - Pure HTML, CSS, and JavaScript

## ⚙️ Setup Instructions

### 1. Firebase Project Configuration

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and configure sign-in methods:
   - **Email/Password**: Enable in Authentication → Sign-in method
   - **Google**: Enable and configure OAuth consent screen
   - **Phone**: Enable and configure reCAPTCHA settings

3. Copy `config.example.js` to `config.js`:
   ```bash
   cp config.example.js config.js
   ```

4. Fill in your Firebase project configuration in `config.js`:
   ```javascript
   export const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.firebasestorage.app",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

### 2. Domain Configuration

Add your domains to Firebase Authentication → Settings → Authorized domains:
- `localhost` (for development)
- Your production domain (e.g., `yourdomain.com`)

### 3. API Key Security (Recommended)

Restrict your Firebase API key in Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Find your Firebase API key and restrict it by HTTP referrers
4. Add your domains to the restriction list

## 🚀 Development

### Local Development Server

Since Firebase requires HTTPS for some features, use a local web server:

```bash
# Python 3
python -m http.server 5173

# Python 2
python -m SimpleHTTPServer 5173

# Node.js (if you have http-server installed)
npx http-server -p 5173

# PHP
php -S localhost:5173
```

Then open `http://localhost:5173` in your browser.

### Testing Authentication Methods

1. **Email/Password**: Enter valid email and password (min 6 characters)
2. **Google Sign-In**: Click the Google button (requires OAuth setup)
3. **Phone Authentication**: Click phone button and enter number with country code (e.g., +15551234567)

## 📦 Integration into Your Project

### Option 1: Direct Integration

1. Copy the template files to your project
2. Update `config.js` with your Firebase configuration
3. Customize `styles.css` to match your design system
4. Modify form fields in `index.html` as needed

### Option 2: Component Integration

Extract the authentication logic from `register.js` and integrate into your existing application:

```javascript
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use in your application
const handleSignUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Handle successful sign-up
  } catch (error) {
    // Handle error
  }
};
```

## 🎨 Customization

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The template uses CSS custom properties for easy theming
- Glassmorphism effects can be adjusted in the `.card` class

### Form Fields
- Add/remove form fields in `index.html`
- Update validation logic in `register.js`
- Modify Firebase user creation to include additional fields

### Authentication Providers
- Add more providers (Facebook, Twitter, etc.) by importing additional Firebase modules
- Customize provider buttons and styling

## 🔒 Security Considerations

- **API Key**: Firebase web API keys are public by design, but restrict them by referrer
- **Authorized Domains**: Only add trusted domains to Firebase Auth settings
- **Database Rules**: If using Firestore/Realtime Database, configure proper security rules
- **HTTPS**: Use HTTPS in production for secure authentication

## 🐛 Troubleshooting

### Common Issues

1. **reCAPTCHA not working**: Ensure you're testing over HTTPS or localhost
2. **Google Sign-in fails**: Check OAuth consent screen configuration
3. **Phone auth not working**: Verify reCAPTCHA setup and phone number format
4. **CORS errors**: Ensure your domain is in Firebase authorized domains

### Browser Compatibility

- Modern browsers with ES6 module support
- Chrome 61+, Firefox 60+, Safari 10.1+, Edge 16+


## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve this template.
