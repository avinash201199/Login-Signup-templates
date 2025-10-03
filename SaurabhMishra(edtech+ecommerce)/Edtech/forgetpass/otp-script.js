// Global variables
let isDarkTheme = false;
let otpInputs = [];

// DOM elements
const verifyBtn = document.getElementById('verifyBtn');
const backToLoginBtn = document.getElementById('backToLogin');
const resendOtpBtn = document.getElementById('resendOtp');
const themeToggleInput = document.getElementById('themeToggle');
const themeLabels = document.querySelectorAll('.theme-label');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeOtpInputs();
});

// Setup all event listeners
function setupEventListeners() {
    // Verify button
    verifyBtn.addEventListener('click', handleVerifyOTP);
    
    // Navigation buttons
    backToLoginBtn.addEventListener('click', () => {
        window.location.href = '../login/index.html';
    });
    
    resendOtpBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    
    // Theme toggle
    themeToggleInput.addEventListener('change', handleThemeToggle);
}

// Initialize OTP inputs
function initializeOtpInputs() {
    otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => handleOtpInput(e, index));
        input.addEventListener('keydown', (e) => handleKeyDown(e, index));
        input.addEventListener('paste', handlePaste);
    });
}

// Handle OTP input
function handleOtpInput(event, index) {
    const value = event.target.value;
    
    // Allow only numbers
    if (!/^\d?$/.test(value)) {
        event.target.value = '';
        return;
    }
    
    // Update visual state
    if (value) {
        event.target.classList.add('filled');
        // Move to next input if available
        if (index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
        }
    } else {
        event.target.classList.remove('filled');
    }
    
    // Check if all inputs are filled
    updateVerifyButtonState();
}

// Handle keydown events
function handleKeyDown(event, index) {
    if (event.key === 'Backspace' && !event.target.value && index > 0) {
        // Move to previous input on backspace if current is empty
        otpInputs[index - 1].focus();
        otpInputs[index - 1].value = '';
        otpInputs[index - 1].classList.remove('filled');
    }
    
    if (event.key === 'ArrowLeft' && index > 0) {
        otpInputs[index - 1].focus();
    }
    
    if (event.key === 'ArrowRight' && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
    }
}

// Handle paste event
function handlePaste(event) {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('text');
    const digits = pasteData.replace(/\D/g, '').slice(0, 6);
    
    digits.split('').forEach((digit, index) => {
        if (index < otpInputs.length) {
            otpInputs[index].value = digit;
            otpInputs[index].classList.add('filled');
        }
    });
    
    updateVerifyButtonState();
}

// Update verify button state
function updateVerifyButtonState() {
    const allFilled = Array.from(otpInputs).every(input => input.value);
    verifyBtn.disabled = !allFilled;
}

// Handle OTP verification
function handleVerifyOTP() {
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        alert('Please enter the complete 6-digit OTP');
        return;
    }
    
    // Simple OTP verification simulation
    simulateOtpVerification(otp);
}

// Simulate OTP verification
function simulateOtpVerification(otp) {
    const originalText = verifyBtn.textContent;
    verifyBtn.textContent = 'Verifying...';
    verifyBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        verifyBtn.textContent = originalText;
        verifyBtn.disabled = false;
        
        // Show success message
        alert(`OTP Verified Successfully!\n\nOTP: ${otp}\n\nVerification complete!`);
        
        // Clear OTP inputs after verification
        clearOtp();
        
        // Optionally redirect back to login
        // window.location.href = '../login/index.html';
        
    }, 2000);
}

// Theme handling functions
function handleThemeToggle() {
    isDarkTheme = themeToggleInput.checked;
    updateTheme();
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

// Utility functions
function clearOtp() {
    otpInputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled');
    });
    updateVerifyButtonState();
}

// Export functions for external use
window.OtpVerification = {
    clearOtp
};