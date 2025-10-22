class AuthManager {
    constructor() {
        this.currentForm = 'login';
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupFormValidation();
    }

    bindEvents() {
        // Toggle form events
        document.querySelectorAll('.toggle-form').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.dataset.target;
                this.switchForm(target);
            });
        });

        // Form submission events
        document.getElementById('loginFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('signupFormElement').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup();
        });

        // Forgot password event
        document.querySelector('.forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
    }

    switchForm(target) {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        if (target === 'signup' && this.currentForm === 'login') {
            loginForm.classList.remove('active');
            setTimeout(() => {
                signupForm.classList.add('active');
            }, 250);
            this.currentForm = 'signup';
        } else if (target === 'login' && this.currentForm === 'signup') {
            signupForm.classList.remove('active');
            setTimeout(() => {
                loginForm.classList.add('active');
            }, 250);
            this.currentForm = 'login';
        }
    }

    setupFormValidation() {
        // Real-time validation for all inputs
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldId = field.id;

        // Remove existing error styling
        this.clearFieldError(field);

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        // Password validation
        else if (fieldType === 'password' && (fieldId.includes('Password') || fieldId.includes('password'))) {
            if (value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters long';
            }
        }
        // Confirm password validation
        else if (fieldId === 'confirmPassword') {
            const password = document.getElementById('signupPassword').value;
            if (value !== password) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderBottomColor = '#ef4444';
        
        // Create error message if it doesn't exist
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 5px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        setTimeout(() => {
            errorElement.style.opacity = '1';
        }, 10);
    }

    clearFieldError(field) {
        field.style.borderBottomColor = '';
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.opacity = '0';
            setTimeout(() => {
                errorElement.remove();
            }, 300);
        }
    }

    validateForm(formElement) {
        const inputs = formElement.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        // Additional validation for signup form
        if (formElement.id === 'signupFormElement') {
            const agreeTerms = document.getElementById('agreeTerms');
            if (!agreeTerms.checked) {
                isValid = false;
                this.showToast('Please agree to the Terms & Conditions', 'error');
            }
        }

        return isValid;
    }

    handleLogin() {
        const form = document.getElementById('loginFormElement');
        
        if (!this.validateForm(form)) {
            return;
        }

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Simulate login process
        this.showLoadingState(form);

        setTimeout(() => {
            this.hideLoadingState(form);
            this.showToast('Login successful! Welcome back.', 'success');
            
            // Here you would typically make an API call
            console.log('Login attempt:', { email, password, rememberMe });
        }, 1500);
    }

    handleSignup() {
        const form = document.getElementById('signupFormElement');
        
        if (!this.validateForm(form)) {
            return;
        }

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Simulate signup process
        this.showLoadingState(form);

        setTimeout(() => {
            this.hideLoadingState(form);
            this.showToast('Account created successfully! Welcome aboard.', 'success');
            
            // Here you would typically make an API call
            console.log('Signup attempt:', { name, email, password });
        }, 2000);
    }

    handleForgotPassword() {
        const email = document.getElementById('loginEmail').value;
        
        if (!email) {
            this.showToast('Please enter your email address first', 'error');
            document.getElementById('loginEmail').focus();
            return;
        }

        if (!this.validateField(document.getElementById('loginEmail'))) {
            return;
        }

        this.showToast('Password reset link sent to your email', 'success');
        console.log('Password reset requested for:', email);
    }

    showLoadingState(form) {
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Processing...';
        submitBtn.style.opacity = '0.7';
        
        // Store original text for restoration
        submitBtn.dataset.originalText = originalText;
    }

    hideLoadingState(form) {
        const submitBtn = form.querySelector('.submit-btn');
        
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = submitBtn.dataset.originalText;
        submitBtn.style.opacity = '1';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');
        
        // Set message and icon based on type
        toastMessage.textContent = message;
        
        if (type === 'success') {
            toastIcon.textContent = '✓';
            toastIcon.style.background = 'linear-gradient(45deg, #10B981, #059669)';
        } else if (type === 'error') {
            toastIcon.textContent = '✕';
            toastIcon.style.background = 'linear-gradient(45deg, #ef4444, #dc2626)';
        }
        
        // Show toast
        toast.classList.add('show');
        
        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// Enhanced animations and interactions
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallaxEffect();
        this.setupHoverEffects();
        this.setupBackgroundAnimation();
    }

    setupParallaxEffect() {
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
    }

    setupHoverEffects() {
        // Enhanced button hover effects
        document.querySelectorAll('.submit-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Input focus effects
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentNode.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', () => {
                input.parentNode.style.transform = 'scale(1)';
            });
        });
    }

    setupBackgroundAnimation() {
        // Subtle gradient animation
        let hue = 0;
        setInterval(() => {
            hue = (hue + 0.5) % 360;
            document.body.style.background = `linear-gradient(135deg, 
                hsl(${hue}, 70%, 60%) 0%, 
                hsl(${(hue + 60) % 360}, 70%, 50%) 100%)`;
        }, 100);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new AuthManager();
    new AnimationManager();
    
    // Add some entrance animations
    setTimeout(() => {
        document.querySelector('.visual-content').style.opacity = '1';
        document.querySelector('.visual-content').style.transform = 'translateY(0)';
    }, 500);
});

// Add initial styles for entrance animation
document.addEventListener('DOMContentLoaded', () => {
    const visualContent = document.querySelector('.visual-content');
    visualContent.style.opacity = '0';
    visualContent.style.transform = 'translateY(30px)';
    visualContent.style.transition = 'all 0.8s ease';
});
