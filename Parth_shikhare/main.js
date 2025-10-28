// Tab Switching Functionality
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Password Toggle Functionality
const toggleButtons = document.querySelectorAll('.toggle-password');

toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);

        if (targetInput.type === 'password') {
            targetInput.type = 'text';
            button.textContent = '🙈';
        } else {
            targetInput.type = 'password';
            button.textContent = '👁️';
        }
    });
});

// Form Validation and Submission
const loginFormEl = document.getElementById('login-form');
const signupFormEl = document.getElementById('signup-form');

loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Handle remember me functionality (in a real app, this would set cookies/localStorage)
    if (rememberMe) {
        // Simulate setting a "remember me" token
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', email);
        console.log('User will be remembered for future sessions');
    } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
    }

    // Simulate login (in a real app, this would send to server)
    const message = rememberMe ?
        'Login successful! You will be remembered for future visits. (This is a demo)' :
        'Login successful! (This is a demo)';
    alert(message);
});

signupFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const termsAccepted = document.getElementById('terms').checked;

    if (!email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!termsAccepted) {
        alert('Please accept the terms and conditions.');
        return;
    }

    // Simulate signup (in a real app, this would send to server)
    alert('Sign up successful! (This is a demo)');
});

// Add some animation on load
document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.querySelector('.form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(20px)';

    setTimeout(() => {
        formContainer.style.transition = 'all 0.5s ease';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 100);

    // Check if user was previously remembered
    const remembered = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('userEmail');

    if (remembered === 'true' && rememberedEmail) {
        document.getElementById('login-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
});