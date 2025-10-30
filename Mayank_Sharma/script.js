// Login Form 2 - Neon Minimalist Style JavaScript
// This file extends form-utils.js with form-specific functionality

class LoginForm2 {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.submitBtn = this.form.querySelector('.login-btn');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.passwordInput = document.getElementById('password');
        this.successMessage = document.getElementById('successMessage');
        this.isSubmitting = false;
        
        this.validators = {
            email: FormUtils.validateEmail,
            password: FormUtils.validatePassword
        };
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.setupFloatingLabels();
        this.addInputAnimations();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.addBackgroundEffects();
        FormUtils.addSharedAnimations();
    }
    
    addEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        Object.keys(this.validators).forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (field) {
                field.addEventListener('blur', () => this.validateField(fieldName));
                field.addEventListener('input', () => this.clearError(fieldName));
            }
        });
        
        // Enhanced focus effects
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => this.handleFocus(e));
            input.addEventListener('blur', (e) => this.handleBlur(e));
        });
        
        // Remember me checkbox animation
        const checkbox = document.getElementById('remember');
        if (checkbox) {
            checkbox.addEventListener('change', () => this.animateCheckbox());
        }
        
        // Forgot password link
        const forgotLink = document.querySelector('.forgot-password');
        if (forgotLink) {
            forgotLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        }
        
        // Sign up link
        const signupLink = document.querySelector('.signup-link a');
        if (signupLink) {
            signupLink.addEventListener('click', (e) => this.handleSignupLink(e));
        }
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    setupFloatingLabels() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach(input => {
            // Check if field has value on page load
            if (input.value.trim() !== '') {
                input.classList.add('has-value');
            }
            
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });
    }
    
    addInputAnimations() {
        const inputs = this.form.querySelectorAll('input');
        inputs.forEach((input, index) => {
            // Stagger animation on page load
            input.style.opacity = '0';
            input.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                input.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                input.style.opacity = '1';
                input.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    setupPasswordToggle() {
        if (this.passwordToggle && this.passwordInput) {
            this.passwordToggle.addEventListener('click', () => {
                const isPassword = this.passwordInput.type === 'password';
                const toggleIcon = this.passwordToggle.querySelector('.toggle-icon');
                
                this.passwordInput.type = isPassword ? 'text' : 'password';
                toggleIcon.classList.toggle('show-password', isPassword);
                
                // Add neon pulse effect
                this.passwordToggle.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
                setTimeout(() => {
                    this.passwordToggle.style.boxShadow = '';
                }, 300);
                
                // Keep focus on password input
                this.passwordInput.focus();
            });
        }
    }
    
    setupSocialButtons() {
        const socialButtons = document.querySelectorAll('.social-btn');
        socialButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
            
            // Add hover glow effect
            btn.addEventListener('mouseenter', () => {
                btn.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.2)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.boxShadow = '';
            });
        });
    }
    
    addBackgroundEffects() {
        // Add mouse move parallax effect to glow orbs
        document.addEventListener('mousemove', (e) => {
            const orbs = document.querySelectorAll('.glow-orb');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                const moveX = (x - 0.5) * speed * 20;
                const moveY = (y - 0.5) * speed * 20;
                orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    handleFocus(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (wrapper) {
            wrapper.classList.add('focused');
            // Add subtle glow effect
            const input = wrapper.querySelector('input');
            input.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.1)';
        }
    }
    
    handleBlur(e) {
        const wrapper = e.target.closest('.input-wrapper');
        if (wrapper) {
            wrapper.classList.remove('focused');
            // Remove glow effect
            const input = wrapper.querySelector('input');
            input.style.boxShadow = '';
        }
    }
    
    animateCheckbox() {
        const checkbox = document.querySelector('.custom-checkbox');
        if (checkbox) {
            checkbox.style.transform = 'scale(0.8)';
            checkbox.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
            setTimeout(() => {
                checkbox.style.transform = 'scale(1)';
                setTimeout(() => {
                    checkbox.style.boxShadow = '';
                }, 200);
            }, 150);
        }
    }
    
    handleForgotPassword(e) {
        e.preventDefault();
        // Add neon pulse effect
        const link = e.target;
        link.style.textShadow = '0 0 10px rgba(0, 255, 136, 0.8)';
        link.style.transform = 'scale(0.98)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
            setTimeout(() => {
                link.style.textShadow = '';
            }, 200);
        }, 150);
        
        FormUtils.showNotification('Password reset link would be sent to your email', 'info', this.form);
    }
    
    handleSignupLink(e) {
        e.preventDefault();
        // Add neon pulse effect
        const link = e.target;
        link.style.textShadow = '0 0 10px rgba(0, 153, 255, 0.8)';
        link.style.transform = 'scale(0.98)';
        setTimeout(() => {
            link.style.transform = 'scale(1)';
            setTimeout(() => {
                link.style.textShadow = '';
            }, 200);
        }, 150);
        
        FormUtils.showNotification('Redirecting to sign up page...', 'info', this.form);
    }
    
    handleSocialLogin(e) {
        const btn = e.currentTarget;
        const isGoogle = btn.classList.contains('google-btn');
        const provider = isGoogle ? 'Google' : 'Apple';
        
        // Add loading state with neon effect
        btn.style.transform = 'scale(0.98)';
        btn.style.boxShadow = '0 0 25px rgba(0, 255, 136, 0.4)';
        btn.style.borderColor = 'var(--neon-primary)';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            setTimeout(() => {
                btn.style.boxShadow = '';
                btn.style.borderColor = '';
            }, 300);
        }, 200);
        
        FormUtils.showNotification(`Connecting to ${provider}...`, 'info', this.form);
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        const isValid = this.validateForm();
        
        if (isValid) {
            await this.submitForm();
        } else {
            this.shakeForm();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        Object.keys(this.validators).forEach(fieldName => {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(fieldName) {
        const field = document.getElementById(fieldName);
        const validator = this.validators[fieldName];
        
        if (!field || !validator) return true;
        
        const result = validator(field.value.trim(), field);
        
        if (result.isValid) {
            this.clearError(fieldName);
            this.showSuccess(fieldName);
        } else {
            this.showError(fieldName, result.message);
        }
        
        return result.isValid;
    }
    
    showError(fieldName, message) {
        const formGroup = document.getElementById(fieldName).closest('.form-group');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        formGroup.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Add shake animation with neon effect
        const field = document.getElementById(fieldName);
        field.style.animation = 'shake 0.5s ease-in-out';
        field.style.boxShadow = '0 0 15px rgba(255, 0, 128, 0.5)';
        setTimeout(() => {
            field.style.animation = '';
            field.style.boxShadow = '';
        }, 500);
    }
    
    clearError(fieldName) {
        const formGroup = document.getElementById(fieldName).closest('.form-group');
        const errorElement = document.getElementById(fieldName + 'Error');
        
        formGroup.classList.remove('error');
        errorElement.classList.remove('show');
        setTimeout(() => {
            errorElement.textContent = '';
        }, 300);
    }
    
    showSuccess(fieldName) {
        const field = document.getElementById(fieldName);
        const wrapper = field.closest('.input-wrapper');
        
        // Add subtle success indication with neon glow
        wrapper.style.borderColor = 'var(--neon-primary)';
        field.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.3)';
        setTimeout(() => {
            wrapper.style.borderColor = '';
            field.style.boxShadow = '';
        }, 2000);
    }
    
    shakeForm() {
        const card = document.querySelector('.login-card');
        card.style.animation = 'shake 0.5s ease-in-out';
        card.style.boxShadow = '0 0 30px rgba(255, 0, 128, 0.3)';
        setTimeout(() => {
            card.style.animation = '';
            card.style.boxShadow = '';
        }, 500);
    }
    
    async submitForm() {
        this.isSubmitting = true;
        this.submitBtn.classList.add('loading');
        
        // Add neon loading effect
        this.submitBtn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.6)';
        
        try {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Use shared login simulation
            await FormUtils.simulateLogin(email, password);
            
            // Show success state
            this.showSuccessMessage();
            
        } catch (error) {
            console.error('Login error:', error);
            this.showLoginError(error.message);
        } finally {
            this.isSubmitting = false;
            this.submitBtn.classList.remove('loading');
            this.submitBtn.style.boxShadow = '';
        }
    }
    
    showSuccessMessage() {
        // Hide form with smooth animation and neon effects
        this.form.style.opacity = '0';
        this.form.style.transform = 'translateY(-20px) scale(0.95)';
        
        // Hide social login and other elements
        const elementsToHide = ['.divider', '.social-login', '.signup-link'];
        elementsToHide.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(-20px) scale(0.95)';
            }
        });
        
        // Add success glow to card
        const card = document.querySelector('.login-card');
        card.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.4)';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            elementsToHide.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) element.style.display = 'none';
            });
            
            this.successMessage.classList.add('show');
            
            // Simulate redirect after success
            setTimeout(() => {
                this.simulateRedirect();
            }, 3000);
        }, 300);
    }
    
    simulateRedirect() {
        // For demo, reset the form after 2 seconds
        setTimeout(() => {
            this.resetForm();
        }, 2000);
    }
    
    showLoginError(message) {
        FormUtils.showNotification(message || 'Login failed. Please try again.', 'error', this.form);
        
        // Shake the entire card with neon error effect
        const card = document.querySelector('.login-card');
        card.style.animation = 'shake 0.5s ease-in-out';
        card.style.boxShadow = '0 0 40px rgba(255, 0, 128, 0.5)';
        setTimeout(() => {
            card.style.animation = '';
            card.style.boxShadow = '';
        }, 500);
    }
    
    resetForm() {
        this.successMessage.classList.remove('show');
        
        setTimeout(() => {
            // Show form elements again
            const elementsToShow = ['.divider', '.social-login', '.signup-link'];
            this.form.style.display = 'block';
            elementsToShow.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.display = 'block';
                }
            });
            
            this.form.reset();
            
            // Clear all validation states
            Object.keys(this.validators).forEach(fieldName => {
                this.clearError(fieldName);
            });
            
            // Reset form appearance
            this.form.style.opacity = '1';
            this.form.style.transform = 'translateY(0) scale(1)';
            
            // Reset other elements
            elementsToShow.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0) scale(1)';
                }
            });
            
            // Reset card glow
            const card = document.querySelector('.login-card');
            card.style.boxShadow = '';
            
            // Reset floating labels
            const inputs = this.form.querySelectorAll('input');
            inputs.forEach(input => {
                input.classList.remove('has-value');
            });
            
            // Reset password visibility
            if (this.passwordInput) {
                this.passwordInput.type = 'password';
                const toggleIcon = this.passwordToggle?.querySelector('.toggle-icon');
                if (toggleIcon) {
                    toggleIcon.classList.remove('show-password');
                }
            }
        }, 300);
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Enter key submits form if focus is on form elements
            if (e.key === 'Enter' && e.target.closest('#loginForm')) {
                e.preventDefault();
                this.handleSubmit(e);
            }
            
            // Escape key clears errors
            if (e.key === 'Escape') {
                Object.keys(this.validators).forEach(fieldName => {
                    this.clearError(fieldName);
                });
            }
        });
    }
    
    // Public methods
    validate() {
        return this.validateForm();
    }
    
    getFormData() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        return data;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation to login card with neon effect
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
        loginCard.style.opacity = '0';
        loginCard.style.transform = 'translateY(30px) scale(0.9)';
        
        setTimeout(() => {
            loginCard.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            loginCard.style.opacity = '1';
            loginCard.style.transform = 'translateY(0) scale(1)';
        }, 200);
    }
    
    // Initialize the login form
    new LoginForm2();
});

// Handle page visibility changes for better UX
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Re-focus on email field if user returns to page
        const activeElement = document.activeElement;
        if (activeElement && activeElement.tagName !== 'INPUT') {
            const emailInput = document.querySelector('#email');
            if (emailInput && !emailInput.value) {
                setTimeout(() => emailInput.focus(), 100);
            }
        }
    }
});