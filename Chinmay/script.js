// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

let themeRotation = 0;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    themeRotation += 180;
    themeToggle.style.transform = `rotate(${themeRotation}deg)`;
});

// Form Switching
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const switchToLogin = document.getElementById('switchToLogin');
const switchToSignup = document.getElementById('switchToSignup');

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
});

switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
});

// Password Toggle
const passwordToggles = document.querySelectorAll('.password-toggle');

passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const input = toggle.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Toggle icon (you can add eye-slash icon if needed)
        toggle.style.opacity = type === 'text' ? '1' : '0.6';
    });
});

// Form Submissions
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;

    if (!terms) {
        showNotification('Please accept the Terms and Conditions', 'error');
        return;
    }

    showNotification('Account created successfully!', 'success');
    signupForm.reset();
});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    showNotification('Welcome back!', 'success');
    signinForm.reset();
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        font-size: 0.875rem;
        font-weight: 500;
        z-index: 2000;
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Remove notification
    setTimeout(() => {
        notification.style.transform = 'translateX(-50%) translateY(-100px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}



const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-open');
});



const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');

inputs.forEach(input => {
    input.setAttribute('placeholder', ' ');
});

// Add loading state to submit buttons
const submitButtons = document.querySelectorAll('.submit-btn');

submitButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('loading')) return;
        
        this.classList.add('loading');
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        
        setTimeout(() => {
            this.classList.remove('loading');
            this.textContent = originalText;
        }, 1500);
    });
});


