// QuantumNeon Auth - Advanced JavaScript Implementation
class QuantumAuth {
    constructor() {
        this.init();
        this.setupParticles();
        this.setupNeuralNetwork();
        this.setupAudioVisualization();
        this.setupFormValidation();
        this.setupPasswordStrength();
        this.setupSuccessAnimation();
    }

    init() {
        // Mode toggle functionality
        this.setupModeToggle();
        // Password toggle functionality
        this.setupPasswordToggles();
        // Form submissions
        this.setupFormSubmissions();
        // Real-time validation
        this.setupRealTimeValidation();
    }

    setupModeToggle() {
        const loginBtn = document.querySelector('[data-mode="login"]');
        const signupBtn = document.querySelector('[data-mode="signup"]');
        const loginForm = document.querySelector('.login-form');
        const signupForm = document.querySelector('.signup-form');
        const modeToggle = document.querySelector('.mode-toggle');

        loginBtn.addEventListener('click', () => {
            this.switchMode('login', loginBtn, signupBtn, loginForm, signupForm, modeToggle);
        });

        signupBtn.addEventListener('click', () => {
            this.switchMode('signup', signupBtn, loginBtn, signupForm, loginForm, modeToggle);
        });
    }

    switchMode(mode, activeBtn, inactiveBtn, activeForm, inactiveForm, toggle) {
        // Update buttons
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
        
        // Update toggle position
        toggle.setAttribute('data-active', mode);
        
        // Switch forms with animation
        inactiveForm.classList.remove('active');
        setTimeout(() => {
            activeForm.classList.add('active');
        }, 150);
        
        // Add particle burst effect
        this.createParticleBurst(activeBtn);
    }

    setupPasswordToggles() {
        const toggles = document.querySelectorAll('.password-toggle');
        
        toggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const input = toggle.parentElement.querySelector('input');
                const eyeIcon = toggle.querySelector('.eye-icon');
                
                if (input.type === 'password') {
                    input.type = 'text';
                    eyeIcon.textContent = '🙈';
                } else {
                    input.type = 'password';
                    eyeIcon.textContent = '👁️';
                }
                
                // Add glow effect
                toggle.style.boxShadow = '0 0 10px var(--quantum-primary)';
                setTimeout(() => {
                    toggle.style.boxShadow = 'none';
                }, 300);
            });
        });
    }

    setupFormSubmissions() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(new FormData(loginForm));
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignup(new FormData(signupForm));
        });
    }

    async handleLogin(formData) {
        const email = formData.get('email');
        const password = formData.get('password');
        
        if (!this.validateEmail(email) || !password) {
            this.showError('Please fill in all fields correctly');
            return;
        }
        
        // Simulate API call
        await this.simulateLoading();
        this.showSuccess('Welcome back! Redirecting to your dashboard...');
    }

    async handleSignup(formData) {
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (!firstName || !lastName || !this.validateEmail(email) || 
            !this.validatePassword(password) || password !== confirmPassword) {
            this.showError('Please fill in all fields correctly');
            return;
        }
        
        // Simulate API call
        await this.simulateLoading();
        this.showSuccess('Account created successfully! Welcome to QuantumNeon!');
    }

    setupRealTimeValidation() {
        const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const validationIcon = input.parentElement.querySelector('.validation-icon');
        let isValid = false;
        
        switch (input.type) {
            case 'email':
                isValid = this.validateEmail(input.value);
                break;
            case 'password':
                isValid = this.validatePassword(input.value);
                if (input.id === 'signupPassword') {
                    this.updatePasswordStrength(input.value);
                }
                break;
            case 'text':
                isValid = input.value.trim().length >= 2;
                break;
        }
        
        if (input.value && validationIcon) {
            validationIcon.className = `validation-icon ${isValid ? 'valid' : 'invalid'}`;
        } else if (validationIcon) {
            validationIcon.className = 'validation-icon';
        }
        
        // Check confirm password
        if (input.id === 'confirmPassword') {
            const password = document.getElementById('signupPassword').value;
            const isMatch = input.value === password && input.value.length > 0;
            if (validationIcon) {
                validationIcon.className = `validation-icon ${isMatch ? 'valid' : 'invalid'}`;
            }
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 8 && 
               /[A-Z]/.test(password) && 
               /[a-z]/.test(password) && 
               /\d/.test(password);
    }

    setupPasswordStrength() {
        const passwordInput = document.getElementById('signupPassword');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                this.updatePasswordStrength(passwordInput.value);
            });
        }
    }

    updatePasswordStrength(password) {
        const strengthFill = document.querySelector('.strength-fill');
        const strengthText = document.querySelector('.strength-text');
        
        if (!strengthFill || !strengthText) return;
        
        let strength = 0;
        let feedback = '';
        
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/\d/.test(password)) strength += 25;
        
        strengthFill.style.width = `${strength}%`;
        
        if (strength === 0) {
            feedback = 'Enter a password';
        } else if (strength <= 25) {
            feedback = 'Weak password';
            strengthFill.style.background = '#ff4444';
        } else if (strength <= 50) {
            feedback = 'Fair password';
            strengthFill.style.background = '#ffaa00';
        } else if (strength <= 75) {
            feedback = 'Good password';
            strengthFill.style.background = '#88dd00';
        } else {
            feedback = 'Strong password';
            strengthFill.style.background = '#00dd00';
        }
        
        strengthText.textContent = feedback;
    }

    setupParticles() {
        const container = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(container);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 3 + 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        
        container.appendChild(particle);
        
        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
                this.createParticle(container);
            }
        }, (duration + 2) * 1000);
    }

    createParticleBurst(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--quantum-primary)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 10;
            const velocity = 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => {
                particle.remove();
            });
        }
    }

    setupNeuralNetwork() {
        const canvas = document.getElementById('neural-network');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const nodes = [];
        const nodeCount = 100;
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                
                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
                ctx.fill();
            });
            
            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupAudioVisualization() {
        const canvas = document.getElementById('audio-viz');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const bars = 64;
        const barData = new Array(bars).fill(0);
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Simulate audio data
            for (let i = 0; i < bars; i++) {
                barData[i] = Math.random() * 0.8 + 0.1;
            }
            
            const barWidth = canvas.width / bars;
            
            for (let i = 0; i < bars; i++) {
                const barHeight = barData[i] * canvas.height * 0.3;
                const x = i * barWidth;
                const y = canvas.height - barHeight;
                
                const hue = (i / bars) * 360;
                ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.3)`;
                ctx.fillRect(x, y, barWidth - 2, barHeight);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        
        // Resize handler
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    setupSuccessAnimation() {
        // Success animation is triggered by showSuccess method
    }

    async simulateLoading() {
        const button = document.querySelector('.quantum-btn[type="submit"]');
        const originalText = button.querySelector('.btn-text').textContent;
        
        button.disabled = true;
        button.querySelector('.btn-text').textContent = 'Processing...';
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        button.disabled = false;
        button.querySelector('.btn-text').textContent = originalText;
    }

    showSuccess(message) {
        const overlay = document.getElementById('successOverlay');
        const messageElement = overlay.querySelector('.success-message');
        
        messageElement.textContent = message;
        overlay.classList.add('active');
        
        // Hide after 3 seconds
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 3000);
    }

    showError(message) {
        // Create temporary error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff4444, #cc0000);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 68, 68, 0.3);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Social authentication handlers
function handleSocialAuth(provider) {
    console.log(`Authenticating with ${provider}...`);
    // Add your social auth integration here
    
    // Simulate social auth
    setTimeout(() => {
        const auth = new QuantumAuth();
        auth.showSuccess(`Successfully authenticated with ${provider}!`);
    }, 1000);
}

// Add social button event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize QuantumAuth
    new QuantumAuth();
    
    // Social buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const provider = btn.querySelector('.social-text').textContent;
            handleSocialAuth(provider);
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Enhanced tab navigation with glow effects
            setTimeout(() => {
                const focused = document.activeElement;
                if (focused && focused.matches('input, button')) {
                    focused.style.boxShadow = '0 0 20px var(--quantum-primary)';
                    setTimeout(() => {
                        focused.style.boxShadow = '';
                    }, 2000);
                }
            }, 10);
        }
    });
});

// CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);