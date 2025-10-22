# 🔑 Login Portal – Animated Sliding Panel Design

![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=flat-square)  
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)  
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)  
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

A modern, animated login and registration portal with a sleek sliding panel design. This responsive web application features smooth transitions and a user-friendly interface for authentication.

## Features

- **Dual Form System**: Seamlessly switch between Sign In and Sign Up forms
- **Animated Transitions**: Smooth sliding animations powered by CSS transitions
- **User Type Selection**: Support for multiple user roles (Staff, Student, Admin)
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean interface with gradient backgrounds and rounded inputs
- **Form Validation**: Built-in HTML5 form validation for required fields

## Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Advanced styling with animations, gradients, and flexbox/grid layouts
- **JavaScript**: Interactive form switching functionality
- **Font Awesome**: Icon library for input field icons
- **Google Fonts**: Poppins font family for modern typography

## Project Structure

```
Igneel-98/
│
├── img/                # Image assets folder
│   ├── log.svg         # Login panel illustration
│   └── register.svg    # Registration panel illustration
├── index.html          # Main HTML file
├── script.js           # JS for form switching functionality
├── style.css           # CSS with animations and responsive design
└── README.md           # Project documentation
```

## Usage

### Sign In
1. Enter your email address
2. Enter your password
3. Select your user type (Staff Member, Student, or Admin)
4. Click the "Login" button

### Sign Up
1. Click the "Sign Up" button on the left panel
2. Enter a username
3. Enter your email address
4. Create a password
5. Select "Student" as user type
6. Click the "Sign up" button

### Switching Between Forms
- Click "Sign Up" button to access the registration form
- Click "Back" button to return to the login form

## Customization

### Color Scheme
The portal uses a purple gradient theme. To customize colors, modify these CSS variables in `style.css`:

```css
/* Primary button color */
background-color: #610C9F;

/* Button hover color */
background-color: #940B92;

/* Gradient background */
background-image: linear-gradient(-45deg, #610C9F 0%, #ac0ca9 100%);
```

### User Types
To add or modify user types, edit the `<select>` options in `index.html`:

```html
<option value="newtype">New User Type</option>
```

## Responsive Breakpoints

- **Desktop**: > 870px
- **Tablet**: 571px - 870px
- **Mobile**: < 570px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

**Contribution to [Login-Signup-templates](https://github.com/avinash201199/Login-Signup-templates) repository**