const navbarMenu = document.querySelector(".navbar .links");
const hamburgerBtn = document.querySelector(".hamburger-btn");
const hideMenuBtn = navbarMenu.querySelector(".close-btn");
const showPopupBtn = document.querySelector(".login-btn");
const formPopup = document.querySelector(".form-popup");
const hidePopupBtn = formPopup.querySelector(".close-btn");
const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");


// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    // Change icon depending on theme
    if (document.body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'light_mode';
    } else {
        themeToggleBtn.textContent = 'dark_mode';
    }
});

// Show mobile menu
hamburgerBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show-menu");
});

// Hide mobile menu
hideMenuBtn.addEventListener("click", () =>  hamburgerBtn.click());

// Show login popup
showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
});

// Hide login popup
hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

// Show or hide signup form
signupLoginLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
    });
});

//password strength 
const signupPassword = document.getElementById('signup-password');
const strengthValue = document.querySelector('.password-strength .strength-value');

signupPassword.addEventListener('input', () => {
    const val = signupPassword.value;
    let strength = '';
    let strengthClass = '';

    if (val.length === 0) {
        strength = '-';
        strengthClass = '';
    } else if (val.length < 6) {
        strength = 'Weak';
        strengthClass = 'strength-weak';
    } else if (val.length < 8) {
        // Medium: length 6-7
        strength = 'Medium';
        strengthClass = 'strength-medium';
    } else {
        // Strong: 8+ with letters, numbers, special char
        const hasUpper = /[A-Z]/.test(val);
        const hasLower = /[a-z]/.test(val);
        const hasNumber = /\d/.test(val);
        const hasSpecial = /[@$!%*?&]/.test(val);

        if (hasUpper && hasLower && hasNumber && hasSpecial) {
            strength = 'Strong';
            strengthClass = 'strength-strong';
        } else {
            strength = 'Medium';
            strengthClass = 'strength-medium';
        }
    }

    strengthValue.textContent = strength;
    strengthValue.className = `strength-value ${strengthClass}`;
});


//pass visiblility

document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        // get the input inside the same input-field container
        const input = icon.parentElement.querySelector("input");
        if (input.type === "password") {
            input.type = "text";
            icon.textContent = "visibility_off";
        } else {
            input.type = "password";
            icon.textContent = "visibility";
        }
    });
});


