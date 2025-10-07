
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});


function validateLoginForm() {
    const name = document.getElementById('l-name').value;
    const password = document.getElementById('l-password').value;
    let isValid = true;


    document.getElementById('nameerror').textContent = '';
    document.getElementById('passworderror').textContent = '';


    if (name.trim() === '') {
        document.getElementById('nameerror').textContent = 'Username is required';
        isValid = false;
    }


    if (password.trim() === '') {
        document.getElementById('passworderror').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passworderror').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        alert('Login successful!');
    }
}

function validateSignupForm() {
    const name = document.getElementById('r-name').value;
    const phone = document.getElementById('r-phoneNumber').value;
    const email = document.getElementById('r-email').value;
    const password = document.getElementById('r-password').value;
    let isValid = true;


    document.getElementById('snameerror').textContent = '';
    document.getElementById('phoneerror').textContent = '';
    document.getElementById('emailerror').textContent = '';
    document.getElementById('spassworderror').textContent = '';


    if (name.trim() === '') {
        document.getElementById('snameerror').textContent = 'Full name is required';
        isValid = false;
    }


    const phoneRegex = /^\d{10}$/;
    if (phone.trim() === '') {
        document.getElementById('phoneerror').textContent = 'Phone number is required';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('phoneerror').textContent = 'Please enter a valid 10-digit phone number';
        isValid = false;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        document.getElementById('emailerror').textContent = 'Email is required';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailerror').textContent = 'Please enter a valid email address';
        isValid = false;
    }


    if (password.trim() === '') {
        document.getElementById('spassworderror').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('spassworderror').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        alert('Sign up successful!');
    }
}