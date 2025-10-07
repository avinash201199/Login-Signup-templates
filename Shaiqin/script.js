// Enhanced Form Animation Controller
class FormController {
    constructor() {
        this.container = document.querySelector('.container');
        this.loginLink = document.querySelector('.SignInLink');
        this.registerLink = document.querySelector('.SignUpLink');
        this.inputs = document.querySelectorAll('input');
        this.buttons = document.querySelectorAll('.btn');
        
        this.init();
    }

    init() {
        // Form transition event listeners
        this.registerLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToRegister();
        });

        this.loginLink?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchToLogin();
        });

        // Enhanced input interactions
        this.inputs.forEach(input => {
            input.addEventListener('focus', this.handleInputFocus.bind(this));
            input.addEventListener('blur', this.handleInputBlur.bind(this));
            input.addEventListener('input', this.handleInputChange.bind(this));
        });

        // Button interactions
        this.buttons.forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
            button.addEventListener('click', this.handleButtonClick.bind(this));
        });

        // Container floating animation removed for static positioning
    }

    switchToRegister() {
        this.container.classList.add('active');
        this.addRippleEffect();
        
        // Trigger 3D background transition if available
        if (window.threeBackground) {
            window.threeBackground.transitionBackground();
        }
    }

    switchToLogin() {
        this.container.classList.remove('active');
        this.addRippleEffect();
        
        // Reset 3D background if available
        if (window.threeBackground) {
            window.threeBackground.resetBackground();
        }
    }

    handleInputFocus(event) {
        const inputBox = event.target.closest('.input-box');
        inputBox.classList.add('focused');
        
        // Add pulsing animation
        inputBox.style.animation = 'inputPulse 0.3s ease';
        setTimeout(() => {
            inputBox.style.animation = '';
        }, 300);
    }

    handleInputBlur(event) {
        const inputBox = event.target.closest('.input-box');
        inputBox.classList.remove('focused');
    }

    handleInputChange(event) {
        const input = event.target;
        const label = input.nextElementSibling;
        
        if (input.value.length > 0) {
            label.style.color = '#2196F3';
            label.style.transform = 'translateY(-25px) scale(0.8)';
        } else {
            label.style.color = '#fff';
            label.style.transform = 'translateY(-50%)';
        }
    }

    handleButtonHover(event) {
        const button = event.target;
        button.style.transform = 'translateY(-2px) scale(1.05)';
        button.style.boxShadow = '0 0 30px rgba(33, 150, 243, 0.6), 0 10px 20px rgba(0, 0, 0, 0.3)';
    }

    handleButtonLeave(event) {
        const button = event.target;
        button.style.transform = '';
        button.style.boxShadow = '0 0 20px rgba(33, 150, 243, 0.3)';
    }

    handleButtonClick(event) {
        event.preventDefault();
        const button = event.target;
        
        // Create click ripple effect
        this.createClickRipple(button, event);
        
        // Simulate form submission with animation
        button.style.transform = 'scale(0.95)';
        button.innerHTML = '<div class="loading-spinner"></div> Processing...';
        
        setTimeout(() => {
            button.style.transform = '';
            button.innerHTML = button.classList.contains('login-btn') ? 'Login' : 'Register';
            this.showSuccessMessage();
        }, 2000);
    }

    createClickRipple(button, event) {
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    addRippleEffect() {
        // Add transition ripple effect to container
        const ripple = document.createElement('div');
        ripple.className = 'transition-ripple';
        this.container.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1500);
    }


    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = '✓ Success! Welcome aboard!';
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 3000);
    }
}

// Initialize form controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormController();
});
