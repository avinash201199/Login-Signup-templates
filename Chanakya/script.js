const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginFormBox = document.querySelector('.login-form');
const signupFormBox = document.querySelector('.signup-form');

showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginFormBox.classList.remove('active');
    signupFormBox.classList.add('active');
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupFormBox.classList.remove('active');
    loginFormBox.classList.add('active');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    console.log('Login attempt:', { email, password });
    alert('Login successful! (This is a demo)');
    
    loginForm.reset();
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    console.log('Signup attempt:', { name, email, password });
    alert('Account created successfully! (This is a demo)');
    
    signupForm.reset();
    signupFormBox.classList.remove('active');
    loginFormBox.classList.add('active');
});