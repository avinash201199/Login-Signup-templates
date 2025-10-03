// Global variables
let accType = 'Student';
let showPassword = false;
let isDarkTheme = false;

// DOM elements
const togglePasswordBtn = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const accTypeButtons = document.querySelectorAll('.acctype-btn');
const themeToggleInput = document.getElementById('themeToggle');
const themeLabels = document.querySelectorAll('.theme-label');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadThemePreference();
});

// Setup all event listeners
function setupEventListeners() {
    // Password toggle functionality
    togglePasswordBtn.addEventListener('click', handlePasswordToggle);
    
    // Account type buttons
    accTypeButtons.forEach(button => {
        button.addEventListener('click', handleAccTypeChange);
    });
    
    // Form submission
    loginForm.addEventListener('submit', handleFormSubmit);
    
    // Theme toggle
    themeToggleInput.addEventListener('change', handleThemeToggle);
}

// Handle password visibility toggle
function handlePasswordToggle() {
    showPassword = !showPassword;
    
    if (showPassword) {
        passwordInput.type = 'text';
        togglePasswordBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        togglePasswordBtn.textContent = 'Show';
    }
}

// Handle account type change
function handleAccTypeChange(event) {
    const clickedButton = event.target;
    const selectedType = clickedButton.getAttribute('data-type');
    
    // Remove active class from all buttons
    accTypeButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    clickedButton.classList.add('active');
    
    // Update account type
    accType = selectedType;
    
    console.log('Account type changed to:', accType);
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Create form data object
    const formData = {
        email: email,
        password: password,
        accType: accType
    };
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Password validation
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Simulate login process
    simulateLogin(formData);
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Simulate login process
function simulateLogin(formData) {
    // Show loading state
    const submitButton = document.querySelector('.login-submit-form-button button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Signing in...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        alert(`Login Successful!\nAccount Type: ${formData.accType}\nEmail: ${formData.email}\nWelcome back!`);
        
        // Log form data to console (for development)
        console.log('Login form submitted:', formData);
        
        // You can add actual login logic here
        // For example: redirect to dashboard, store user data, etc.
        
        // Optionally clear the form
        // loginForm.reset();
        
    }, 1000); // 1 second delay (optional)
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

// Additional utility functions

// Function to clear form
function clearForm() {
    loginForm.reset();
    // Reset password visibility
    showPassword = false;
    passwordInput.type = 'password';
    togglePasswordBtn.textContent = 'Show';
}

// Function to set account type programmatically
function setAccountType(type) {
    const targetButton = document.querySelector(`[data-type="${type}"]`);
    if (targetButton) {
        targetButton.click();
    }
}

// Function to validate form before submission
function validateForm() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    const errors = [];
    
    if (!email) {
        errors.push('Email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Export functions for external use (if needed)
window.LoginPage = {
    clearForm,
    setAccountType,
    validateForm
};