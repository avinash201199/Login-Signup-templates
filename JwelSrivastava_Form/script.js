// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.querySelector('.login-btn');
const rememberCheckbox = document.getElementById('remember');

// Password visibility toggle
togglePasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('active');
});

// Form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function showInputError(input, message) {
    input.style.borderColor = 'var(--error-color)';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: var(--error-color);
        font-size: 12px;
        margin-top: 4px;
        animation: slideDown 0.3s ease;
    `;
    input.parentNode.appendChild(errorDiv);
}

function clearInputError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccess(message) {
    // Create success notification
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: var(--shadow-medium);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// Real-time validation
emailInput.addEventListener('input', function() {
    if (this.value && !validateEmail(this.value)) {
        showInputError(this, 'Please enter a valid email address');
    } else {
        clearInputError(this);
    }
});

passwordInput.addEventListener('input', function() {
    if (this.value && !validatePassword(this.value)) {
        showInputError(this, 'Password must be at least 6 characters long');
    } else {
        clearInputError(this);
    }
});

// Form submission
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;
    
    // Clear previous errors
    clearInputError(emailInput);
    clearInputError(passwordInput);
    
    // Validate email
    if (!email) {
        showInputError(emailInput, 'Email is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showInputError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showInputError(passwordInput, 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showInputError(passwordInput, 'Password must be at least 6 characters long');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    loginBtn.classList.add('loading');
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate login logic (replace with actual authentication)
        if (email === 'demo@example.com' && password === 'password') {
            showSuccess('Login successful! Welcome back.');
            
            // Store remember me preference
            if (rememberCheckbox.checked) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('userEmail', email);
            }
            
            // Redirect or perform post-login actions
            setTimeout(() => {
                console.log('Redirecting to dashboard...');
                // window.location.href = '/dashboard';
            }, 1500);
            
        } else {
            throw new Error('Invalid credentials');
        }
        
    } catch (error) {
        // Show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = error.message || 'Login failed. Please try again.';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--error-color);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 3000);
        
    } finally {
        // Hide loading state
        loginBtn.classList.remove('loading');
    }
});

// Social login handlers
document.querySelector('.google-btn').addEventListener('click', function() {
    console.log('Google login clicked');
    showSuccess('Google login integration would go here');
});

document.querySelector('.github-btn').addEventListener('click', function() {
    console.log('GitHub login clicked');
    showSuccess('GitHub login integration would go here');
});

// Remember me functionality
window.addEventListener('load', function() {
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && (emailInput === document.activeElement || passwordInput === document.activeElement)) {
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        emailInput.value = '';
        passwordInput.value = '';
        clearInputError(emailInput);
        clearInputError(passwordInput);
        emailInput.focus();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        0% {
            opacity: 0;
            transform: translateX(100px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    .error-message {
        animation: slideDown 0.3s ease;
    }
`;
document.head.appendChild(style);

// Card tilt effect
const loginCard = document.querySelector('.login-card');
let isMouseOver = false;

loginCard.addEventListener('mouseenter', function() {
    isMouseOver = true;
});

loginCard.addEventListener('mouseleave', function() {
    isMouseOver = false;
    this.style.transform = '';
});

loginCard.addEventListener('mousemove', function(e) {
    if (!isMouseOver) return;
    
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});

// Demo credentials hint
console.log('Demo credentials: email: demo@example.com, password: password');