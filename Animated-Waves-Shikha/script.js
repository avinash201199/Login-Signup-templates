// Show login form
function showLogin() {
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('signupForm').classList.remove('active');
    document.getElementById('loginToggle').classList.add('active');
    document.getElementById('signupToggle').classList.remove('active');
}

// Show signup form
function showSignup() {
    document.getElementById('signupForm').classList.add('active');
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupToggle').classList.add('active');
    document.getElementById('loginToggle').classList.remove('active');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
}

// Show on load
document.addEventListener('DOMContentLoaded', () => {
    showLogin();
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (validateEmail(email)) {
        showNotification('🎉 Login successful! Welcome back.', 'success');
        console.log('Login:', { email, password });
    } else {
        showNotification('❌ Please enter a valid email.', 'error');
    }
});

// Signup form submission
document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!validateEmail(email)) {
        showNotification('❌ Please enter a valid email.', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('❌ Password must be at least 6 characters.', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('❌ Passwords do not match.', 'error');
        return;
    }
    
    showNotification('🎉 Account created successfully!', 'success');
    console.log('Signup:', { name, email, password });
    
    setTimeout(() => {
        showLogin();
        document.getElementById('signupForm').reset();
    }, 1500);
});

// Email validation
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)'};
        color: white;
        border-radius: 15px;
        font-weight: 500;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add interactive particle effects on form focus
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', createSparkle);
});

function createSparkle(e) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background: #6B73FF;
        border-radius: 50%;
        pointer-events: none;
        animation: sparkleAnim 1s ease-out forwards;
    `;
    
    const rect = e.target.getBoundingClientRect();
    sparkle.style.left = rect.right + 'px';
    sparkle.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-30px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);
