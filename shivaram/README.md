# 🌟 Glassmorphism Login/Signup Page

A visually stunning, responsive login and signup interface built with pure **HTML, CSS, and JavaScript**. This design features a **Glassmorphism** effect over a high-quality background image, providing a modern and cohesive user experience.

The interface uses a smooth side-to-side transition to switch between the Login and Signup forms, and includes social login options (Google & GitHub).

---

## 📸 Design Overview

| Feature | Description |
| :--- | :--- |
| **Aesthetic** | Glassmorphism (Frosted Glass) over a full-page background image. |
| **Color Scheme** | Muted, monochromatic tones (whites, grays, and transparent darks) to complement the background image. |
| **Functionality** | Smooth transition toggle between the Login and Signup views. |
| **Dependencies** | None (Pure HTML/CSS/JS) + Font Awesome for social icons. |

---

## 🛠️ Implementation Guide

### 1. Project Setup

To implement this interface, create a new folder for your project and save the following four files inside it:

1.  **`index.html`**: The main page structure.
2.  **`style.css`**: All the design, styling, and animations.
3.  **`script.js`**: The JavaScript logic for switching the forms.
4.  **`image.jpg`**: Your desired background image
   
### 2. File Contents

Ensure your files contain the following code:

#### `index.html` (The Structure)

#### `style.css` (The Glassmorphism Look)

#### `script.js` (The Toggle Logic)

```javascript
const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');

// Switch to Signup View
signUpButton.addEventListener('click', () => {
    container.classList.add("active");
});

// Switch to Login View
logInButton.addEventListener('click', () => {
    container.classList.remove("active");
});
```
<img width="1919" height="906" alt="shivaram1" src="https://github.com/user-attachments/assets/269c893b-6f4c-44c3-a762-94f7411b1b29" />

<img width="1919" height="903" alt="shivaram2" src="https://github.com/user-attachments/assets/63d2b7d8-7f5e-4c4f-afa9-45a8917ec89c" />

---
