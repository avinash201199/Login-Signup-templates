// Get form elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');

// Toggle between login and signup forms with enhanced effects
showSignupBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        signupForm.style.animation = 'fadeIn 0.5s ease, glitchSwitch 0.3s ease';
    }, 300);
});

showLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        loginForm.style.animation = 'fadeIn 0.5s ease, glitchSwitch 0.3s ease';
    }, 300);
});

// Handle login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Validate inputs
    if (!email || !password) {
        showNotification('ERROR: All fields required', 'error');
        return;
    }

    // Show loading effect
    const submitBtn = loginForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'ACCESSING...';
    submitBtn.style.pointerEvents = 'none';

    // Simulate login
    setTimeout(() => {
        console.log('Login attempt:', { email, password, rememberMe });
        showNotification('ACCESS GRANTED', 'success');
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = 'auto';
        loginForm.reset();
    }, 1500);
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showNotification('ERROR: All fields required', 'error');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showNotification('ERROR: Passwords do not match', 'error');
        return;
    }

    // Check password strength (minimum 6 characters)
    if (password.length < 6) {
        showNotification('ERROR: Password too weak', 'error');
        return;
    }

    // Check if terms are agreed
    if (!agreeTerms) {
        showNotification('ERROR: Accept terms to continue', 'error');
        return;
    }

    // Show loading effect
    const submitBtn = signupForm.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'INITIALIZING...';
    submitBtn.style.pointerEvents = 'none';

    // Simulate signup
    setTimeout(() => {
        console.log('Signup attempt:', { name, email, password });
        showNotification('USER INITIALIZED SUCCESSFULLY', 'success');
        submitBtn.textContent = originalText;
        submitBtn.style.pointerEvents = 'auto';

        // Reset form and switch to login
        signupForm.reset();
        setTimeout(() => {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
        }, 1000);
    }, 1500);
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time email validation
document.getElementById('loginEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showNotification('ERROR: Invalid email format', 'error');
    }
});

document.getElementById('signupEmail').addEventListener('blur', function() {
    if (this.value && !validateEmail(this.value)) {
        showNotification('ERROR: Invalid email format', 'error');
    }
});

// Custom notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Matrix Rain Effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

// Responsive font size
let fontSize = 16;
if (window.innerWidth <= 768) {
    fontSize = 14;
}
if (window.innerWidth <= 480) {
    fontSize = 12;
}

const columns = canvas.width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing effect for inputs
const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
inputs.forEach(input => {
    input.addEventListener('input', function(e) {
        this.style.textShadow = '0 0 8px rgba(0, 255, 65, 0.8)';
        setTimeout(() => {
            this.style.textShadow = 'none';
        }, 100);
    });
});

// Glitch effect on form switch
function glitchEffect(element) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'fadeIn 0.5s ease, glitchSwitch 0.3s ease';
    }, 10);
}

// Quark Particle System
const particleCanvas = document.getElementById('particleCanvas');
const pCtx = particleCanvas.getContext('2d');

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 4 + 2;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;

        // Multiple color variations
        const colors = [
            `rgba(0, 255, 65, ${Math.random() * 0.6 + 0.3})`,
            `rgba(0, 255, 200, ${Math.random() * 0.6 + 0.3})`,
            `rgba(100, 255, 150, ${Math.random() * 0.6 + 0.3})`,
            `rgba(50, 255, 100, ${Math.random() * 0.6 + 0.3})`
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.shape = Math.floor(Math.random() * 4); // 0: circle, 1: triangle, 2: hexagon, 3: star
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.03;
        this.pulseSize = 0;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.pulseSize = Math.sin(Date.now() * this.pulseSpeed * 0.001) * 0.5;

        if (this.x > particleCanvas.width) this.x = 0;
        if (this.x < 0) this.x = particleCanvas.width;
        if (this.y > particleCanvas.height) this.y = 0;
        if (this.y < 0) this.y = particleCanvas.height;
    }

    draw() {
        pCtx.save();
        pCtx.translate(this.x, this.y);
        pCtx.rotate(this.rotation);

        const currentSize = this.size + this.pulseSize;

        // Add glow effect
        pCtx.shadowBlur = 15;
        pCtx.shadowColor = this.color;
        pCtx.fillStyle = this.color;
        pCtx.strokeStyle = this.color;
        pCtx.lineWidth = 1.5;

        switch(this.shape) {
            case 0: // Circle (quark) with inner glow
                pCtx.beginPath();
                pCtx.arc(0, 0, currentSize, 0, Math.PI * 2);
                pCtx.fill();
                pCtx.beginPath();
                pCtx.arc(0, 0, currentSize * 0.5, 0, Math.PI * 2);
                pCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                pCtx.stroke();
                break;
            case 1: // Triangle
                pCtx.beginPath();
                pCtx.moveTo(0, -currentSize);
                pCtx.lineTo(currentSize, currentSize);
                pCtx.lineTo(-currentSize, currentSize);
                pCtx.closePath();
                pCtx.fill();
                pCtx.stroke();
                break;
            case 2: // Hexagon (quark structure)
                pCtx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i;
                    const x = currentSize * Math.cos(angle);
                    const y = currentSize * Math.sin(angle);
                    if (i === 0) pCtx.moveTo(x, y);
                    else pCtx.lineTo(x, y);
                }
                pCtx.closePath();
                pCtx.fill();
                pCtx.stroke();
                break;
            case 3: // Star (quantum state)
                pCtx.beginPath();
                for (let i = 0; i < 10; i++) {
                    const angle = (Math.PI / 5) * i;
                    const radius = i % 2 === 0 ? currentSize : currentSize * 0.5;
                    const x = radius * Math.cos(angle - Math.PI / 2);
                    const y = radius * Math.sin(angle - Math.PI / 2);
                    if (i === 0) pCtx.moveTo(x, y);
                    else pCtx.lineTo(x, y);
                }
                pCtx.closePath();
                pCtx.fill();
                pCtx.stroke();
                break;
        }

        pCtx.restore();
    }
}

const particles = [];
// Responsive particle count
let particleCount = 100;

// Detect mobile device and adjust particle count
if (window.innerWidth <= 768) {
    particleCount = 50;
}
if (window.innerWidth <= 480) {
    particleCount = 30;
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Mouse interaction
let mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        // Mouse interaction
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - particles[i].x;
            const dy = mouse.y - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                particles[i].x -= dx / distance * 2;
                particles[i].y -= dy / distance * 2;
            }
        }

        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = 0.3 * (1 - distance / 150);
                pCtx.strokeStyle = `rgba(0, 255, 65, ${opacity})`;
                pCtx.lineWidth = 1;
                pCtx.shadowBlur = 5;
                pCtx.shadowColor = 'rgba(0, 255, 65, 0.5)';
                pCtx.beginPath();
                pCtx.moveTo(particles[i].x, particles[i].y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    connectParticles();

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Touch support for mobile
window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
});

window.addEventListener('touchend', () => {
    mouse.x = null;
    mouse.y = null;
});

// Resize handler with particle optimization
window.addEventListener('resize', () => {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust particle count on resize
    const newCount = window.innerWidth <= 480 ? 30 : window.innerWidth <= 768 ? 50 : 100;

    if (newCount > particles.length) {
        for (let i = particles.length; i < newCount; i++) {
            particles.push(new Particle());
        }
    } else if (newCount < particles.length) {
        particles.splice(newCount);
    }
});
