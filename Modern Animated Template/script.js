// Modern Login/Signup Template JavaScript

// Global variables
let isLoginMode = true;
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const successAnimation = document.getElementById('successAnimation');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add event listeners for forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    
    // Add input focus animations
    addInputAnimations();
    
    // Add social button functionality
    addSocialButtonListeners();
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Initialize password strength indicator for signup
    initializePasswordStrength();
    
    console.log('🎉 Modern Login/Signup Template initialized successfully!');
}

// Switch between login and signup forms
function switchToSignup() {
    if (isLoginMode) {
        loginContainer.classList.add('hide');
        setTimeout(() => {
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
            signupContainer.classList.add('show');
            isLoginMode = false;
        }, 250);
    }
}

function switchToLogin() {
    if (!isLoginMode) {
        signupContainer.classList.add('hide');
        setTimeout(() => {
            signupContainer.style.display = 'none';
            loginContainer.style.display = 'block';
            loginContainer.classList.add('show');
            isLoginMode = true;
        }, 250);
    }
}

// Handle login form submission
async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate form
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoading(submitBtn);
    
    try {
        // Simulate API call
        await simulateLogin(email, password, rememberMe);
        
        // Hide loading state
        hideLoading(submitBtn);
        
        // Show success animation
        showSuccess('Welcome back! You have been successfully logged in.');
        
        // Store user data if remember me is checked
        if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
        }
        
        console.log('✅ Login successful:', { email, rememberMe });
        
    } catch (error) {
        hideLoading(submitBtn);
        showError(error.message || 'Login failed. Please try again.');
        console.error('❌ Login error:', error);
    }
}

// Handle signup form submission
async function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validate form
    if (!firstName.trim() || !lastName.trim()) {
        showError('Please enter your first and last name');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }
    
    if (password.length < 8) {
        showError('Password must be at least 8 characters long');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!agreeTerms) {
        showError('Please agree to the Terms & Conditions');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoading(submitBtn);
    
    try {
        // Simulate API call
        await simulateSignup(firstName, lastName, email, password);
        
        // Hide loading state
        hideLoading(submitBtn);
        
        // Show success animation
        showSuccess('Account created successfully! Welcome to our platform.');
        
        console.log('✅ Signup successful:', { firstName, lastName, email });
        
    } catch (error) {
        hideLoading(submitBtn);
        showError(error.message || 'Signup failed. Please try again.');
        console.error('❌ Signup error:', error);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
    
    // Add a small bounce animation
    icon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        icon.style.transform = 'scale(1)';
    }, 150);
}

// Email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        padding: 12px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(239, 68, 68, 0.3);
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }
    }, 5000);
    
    // Add click to dismiss
    errorDiv.addEventListener('click', () => {
        errorDiv.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => errorDiv.remove(), 300);
    });
}

// Show success message and animation
function showSuccess(message) {
    const successContent = successAnimation.querySelector('.success-content p');
    successContent.textContent = message;
    
    successAnimation.style.display = 'flex';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        successAnimation.style.display = 'none';
    }, 3000);
    
    // Click to dismiss
    successAnimation.addEventListener('click', () => {
        successAnimation.style.display = 'none';
    });
}

// Show loading state on button
function showLoading(button) {
    button.classList.add('loading');
    button.disabled = true;
    const originalText = button.querySelector('span').textContent;
    button.querySelector('span').textContent = 'Please wait...';
    button.dataset.originalText = originalText;
}

// Hide loading state on button
function hideLoading(button) {
    button.classList.remove('loading');
    button.disabled = false;
    button.querySelector('span').textContent = button.dataset.originalText;
}

// Simulate login API call
function simulateLogin(email, password, rememberMe) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses
            if (email === 'demo@example.com' && password === 'password') {
                resolve({ success: true, user: { email, name: 'Demo User' } });
            } else if (email === 'error@example.com') {
                reject(new Error('Invalid credentials'));
            } else {
                resolve({ success: true, user: { email, name: 'User' } });
            }
        }, 2000);
    });
}

// Simulate signup API call
function simulateSignup(firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different responses
            if (email === 'existing@example.com') {
                reject(new Error('Email already exists'));
            } else if (email === 'error@example.com') {
                reject(new Error('Server error. Please try again.'));
            } else {
                resolve({ success: true, user: { firstName, lastName, email } });
            }
        }, 2500);
    });
}

// Add input animations and effects
function addInputAnimations() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        // Add focus and blur animations
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            const wrapper = this.parentElement;
            wrapper.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
            
            setTimeout(() => {
                wrapper.style.boxShadow = 'none';
            }, 200);
        });
    });
    
    // Pre-fill remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        document.getElementById('loginEmail').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// Add social button functionality
function addSocialButtonListeners() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show loading
            showLoading(this);
            
            // Simulate social login
            setTimeout(() => {
                hideLoading(this);
                showSuccess(`Successfully connected with ${provider}!`);
                console.log(`🔗 ${provider} authentication initiated`);
            }, 2000);
        });
    });
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
            const activeForm = isLoginMode ? 'loginForm' : 'signupForm';
            const form = document.getElementById(activeForm);
            const submitBtn = form.querySelector('.submit-btn');
            if (submitBtn && !submitBtn.disabled) {
                submitBtn.click();
            }
        }
        
        // Escape key to close success animation
        if (e.key === 'Escape') {
            successAnimation.style.display = 'none';
            
            // Also close any error messages
            const errorMessage = document.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
        
        // Tab key enhancement for better UX
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.tagName === 'INPUT') {
                focusedElement.parentElement.style.borderColor = '#6366f1';
            }
        }
    });
}

// Initialize password strength indicator
function initializePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrengthUI(strength);
        });
    }
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    return {
        score: score,
        level: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
}

// Update password strength UI
function updatePasswordStrengthUI(strength) {
    // Remove existing strength indicator
    const existing = document.querySelector('.password-strength');
    if (existing) existing.remove();
    
    if (strength.score === 0) return;
    
    const passwordGroup = document.getElementById('signupPassword').closest('.input-group');
    const strengthDiv = document.createElement('div');
    strengthDiv.className = 'password-strength';
    
    const colors = {
        weak: '#ef4444',
        medium: '#f59e0b',
        strong: '#10b981'
    };
    
    strengthDiv.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill" style="width: ${(strength.score / 5) * 100}%; background: ${colors[strength.level]}"></div>
        </div>
        <span class="strength-text" style="color: ${colors[strength.level]}">${strength.level.toUpperCase()}</span>
    `;
    
    strengthDiv.style.cssText = `
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.8rem;
        font-weight: 500;
    `;
    
    const strengthBar = strengthDiv.querySelector('.strength-bar');
    strengthBar.style.cssText = `
        flex: 1;
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        overflow: hidden;
    `;
    
    const strengthFill = strengthDiv.querySelector('.strength-fill');
    strengthFill.style.cssText += `
        height: 100%;
        transition: all 0.3s ease;
        border-radius: 2px;
    `;
    
    passwordGroup.appendChild(strengthDiv);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🎨 Modern Login/Signup Template
✨ Features: Animations, Hover Effects, Form Validation
🚀 Ready for production use!

Try these demo credentials:
Email: demo@example.com
Password: password

Or create a new account with any email!
`);

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
    });
}