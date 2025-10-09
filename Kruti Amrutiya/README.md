# Responsive Login & Signup Template with Social Login

A modern and responsive **Login & Signup template** built using **HTML, CSS, and JavaScript**, featuring:

- Smooth **flipping card UI** for switching between login and signup forms.
- **Responsive design** for desktop and mobile.
- Styled inputs, buttons, and error messages.
- **Password toggle** functionality.
- **Social login** integration using **Google** and **GitHub** via Firebase Authentication.
- "Remember Me" functionality for login form.

---

## 📂 Project Structure

project/
│── index.html # Main HTML page
│── style.css # CSS styling
│── script.js # JavaScript for form validation & interactivity
│── README.md # Project documentation

---

## ⚙️ Features

### Login Form
- Email & password validation.
- Toggle password visibility.
- Remember Me option (stores email in localStorage).
- Social login buttons: Google & GitHub.
- Error messages shown for empty or invalid fields.

### Signup Form
- Name, email & password fields with validation.
- Toggle password visibility.
- Prevent duplicate emails (stored in localStorage).
- Switch to login form smoothly with flip animation.

### Social Login
- Integrated with **Firebase Authentication**.
- Supports **Google** and **GitHub** login.
- Popup login with OAuth flow.
- User info (name, email) accessible after login.

---

## Setup

1. Clone or download the repo.
2. Serve the project via a **local server** (e.g., VS Code Live Server, `npx serve`, or Python `http.server`) — Firebase social login does **not** work with `file:///`.
3. Create a **Firebase project** and enable **Google** and **GitHub** providers.
4. Add your development domain (e.g., `localhost`) to **Authorized Domains** in Firebase.
5. Include Firebase SDK in your HTML and configure authentication providers.

---

## Notes

- User credentials are stored in **localStorage** for demo purposes.
- Social login requires a valid domain and Firebase OAuth configuration.

## 👨‍💻 Author

**Kruti Amrutiya**

