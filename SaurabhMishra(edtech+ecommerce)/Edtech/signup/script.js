// Global variables
let accType = 'Student';
let showPassword = false;
let showConfirmPassword = false;
let isDarkTheme = false;

// Form data
let formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

// Password validation rules
const validationRules = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    specialChar: /[^A-Za-z0-9]/,
    minLength: /.{8,}/
};

// DOM elements
const signupForm = document.getElementById('signupForm');
const roleButtons = document.querySelectorAll('.role-btn');
const togglePasswordBtn = document.getElementById('togglePassword');
const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const validationList = document.getElementById('validationList');
const themeToggleInput = document.getElementById('themeToggle');
const themeLabels = document.querySelectorAll('.theme-label');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadThemePreference();
});

// Setup all event listeners
function setupEventListeners() {
    // Form inputs
    document.getElementById('firstName').addEventListener('input', handleInputChange);
    document.getElementById('lastName').addEventListener('input', handleInputChange);
    document.getElementById('email').addEventListener('input', handleInputChange);
    passwordInput.addEventListener('input', handlePasswordChange);
    confirmPasswordInput.addEventListener('input', handleConfirmPasswordChange);
    
    // Password toggles
    togglePasswordBtn.addEventListener('click', handlePasswordToggle);
    toggleConfirmPasswordBtn.addEventListener('click', handleConfirmPasswordToggle);
    
    // Role buttons
    roleButtons.forEach(button => {
        button.addEventListener('click', handleRoleChange);
    });
    
    // Form submission
    signupForm.addEventListener('submit', handleFormSubmit);
    
    // Theme toggle
    themeToggleInput.addEventListener('change', handleThemeToggle);
}

// Handle input changes
function handleInputChange(event) {
    const { name, value } = event.target;
    formData[name] = value;
}

function handlePasswordChange(event) {
    formData.password = event.target.value;
    updatePasswordValidation();
}

function handleConfirmPasswordChange(event) {
    formData.confirmPassword = event.target.value;
    updatePasswordValidation();
}

// Password visibility toggles
function handlePasswordToggle() {
    showPassword = !showPassword;
    passwordInput.type = showPassword ? 'text' : 'password';
    togglePasswordBtn.textContent = showPassword ? 'Hide' : 'Show';
}

function handleConfirmPasswordToggle() {
    showConfirmPassword = !showConfirmPassword;
    confirmPasswordInput.type = showConfirmPassword ? 'text' : 'password';
    toggleConfirmPasswordBtn.textContent = showConfirmPassword ? 'Hide' : 'Show';
}

// Handle role change
function handleRoleChange(event) {
    const clickedButton = event.target;
    const selectedType = clickedButton.getAttribute('data-type');
    
    // Remove active class from all buttons
    roleButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    clickedButton.classList.add('active');
    
    // Update account type
    accType = selectedType;
    
    console.log('Account type changed to:', accType);
}

// Password validation
function updatePasswordValidation() {
    if (!formData.password) {
        validationList.style.display = 'none';
        return;
    }
    
    validationList.style.display = 'block';
    
    const isValid = {
        lowercase: validationRules.lowercase.test(formData.password),
        uppercase: validationRules.uppercase.test(formData.password),
        number: validationRules.number.test(formData.password),
        specialChar: validationRules.specialChar.test(formData.password),
        minLength: validationRules.minLength.test(formData.password)
    };
    
    const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword;
    
    // Update validation list items
    updateValidationItem('lowercase', isValid.lowercase);
    updateValidationItem('uppercase', isValid.uppercase);
    updateValidationItem('number', isValid.number);
    updateValidationItem('specialChar', isValid.specialChar);
    updateValidationItem('minLength', isValid.minLength);
    updateValidationItem('passwordMatch', passwordsMatch);
    
    return {
        allValid: Object.values(isValid).every(Boolean),
        passwordsMatch
    };
}

function updateValidationItem(id, isValid) {
    const item = document.getElementById(id);
    if (isValid) {
        item.classList.add('valid');
        item.classList.remove('invalid');
    } else {
        item.classList.add('invalid');
        item.classList.remove('valid');
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get current form values
    formData.firstName = document.getElementById('firstName').value.trim();
    formData.lastName = document.getElementById('lastName').value.trim();
    formData.email = document.getElementById('email').value.trim();
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Simulate signup process
    simulateSignup();
}

function validateForm() {
    const errors = [];
    
    // Check required fields
    if (!formData.firstName) errors.push('First name is required');
    if (!formData.lastName) errors.push('Last name is required');
    if (!formData.email) errors.push('Email is required');
    if (!formData.password) errors.push('Password is required');
    if (!formData.confirmPassword) errors.push('Confirm password is required');
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate password
    const validation = updatePasswordValidation();
    if (!validation.allValid) {
        errors.push('Password does not meet all criteria');
    }
    
    if (!validation.passwordsMatch) {
        errors.push('Passwords do not match');
    }
    
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return false;
    }
    
    return true;
}

function simulateSignup() {
    const submitButton = document.querySelector('.create-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Creating Account...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Success message
        alert(`Account Created Successfully!\n\nAccount Type: ${accType}\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\n\nWelcome to GuruKul!\\n\\nOTP sent to your email for verification!`);
        
        // Log form data
        console.log('Signup form submitted:', {
            ...formData,
            accType,
            password: '[HIDDEN]',
            confirmPassword: '[HIDDEN]'
        });
        
        // Optionally redirect or clear form
        // window.location.href = '../login/index.html';
        
    }, 2000);   // Store signup data for OTP verification\n    const signupDataForOtp = {\n        firstName: formData.firstName,\n        lastName: formData.lastName,\n        email: formData.email,\n        password: formData.password,\n        confirmPassword: formData.confirmPassword,\n        accType: accType\n    };\n    localStorage.setItem('signupData', JSON.stringify(signupDataForOtp));\n    \n    // Redirect to OTP verification after delay\n    setTimeout(() => {\n        window.location.href = '../forgetpass/otp.html';\n    }, 3000);\n}
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
    signupForm.reset();
    formData = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    
    // Reset password visibility
    showPassword = false;
    showConfirmPassword = false;
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
    togglePasswordBtn.textContent = 'Show';
    toggleConfirmPasswordBtn.textContent = 'Show';
    
    // Hide validation list
    validationList.style.display = 'none';
}

// Export functions for external use
window.SignupPage = {
    clearForm,
    validateForm
};