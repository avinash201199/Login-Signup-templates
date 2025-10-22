document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('loginToggle');
    const signupToggle = document.getElementById('signupToggle');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    // Toggle between login and signup forms
    loginToggle.addEventListener('click', function() {
        showLogin();
    });

    signupToggle.addEventListener('click', function() {
        showSignup();
    });

    function showLogin() {
        loginToggle.classList.add('active');
        signupToggle.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function showSignup() {
        signupToggle.classList.add('active');
        loginToggle.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    // Form submission handlers
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (email && password) {
            showMessage('Login successful!', 'success');
        } else {
            showMessage('Please fill in all fields', 'error');
        }
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const password = inputs[2].value;
        const confirmPassword = inputs[3].value;
        
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                showMessage('Account created successfully!', 'success');
            } else {
                showMessage('Passwords do not match', 'error');
            }
        } else {
            showMessage('Please fill in all fields', 'error');
        }
    });

    // Social login handlers
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const provider = this.textContent;
            showMessage(`${provider} login clicked`, 'info');
        });
    });

    // Message display function
    function showMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            ${type === 'success' ? 'background: #27ae60;' : 
              type === 'error' ? 'background: #e74c3c;' : 
              'background: #3498db;'}
        `;

        document.body.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 3000);
    }

    // Add slide animations for messages
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add floating animation to background shapes
    const shapes = document.querySelectorAll('.floating-shape');
    shapes.forEach((shape, index) => {
        shape.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        shape.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});