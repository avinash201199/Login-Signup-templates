// Retro Login/Signup Script

document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Form toggle functionality
    loginBtn.addEventListener('click', function() {
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });

    signupBtn.addEventListener('click', function() {
        signupBtn.classList.add('active');
        loginBtn.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Form validation and submission
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorSpan = document.getElementById(input.id + '-error');
            if (!input.checkValidity()) {
                errorSpan.textContent = input.validationMessage;
                input.setAttribute('aria-invalid', 'true');
                isValid = false;
            } else {
                errorSpan.textContent = '';
                input.setAttribute('aria-invalid', 'false');
            }
        });

        return isValid;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(loginForm)) {
            alert('Login successful! (Demo)');
            // Here you would typically send data to server
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(signupForm)) {
            alert('Signup successful! (Demo)');
            // Here you would typically send data to server
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure focus stays within modal-like form
            const focusableElements = document.querySelectorAll('button, input');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });

    // Accessibility: Announce form changes
    function announceChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }

    loginBtn.addEventListener('click', () => announceChange('Login form is now active'));
    signupBtn.addEventListener('click', () => announceChange('Signup form is now active'));
});
