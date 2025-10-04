# [SYSTEM_ACCESS_TERMINAL] - Hacker Login/Sign Up Template

A cyber-themed login and registration interface featuring a glowing **neon-green** aesthetic and a dynamic **Matrix-style code rain** background.

## 💾 Project Structure

The project consists of three main files:

* `index.html`: The core HTML structure for the Login and Sign Up forms.
* `style.css`: The CSS for the neon theme, terminal look, and positioning of the canvas.
* `script.js`: Contains logic for switching between forms and the **Canvas-based Matrix animation**.

## ✨ Features

* **Hacker Aesthetic:** Uses a monospace font, dark background, and bright green text for a terminal look.
* **Dynamic Background:** Real-time **Matrix code rain** generated using JavaScript and HTML Canvas.
* **Form Toggling:** Simple JavaScript function to switch between the **Login** and **Registration** views without a page reload.
* **Neon Glow Effects:** Subtle CSS box-shadows on inputs and the main container to simulate a monitor glow.

## 🚀 Getting Started

To view and use this template, simply follow these steps:

1.  **Clone or Download** the files (`index.html`, `style.css`, `script.js`).
2.  **Open `index.html`** in any modern web browser.

No server or compilation is required, as the project uses only client-side HTML, CSS, and JavaScript.

## ⚙️ Customization

| File | Area of Focus | Tip |
| :--- | :--- | :--- |
| `style.css` | **Color Scheme** | Modify the `--text-color` and `--accent-color` CSS variables. |
| `script.js` | **Matrix Speed** | Change the interval time in `setInterval(drawMatrix, 33);` (lower number = faster). |
| `script.js` | **Matrix Characters** | Change the `const chars` variable to include different character sets (e.g., just numbers, or more symbols). |