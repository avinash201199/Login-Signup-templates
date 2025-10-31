// Flip Card
function flipCard(event) {
    event.preventDefault();
    const card = document.getElementById('authCard');
    card.classList.toggle('flipped');
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling;
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
    toggleBtn.classList.toggle('active');
}

// Form Submissions
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Login submitted:', Object.fromEntries(formData));
    
    // Add your login logic here
    alert('Login form submitted! Check console for data.');

    loginForm.reset();
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Password validation
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    console.log('Signup submitted:', data);
    
    // Add your signup logic here
    alert('Signup form submitted! Check console for data.');

    signupForm.reset();
});

// Social Login Handlers
document.querySelectorAll('.btn-google').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Google login clicked');
        // Add Google OAuth logic here
        alert('Google login clicked! Implement OAuth here.');
    });
});

document.querySelectorAll('.btn-github').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('GitHub login clicked');
        // Add GitHub OAuth logic here
        alert('GitHub login clicked! Implement OAuth here.');
    });
});

// Ripple Effect on Button Click
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        ripple.style.width = '0';
        ripple.style.height = '0';
        
        setTimeout(() => {
            ripple.style.width = '400px';
            ripple.style.height = '400px';
        }, 10);
    });
});
