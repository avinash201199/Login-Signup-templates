// Global variables
let isDarkTheme = false;

// DOM elements
const resetForm = document.getElementById('resetForm');
const emailInput = document.getElementById('email');
const backToLoginBtn = document.getElementById('backToLogin');
const proceedToOtpBtn = document.getElementById('proceedToOtp');
const themeToggleInput = document.getElementById('themeToggle');
const themeLabels = document.querySelectorAll('.theme-label');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadThemePreference();
});

// Setup all event listeners
function setupEventListeners() {
    // Form submission
    resetForm.addEventListener('submit', handleReset);
    
    // Navigation buttons
    backToLoginBtn.addEventListener('click', () => {
        window.location.href = '../login/index.html';
    });
    
    proceedToOtpBtn.addEventListener('click', () => {
        window.location.href = 'otp.html';
    });
    
    // Theme toggle
    themeToggleInput.addEventListener('change', handleThemeToggle);
}

// Handle form submission
function handleReset(event) {
    event.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Basic validation
    if (!email) {
        alert('Please enter your email address!');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Simulate password reset process
    simulatePasswordReset(email);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate password reset process
function simulatePasswordReset(email) {
    const submitButton = document.querySelector('.reset-button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending OTP...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Store reset data in localStorage
        const resetData = {
            email: email,
            purpose: 'password-reset',
            timestamp: Date.now()
        };
        localStorage.setItem('resetData', JSON.stringify(resetData));
        
        // Show success message and reveal proceed button
        alert(`OTP sent to email: ${email}\n\nPlease check your email and click 'Proceed to enter OTP' to continue.`);
        
        // Show proceed button
        proceedToOtpBtn.style.display = 'flex';
        
        console.log('Password reset initiated for:', email);
        
    }, 2000); // 2 second delay to simulate network request
}

// Theme handling functions
function handleThemeToggle() {
    isDarkTheme = themeToggleInput.checked;
    updateTheme();
    saveThemePreference();
}

function updateTheme() {
    if (isDarkTheme) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeLabels[0].classList.remove('active'); // moon
        themeLabels[1].classList.add('active'); // sun
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeLabels[0].classList.add('active'); // moon
        themeLabels[1].classList.remove('active'); // sun
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkTheme = true;
        themeToggleInput.checked = true;
        updateTheme();
    } else {
        themeLabels[0].classList.add('active'); // moon active by default
    }
}

function saveThemePreference() {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Utility functions
function clearForm() {
    resetForm.reset();
    proceedToOtpBtn.style.display = 'none';
}

// Export functions for external use
window.ResetPassword = {
    clearForm
};