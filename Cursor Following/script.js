// DOM Elements
const character = document.getElementById('character');
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const leftPupil = document.querySelector('.left-pupil');
const rightPupil = document.querySelector('.right-pupil');
const characterBtns = document.querySelectorAll('.character-btn');
const signupForm = document.querySelector('.signup-form');
const switchToSignup = document.querySelector('.switch-to-signup');
const switchToLogin = document.querySelector('.switch-to-login');
const passwordFields = document.querySelectorAll('.password-field');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const passwordToggles = document.querySelectorAll('.password-toggle');
const socialButtons = document.querySelectorAll('.social-btn');

// Mouse tracking for eye movement
let mouseX = 0;
let mouseY = 0;
let isTypingPassword = false;

// Theme management
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// Initialize theme
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateEyePosition();
});

// Function to update eye position based on mouse
function updateEyePosition() {
    if (isTypingPassword) return;

    const characterRect = character.getBoundingClientRect();
    const characterCenterX = characterRect.left + characterRect.width / 2;
    const characterCenterY = characterRect.top + characterRect.height / 2;

    // Calculate angle and distance
    const angle = Math.atan2(mouseY - characterCenterY, mouseX - characterCenterX);
    const distance = Math.min(3, Math.sqrt(Math.pow(mouseX - characterCenterX, 2) + Math.pow(mouseY - characterCenterY, 2)) / 60);

    // Calculate pupil positions
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    // Apply positions
    leftPupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    rightPupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
}

// Password field handlers
passwordFields.forEach(field => {
    field.addEventListener('focus', () => {
        isTypingPassword = true;
        
        // Blink before closing eyes
        leftEye.style.animation = 'inputFocusBlink 0.5s ease-in-out';
        rightEye.style.animation = 'inputFocusBlink 0.5s ease-in-out';
        
        setTimeout(() => {
            leftEye.classList.add('closed');
            rightEye.classList.add('closed');
            leftEye.style.animation = '';
            rightEye.style.animation = '';
        }, 500);
        
        // Add shy animation to character
        character.style.animation = 'float 2s ease-in-out infinite, shy 0.5s ease-out';
    });

    field.addEventListener('blur', () => {
        isTypingPassword = false;
        
        // Blink before opening eyes
        leftEye.classList.remove('closed');
        rightEye.classList.remove('closed');
        
        leftEye.style.animation = 'inputFocusBlink 0.5s ease-in-out';
        rightEye.style.animation = 'inputFocusBlink 0.5s ease-in-out';
        
        setTimeout(() => {
            leftEye.style.animation = '';
            rightEye.style.animation = '';
            updateEyePosition();
        }, 500);
        
        // Remove shy animation
        character.style.animation = 'float 2s ease-in-out infinite';
    });
});

// Form switching functionality
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms('signup');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchForms('login');
});

function switchForms(formType) {
    if (formType === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        
        // Add excited animation to character
        character.style.animation = 'float 3s ease-in-out infinite, excited 1s ease-out';
        setTimeout(() => {
            character.style.animation = 'float 3s ease-in-out infinite, peek 8s ease-in-out infinite';
        }, 1000);
    } else {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        
        // Add welcome back animation to character
        character.style.animation = 'float 3s ease-in-out infinite, welcomeBack 1s ease-out';
        setTimeout(() => {
            character.style.animation = 'float 3s ease-in-out infinite, peek 8s ease-in-out infinite';
        }, 1000);
    }
}

// Form submission handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Character celebration animation
        character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite, celebrate 2s ease-out';
        
        // Show success message (you can customize this)
        const formType = form.closest('.login-form') ? 'Login' : 'Signup';
        setTimeout(() => {
            alert(`${formType} successful!`);
            character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite';
        }, 1000);
    });
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('darkMode', isDarkMode);
    
    // Character reaction to theme change
    character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite, excited 1s ease-out';
    setTimeout(() => {
        character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite';
    }, 1000);
});

// Password toggle functionality
passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const targetId = toggle.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);
        const svg = toggle.querySelector('svg');
        
        if (targetInput.type === 'password') {
            targetInput.type = 'text';
            // Change to "eye-off" icon
            svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><path d="M21 9.5l-1.5 1.5M3 14.5l1.5-1.5M9 9l3 3M15 15l-3-3"/><line x1="1" y1="1" x2="23" y2="23"/>';
        } else {
            targetInput.type = 'password';
            // Change back to "eye" icon
            svg.innerHTML = '<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>';
        }
    });
});

// Social button interactions
socialButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonType = button.classList.contains('google-btn') ? 'Google' : 
                          button.classList.contains('facebook-btn') ? 'Facebook' : 'GitHub';
        
        // Character excited animation for social login
        character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite, bounce 1s ease-out';
        
        setTimeout(() => {
            alert(`${buttonType} login clicked! Integration would go here.`);
            character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite';
        }, 500);
    });
});

// Add periodic blinking
function periodicBlink() {
    if (!isTypingPassword) {
        leftEye.style.animation = 'blink 0.3s ease-in-out';
        rightEye.style.animation = 'blink 0.3s ease-in-out';
        
        setTimeout(() => {
            leftEye.style.animation = '';
            rightEye.style.animation = '';
        }, 300);
    }
}

// Blink every 3-6 seconds randomly
setInterval(() => {
    if (Math.random() > 0.5) {
        periodicBlink();
    }
}, Math.random() * 3000 + 3000);

// Add random character behaviors
function randomCharacterBehavior() {
    const behaviors = ['yawn', 'stretch', 'lookAround'];
    const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
    
    character.style.animation = `float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite, ${randomBehavior} 2s ease-in-out`;
    
    setTimeout(() => {
        character.style.animation = 'float 1.5s ease-in-out infinite, wiggle 0.8s ease-in-out infinite';
    }, 2000);
}

// Random character behavior every 10-20 seconds (more frequent)
setInterval(randomCharacterBehavior, Math.random() * 10000 + 10000);

// Character switching functionality
characterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        characterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get the character type
        const characterType = btn.getAttribute('data-character');
        
        // Remove all character classes
        character.classList.remove('cat', 'dog', 'bear', 'wolf', 'panda');
        // Add the new character class
        character.classList.add(characterType);
        
        // Update the data-type attribute
        character.setAttribute('data-type', characterType);
        
        // Character transformation animation
        character.style.animation = 'float 1.5s ease-in-out infinite, bounce 1s ease-out';
        setTimeout(() => {
            character.style.animation = 'float 1.5s ease-in-out infinite';
        }, 1000);
    });
});

// Initialize eye position
updateEyePosition();

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shy {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(5px) rotate(-2deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }

    @keyframes excited {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-15px) rotate(3deg); }
        50% { transform: translateY(-5px) rotate(-2deg); }
        75% { transform: translateY(-10px) rotate(1deg); }
    }

    @keyframes welcomeBack {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-8px) rotate(0deg); }
    }

    @keyframes curious {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-3px) rotate(1deg); }
    }

    @keyframes celebrate {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        20% { transform: translateY(-20px) rotate(5deg); }
        40% { transform: translateY(-10px) rotate(-3deg); }
        60% { transform: translateY(-15px) rotate(2deg); }
        80% { transform: translateY(-5px) rotate(-1deg); }
    }

    @keyframes blink {
        0%, 100% { height: 25px; }
        50% { height: 3px; }
    }

    @keyframes yawn {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-5px) rotate(0deg) scaleY(1.1); }
    }

    @keyframes stretch {
        0%, 100% { transform: translateY(0) rotate(0deg) scaleX(1); }
        50% { transform: translateY(-8px) rotate(0deg) scaleX(1.05); }
    }

    @keyframes lookAround {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-2px) rotate(3deg); }
        50% { transform: translateY(-2px) rotate(0deg); }
        75% { transform: translateY(-2px) rotate(-3deg); }
    }
`;
document.head.appendChild(style);