// DOM Elements
const loginForm = document.querySelector('.login-form');
const signupForm = document.getElementById('signupForm');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const togglePassword = document.getElementById('togglePassword');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');

// Form switching functionality
signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(loginForm, signupForm);
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms(signupForm, loginForm);
});

function switchForms(hideForm, showForm) {
    hideForm.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(() => {
        hideForm.style.display = 'none';
        showForm.style.display = 'block';
        showForm.style.animation = 'fadeIn 0.3s ease-out forwards';
    }, 300);
}

// Password visibility toggle
function setupPasswordToggle(toggleBtn, passwordInput) {
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle eye icon
            toggleBtn.classList.toggle('fa-eye');
            toggleBtn.classList.toggle('fa-eye-slash');
        });
    }
}

// Setup password toggles
setupPasswordToggle(togglePassword, document.getElementById('password'));
setupPasswordToggle(toggleSignupPassword, document.getElementById('signupPassword'));

// Form validation and submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (validateEmail(email) && password.length >= 6) {
        showSuccessMessage('Login successful! Welcome back.');
        // Here you would typically send data to your backend
        console.log('Login attempt:', { email, password });
    } else {
        showErrorMessage('Please enter a valid email and password (min 6 characters).');
    }
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;
    
    if (validateSignupForm(fullName, email, password, confirmPassword, termsAccepted)) {
        showSuccessMessage('Account created successfully! Welcome aboard.');
        // Here you would typically send data to your backend
        console.log('Signup attempt:', { fullName, email, password });
    }
});

function validateSignupForm(fullName, email, password, confirmPassword, termsAccepted) {
    if (!fullName.trim()) {
        showErrorMessage('Please enter your full name.');
        return false;
    }
    
    if (!validateEmail(email)) {
        showErrorMessage('Please enter a valid email address.');
        return false;
    }
    
    if (password.length < 6) {
        showErrorMessage('Password must be at least 6 characters long.');
        return false;
    }
    
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match.');
        return false;
    }
    
    if (!termsAccepted) {
        showErrorMessage('Please accept the Terms & Conditions.');
        return false;
    }
    
    return true;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Message display functions
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
        ${type === 'success' 
            ? 'background: linear-gradient(45deg, #4caf50, #45a049);' 
            : 'background: linear-gradient(45deg, #f44336, #d32f2f);'
        }
    `;
    
    document.body.appendChild(messageDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Social login handlers
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const provider = btn.classList.contains('google') ? 'Google' : 'GitHub';
        showSuccessMessage(`${provider} login initiated!`);
        // Here you would integrate with actual OAuth providers
        console.log(`${provider} login clicked`);
    });
});

// Add floating animation to shapes
function animateShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomDelay = Math.random() * 2;
        
        shape.style.animationDelay = `${randomDelay}s`;
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateShapes();
    
    // Add subtle parallax effect to background shapes
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});

// Add input focus effects
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Add button click effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});