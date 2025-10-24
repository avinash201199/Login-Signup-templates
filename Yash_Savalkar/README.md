🔐 Animated Login & Sign-Up Page

A beautifully designed and dynamic Login & Registration Page built using HTML, CSS, and JavaScript, featuring smooth transitions and an elegant overlay animation. This UI allows users to seamlessly switch between the Sign In and Sign Up panels with a stylish sliding effect — all without any external JavaScript libraries.

✨ Features

🎨 Modern UI Design – Clean, responsive, and visually appealing interface.

⚡ Smooth Transition Effects – Sliding animation between login and registration panels.

💡 No jQuery Required – Built entirely using pure HTML, CSS, and vanilla JavaScript.

📱 Fully Responsive – Optimized for desktops, tablets, and mobile devices.

🔗 Social Login Buttons – Includes placeholders for Facebook, Google, and LinkedIn icons.

❤️ Attractive Footer Section – Simple footer with credit and external links.

🧩 Project Structure
📁 animated-login-signup/
│
├── index.html        # Main HTML structure
├── style.css         # Styling and animations
└── script.js         # JavaScript functionality

🚀 How to Use

Clone or Download this repository.

Open the index.html file directly in your browser.

Click on the “Sign Up” button to slide to the registration form.

Click on the “Sign In” button to return to the login view.

Customize the content, styles, and transitions to fit your project’s theme.

🛠️ Technologies Used

HTML5 – Structure of the web page

CSS3 – Styling and transitions

Vanilla JavaScript – Toggle and animation logic

Font Awesome – Social media icons

🎨 Animation Logic

The animation is achieved by toggling the class:

container.classList.add("right-panel-active");


and

container.classList.remove("right-panel-active");


When this class is applied, CSS transitions move the overlay panel smoothly to reveal the alternate form.

📸 Preview

You can see how the page works in the original concept by Florin Pop’s Blog Post
.
