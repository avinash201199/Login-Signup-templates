// ========================================
// YASH'S 3D FLIP AUTHENTICATION PORTAL
// Ultra Advanced Features Edition
// ========================================

console.log('%c🚀 YASH\'S 3D AUTHENTICATION PORTAL', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #00f3ff, #ff00ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%c✨ Features: 3D Card Flip | Particle Network | Face ID | Fingerprint | Password Strength | Glitch Effects', 'font-size: 12px; color: #00f3ff;');

// ========================================
// PARTICLE NETWORK BACKGROUND
// ========================================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;
const connectionDistance = 150;
let mouse = { x: null, y: null };

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                this.x -= dx / distance * 2;
                this.y -= dy / distance * 2;
            }
        }

        // Boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Connect particles
function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                const opacity = (1 - distance / connectionDistance) * 0.5;
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Mouse movement tracking
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// 3D CARD FLIP FUNCTIONALITY
// ========================================
let isFlipped = false;

function flipCard(event) {
    event.preventDefault();
    const card = document.getElementById('card3d');
    isFlipped = !isFlipped;
    
    if (isFlipped) {
        card.classList.add('flipped');
    } else {
        card.classList.remove('flipped');
    }
    
    // Reset forms
    document.getElementById('loginForm').reset();
    document.getElementById('signupForm').reset();
}

// ========================================
// PASSWORD VISIBILITY TOGGLE
// ========================================
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    const iconElement = icon.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        iconElement.classList.remove('fa-eye-slash');
        iconElement.classList.add('fa-eye');
    } else {
        input.type = 'password';
        iconElement.classList.remove('fa-eye');
        iconElement.classList.add('fa-eye-slash');
    }
}

// ========================================
// PASSWORD STRENGTH METER
// ========================================
const signupPasswordInput = document.getElementById('signupPassword');
const strengthIndicator = document.getElementById('passwordStrength');

if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        
        // Remove all strength classes
        strengthIndicator.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong');
        
        if (password.length === 0) {
            strengthIndicator.querySelector('.strength-text').textContent = 'Password Strength';
            return;
        }
        
        // Add appropriate class
        if (strength.score <= 1) {
            strengthIndicator.classList.add('strength-weak');
            strengthIndicator.querySelector('.strength-text').textContent = 'Weak';
        } else if (strength.score === 2) {
            strengthIndicator.classList.add('strength-fair');
            strengthIndicator.querySelector('.strength-text').textContent = 'Fair';
        } else if (strength.score === 3) {
            strengthIndicator.classList.add('strength-good');
            strengthIndicator.querySelector('.strength-text').textContent = 'Good';
        } else {
            strengthIndicator.classList.add('strength-strong');
            strengthIndicator.querySelector('.strength-text').textContent = 'Strong';
        }
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z\d]/.test(password)) score++;
    
    return { score };
}

// ========================================
// FACE ID SCANNER ANIMATION
// ========================================
function triggerFaceID() {
    const scanner = document.getElementById('faceScanner');
    scanner.classList.add('active');
    
    showToast('Scanning face...', 'info');
    
    // Simulate face recognition
    setTimeout(() => {
        scanner.classList.remove('active');
        showToast('Face ID authentication successful! ✓', 'success');
        
        // Simulate login
        setTimeout(() => {
            showToast('Welcome back! Redirecting...', 'success');
        }, 1000);
    }, 3000);
}

// ========================================
// FINGERPRINT SCANNER ANIMATION
// ========================================
function triggerFingerprint() {
    const overlay = document.getElementById('fingerprintOverlay');
    overlay.classList.add('active');
    
    showToast('Place your finger on the sensor', 'info');
    
    // Simulate fingerprint scan
    setTimeout(() => {
        overlay.classList.remove('active');
        showToast('Fingerprint verified! ✓', 'success');
        
        // Simulate login
        setTimeout(() => {
            showToast('Access granted! Welcome back.', 'success');
        }, 1000);
    }, 3000);
}

// ========================================
// SOCIAL LOGIN
// ========================================
function socialLogin(provider) {
    const providerNames = {
        'google': 'Google',
        'github': 'GitHub',
        'microsoft': 'Microsoft'
    };
    
    showToast(`Connecting with ${providerNames[provider]}...`, 'info');
    
    // Simulate OAuth flow
    setTimeout(() => {
        showToast(`${providerNames[provider]} authentication successful!`, 'success');
    }, 2000);
}

// ========================================
// FORM SUBMISSIONS
// ========================================
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    const btn = this.querySelector('.submit-btn-3d');
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    
    showToast('Authenticating...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        showToast('Login successful! Welcome back! 🎉', 'success');
        
        // Simulate redirect
        setTimeout(() => {
            console.log('Redirecting to dashboard...');
        }, 1500);
    }, 2000);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (password.length < 8) {
        showToast('Password must be at least 8 characters', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    // Show loading
    const btn = this.querySelector('.submit-btn-3d');
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    
    showToast('Creating your account...', 'info');
    
    // Simulate API call
    setTimeout(() => {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        showToast('Account created successfully! 🎉', 'success');
        
        // Flip to login
        setTimeout(() => {
            showToast('Please login with your new credentials', 'info');
            flipCard(new Event('click'));
        }, 1500);
    }, 2000);
});

// ========================================
// TOAST NOTIFICATION SYSTEM
// ========================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Add icon based on type
    const icons = {
        success: '✓',
        error: '✗',
        info: 'ⓘ',
        warning: '⚠'
    };
    
    toast.innerHTML = `<strong>${icons[type]}</strong> ${message}`;
    
    container.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
    
    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => {
            toast.remove();
        }, 500);
    });
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(500px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// EMAIL VALIDATION
// ========================================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', function(e) {
    // Ctrl + Alt + F to flip card
    if (e.ctrlKey && e.altKey && e.key === 'f') {
        e.preventDefault();
        flipCard(new Event('click'));
        showToast('Card flipped! (Ctrl+Alt+F)', 'info');
    }
    
    // Ctrl + Alt + S to trigger Face ID
    if (e.ctrlKey && e.altKey && e.key === 's') {
        e.preventDefault();
        triggerFaceID();
    }
    
    // Ctrl + Alt + D to trigger Fingerprint
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        e.preventDefault();
        triggerFingerprint();
    }
});

// ========================================
// PARALLAX EFFECT ON CARD
// ========================================
const card = document.getElementById('card3d');
const scene = document.querySelector('.scene');

scene.addEventListener('mousemove', function(e) {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

scene.addEventListener('mouseleave', function() {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
});

// ========================================
// RANDOM PARTICLE EFFECTS ON BUTTON HOVER
// ========================================
const submitButtons = document.querySelectorAll('.submit-btn-3d');

submitButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        createButtonParticles(this);
    });
});

function createButtonParticles(button) {
    const particleContainer = button.querySelector('.btn-particles');
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            bottom: 0;
            animation: particleRise ${1 + Math.random()}s ease-out forwards;
        `;
        
        particleContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

// Particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleRise {
        to {
            transform: translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// ========================================
// WELCOME MESSAGE
// ========================================
setTimeout(() => {
    showToast('Welcome to the future of authentication! 🚀', 'info');
}, 500);

// Display keyboard shortcuts after 3 seconds
setTimeout(() => {
    console.log('%c⌨️ KEYBOARD SHORTCUTS:', 'font-size: 14px; font-weight: bold; color: #00f3ff;');
    console.log('%cCtrl+Alt+F - Flip Card', 'color: #ff00ff;');
    console.log('%cCtrl+Alt+S - Face ID', 'color: #ff00ff;');
    console.log('%cCtrl+Alt+D - Fingerprint', 'color: #ff00ff;');
}, 3000);

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Throttle particle updates on slower devices
if (window.innerWidth < 768) {
    particles.length = 40; // Reduce particles on mobile
}

console.log('%c✅ Template loaded successfully!', 'font-size: 12px; color: #10b981;');
