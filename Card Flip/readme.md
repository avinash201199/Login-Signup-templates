# 🔐 Login/Signup Template

A minimal, modern login/signup template with flip card animation, social authentication buttons, and eye-catching hover effects.

![Status](https://img.shields.io/badge/Status-Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## ✨ Features

- 🔄 **Flip Card Animation** - Smooth 3D flip between login and signup
- 🎨 **Circular Ripple Effects** - Eye-catching hover animations on buttons
- 👁️ **Password Toggle** - Show/hide password functionality
- 🔗 **Social Login Buttons** - Google and GitHub authentication ready
- 📱 **Fully Responsive** - Works on all devices
- 🎭 **Backdrop Blur** - Modern glassmorphism effect
- 🚀 **Zero Dependencies** - Pure HTML, CSS, and JavaScript

## 🖼️ Background Image

Place your background image as `background.jpg` in the same directory as `index.html`.

## 🚀 Quick Start

1. **Clone or download** the files
2. **Add your background image** named `background.jpg`
3. **Open** `index.html` in your browser
4. **Customize** the styles and functionality as needed

## 📁 File Structure

```
├── index.html          # Main HTML structure
├── style.css           # Styling with animations
├── script.js           # Card flip & form logic
├── background.jpg      # Your background image
└── readme.md           # Documentation
```

## 🔧 Integration Guide

### Step 1: Basic Setup

Copy the three files (`index.html`, `style.css`, `script.js`) to your project directory.

### Step 2: Backend Integration

#### Login Form Handler

```javascript
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            // Redirect to dashboard
            window.location.href = '/dashboard';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
    }
});
```

#### Signup Form Handler

```javascript
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Account created successfully! Please login.');
            flipCard(new Event('click')); // Switch to login
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again.');
    }
});
```

### Step 3: Google OAuth Integration

1. **Get Google OAuth Credentials**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs

2. **Add Google Sign-In Script**

```html
<!-- Add to <head> in index.html -->
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

3. **Update Google Button Handler**

```javascript
// Initialize Google Sign-In
function initGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
        callback: handleGoogleResponse
    });
}

function handleGoogleResponse(response) {
    // Send token to your backend
    fetch('/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
    });
}

// Update button click
document.querySelectorAll('.btn-google').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        google.accounts.id.prompt();
    });
});

// Initialize on page load
window.onload = initGoogleSignIn;
```

### Step 4: GitHub OAuth Integration

1. **Register OAuth App on GitHub**
   - Go to Settings → Developer settings → OAuth Apps
   - Create new OAuth App
   - Set Authorization callback URL

2. **Update GitHub Button Handler**

```javascript
const GITHUB_CLIENT_ID = 'your_github_client_id';
const REDIRECT_URI = 'http://localhost:3000/auth/github/callback';

document.querySelectorAll('.btn-github').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`;
        window.location.href = githubAuthUrl;
    });
});
```

3. **Handle Callback** (Backend required)

```javascript
// Example callback handler
app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code;
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        })
    });
    
    const { access_token } = await tokenResponse.json();
    
    // Get user data
    const userResponse = await fetch('https://api.github.com/user', {
        headers: {
            'Authorization': `token ${access_token}`
        }
    });
    
    const userData = await userResponse.json();
    
    // Create session and redirect
    // ... your auth logic here
});
```

## 🎨 Customization

### Change Colors

Edit `style.css`:

```css
/* Primary button gradient */
.btn-primary {
    background: linear-gradient(135deg, #your-color1 0%, #your-color2 100%);
}

/* Link color */
.link {
    color: #your-accent-color;
}
```

### Change Card Size

```css
.container {
    max-width: 500px; /* Change width */
}

.card {
    height: 650px; /* Change height */
}
```

### Disable Flip Animation

Remove flip functionality and show both forms as separate pages, or use tabs instead.

## 🔒 Security Best Practices

1. **HTTPS Only** - Always use HTTPS in production
2. **CSRF Protection** - Implement CSRF tokens
3. **Rate Limiting** - Limit login attempts
4. **Password Validation** - Enforce strong passwords (min 8 chars, special chars, etc.)
5. **Input Sanitization** - Sanitize all inputs on backend
6. **Secure Cookies** - Use httpOnly and secure flags
7. **Token Expiration** - Implement JWT with expiration

## 📱 Responsive Breakpoints

- Desktop: > 768px (default view)
- Tablet: 481px - 768px
- Mobile: < 480px (stacked social buttons)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Form Validation Examples

Add to your forms:

```javascript
// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength
function validatePassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
}
```

## 🚀 Production Deployment

1. Minify CSS and JS files
2. Optimize background image (WebP format, max 200KB)
3. Add meta tags for SEO
4. Implement proper error handling
5. Add loading states
6. Use environment variables for API keys

## 📄 License

MIT License - feel free to use in your projects

## 🤝 Contributing

Contributions welcome! Feel free to submit issues or PRs.

---

**Need help?** Open an issue or check the integration examples above.

Made with ❤️ for modern web authentication
