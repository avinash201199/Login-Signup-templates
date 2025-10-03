// Get DOM elements
const container = document.querySelector('.container');
const signUpBtn = document.getElementById('signup-btn');
const loginBtn = document.getElementById('login-btn');

// Toggle to Sign Up Mode
signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up-mode');
});

// Toggle to Login Mode
loginBtn.addEventListener('click', () => {
    container.classList.remove('sign-up-mode');
});

// Show/Hide Password Toggle Functionality
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        
        // Toggle password visibility
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
            this.classList.add('active');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
            this.classList.remove('active');
        }
    });
});

// Form Validation and Submission (Optional Enhancement)
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form type
        const isSignUp = form.closest('.signup-form') !== null;
        
        if (isSignUp) {
            // Signup form validation
            const username = form.querySelector('input[placeholder="Username"]').value;
            const email = form.querySelector('input[placeholder="Email Address"]').value;
            const password = form.querySelector('input[placeholder="Password"]').value;
            const confirmPassword = form.querySelector('input[placeholder="Confirm Password"]').value;
            const termsAccepted = form.querySelector('input[type="checkbox"]').checked;
            
            // Basic validation
            if (!username || !email || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAccepted) {
                showNotification('Please accept the terms and conditions', 'error');
                return;
            }
            
            // Success
            showNotification('Account created successfully!', 'success');
            setTimeout(() => {
                form.reset();
                container.classList.remove('sign-up-mode');
            }, 1500);
            
        } else {
            // Login form validation
            const email = form.querySelector('input[placeholder="Email Address"]').value;
            const password = form.querySelector('input[placeholder="Password"]').value;
            
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Success
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                form.reset();
            }, 1500);
        }
    });
});

// Notification System
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00b894' : '#ff7675'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
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

// Social login button handlers (for demonstration)
const socialBtns = document.querySelectorAll('.social-btn');

socialBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList.contains('google-btn') ? 'Google' : 
                        this.classList.contains('facebook-btn') ? 'Facebook' : 'GitHub';
        
        showNotification(`${platform} authentication would be implemented here`, 'success');
    });
});

// Add smooth scrolling for mobile
if (window.innerWidth <= 870) {
    const switchLinks = document.querySelectorAll('.switch-link');
    
    switchLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Password strength indicator (optional enhancement for signup)
const signupPasswordInput = document.querySelector('.signup-form .password-input');

if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // You could add a visual indicator here
        // For now, we'll just validate on submit
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    
    return strength;
}

// Console welcome message
console.log('%c🎉 Social Platform Login Template', 'color: #6c5ce7; font-size: 20px; font-weight: bold;');
console.log('%cFeatures: Show/Hide Password, Form Validation, Smooth Animations', 'color: #636e72; font-size: 12px;');
console.log('%cCreated by: Abhinav Shukla', 'color: #00b894; font-size: 12px;');
