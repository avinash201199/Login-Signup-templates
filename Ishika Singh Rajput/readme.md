Modern Login/Signup UI
This project is a modern, two-panel Login and Signup user interface template featuring a dark, abstract design on the welcome side and a clean Glassmorphism effect on the authentication form side.

✨ Features
Modern Aesthetic: Dark theme with vibrant neon accents (blue and purple).

Glassmorphism Effect: The login/signup form utilizes a frosted glass transparency effect.

Responsive Design: Uses Flexbox for easy layout management.

Functional Toggling: Seamless switching between the Login and Sign Up forms using a toggle switch, header text, and welcome panel CTA buttons.

Dynamic Content: The welcome panel text changes dynamically based on the active form (Login or Signup).

🚀 Getting Started
To run this project, you only need a modern web browser.

📁 Project Structure
Create the following file structure in your project folder:

modern-auth-ui/
├── index.html
├── style.css
└── script.js
💻 Installation
Download/Copy Code: Copy the provided HTML, CSS, and JavaScript code into the respective files (index.html, style.css, script.js).

Open: Open the index.html file in your web browser (e.g., Chrome, Firefox, Safari).

🛠️ Technologies Used
Technology Purpose
HTML5 Defines the structure and content of the authentication interface.
CSS3 Styles the template, including Flexbox layout, dark theme, neon colors, and the Glassmorphism effect.
JavaScript Handles the core functionality of switching between the Login and Signup views.
Font Awesome Used for the user (fas fa-user), lock (fas fa-lock), and email (fas fa-envelope) icons in the input fields.

Export to Sheets
⚙️ Key Functionality
The switching logic is handled entirely by JavaScript in script.js by manipulating CSS classes:

Form Visibility: The script toggles the .hidden class on the <form> elements (#loginForm and #signupForm) to show only the active form.

Visual Feedback: The script adds or removes the .active-signup class on the main container to change:

The welcome panel's primary button colors (to reflect the active state).

The background gradient/glow of the abstract panel (to shift the color emphasis).

Content Update: It updates the text content of the headers (#formTitle, #welcomeTitle) to match the active state.

🤝 Contributing
This project is a simple template design. Feel free to modify the colors, fonts, and patterns to suit your needs!
