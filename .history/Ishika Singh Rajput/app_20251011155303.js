// Get elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

// Toggle to Signup form
showSignup.addEventListener('click', () => {
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
});

// Toggle to Login form
showLogin.addEventListener('click', () => {
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Simple form validation
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if(email && password) {
        alert(`Logged in as ${email}`);
        loginForm.reset();
    } else {
        alert('Please fill all fields');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    if(name && email && password) {
        alert(`Account created for ${name}`);
        signupForm.reset();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    } else {
        alert('Please fill all fields');
    }
});
