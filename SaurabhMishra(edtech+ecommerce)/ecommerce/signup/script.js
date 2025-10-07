// Signup form functionality with simulated backend calls

// Simulated user database for demo purposes (would be stored on server)
const EXISTING_USERS = [
    'user@example.com',
    'admin@shop.com',
    'demo@user.com'
];

// Password validation rules (from edtech)
const validationRules = {
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    specialChar: /[^A-Za-z0-9]/,
    minLength: /.{8,}/
};

// Simulated signup function
function simulateSignup(userData) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // Check if email already exists
            if (EXISTING_USERS.includes(userData.email)) {
                resolve({
                    success: false,
                    message: 'Email already exists. Please use a different email address.'
                });
                return;
            }
            
            // Simulate successful registration
            resolve({
                success: true,
                message: 'Account created successfully! Welcome to our store!',
                user: { 
                    name: userData.name,
                    email: userData.email 
                }
            });
        }, 1500); // 1.5 second delay to simulate network request
    });
}

// Form elements
const signupForm = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');
const validationList = document.getElementById('validationList');

// Form data object
let formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

// Update form data when inputs change
function handleInputChange(event) {
    const { name, value } = event.target;
    formData[name] = value;
    console.log('Form data updated:', formData); // Debug log
    
    // Real-time validation
    validateField(event.target);
    
    // Update password validation if password fields
    if (name === 'password' || name === 'confirmPassword') {
        updatePasswordValidation();
    }
}

// Password validation (from edtech)
function updatePasswordValidation() {
    if (!formData.password && !passwordInput.value) {
        validationList.style.display = 'none';
        return;
    }
    
    const currentPassword = passwordInput.value || formData.password;
    const currentConfirmPassword = confirmPasswordInput.value || formData.confirmPassword;
    
    validationList.style.display = 'block';
    
    const isValid = {
        lowercase: validationRules.lowercase.test(currentPassword),
        uppercase: validationRules.uppercase.test(currentPassword),
        number: validationRules.number.test(currentPassword),
        specialChar: validationRules.specialChar.test(currentPassword),
        minLength: validationRules.minLength.test(currentPassword)
    };
    
    const passwordsMatch = currentPassword === currentConfirmPassword && currentConfirmPassword;
    
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
    if (item) {
        if (isValid) {
            item.classList.add('valid');
            item.classList.remove('invalid');
        } else {
            item.classList.add('invalid');
            item.classList.remove('valid');
        }
    }
}

// Validate individual field
function validateField(input) {
    const { name, value } = input;
    
    // Remove previous validation classes
    input.classList.remove('error', 'success');
    
    switch (name) {
        case 'name':
            if (value.length >= 2) {
                input.classList.add('success');
            } else if (value.length > 0) {
                input.classList.add('error');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(value)) {
                input.classList.add('success');
            } else if (value.length > 0) {
                input.classList.add('error');
            }
            break;
            
        case 'password':
            if (value.length >= 8) {
                input.classList.add('success');
            } else if (value.length > 0) {
                input.classList.add('error');
            }
            // Also validate confirm password if it has a value
            if (confirmPasswordInput.value) {
                validateField(confirmPasswordInput);
            }
            break;
            
        case 'confirmPassword':
            if (value === passwordInput.value && value.length > 0) {
                input.classList.add('success');
            } else if (value.length > 0) {
                input.classList.add('error');
            }
            break;
    }
}

// Form validation
function validateForm() {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
        showError('Passwords do not match');
        return false;
    }
    
    // Check name length
    if (formData.name.trim().length < 2) {
        showError('Name must be at least 2 characters long');
        return false;
    }
    
    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showError('Please enter a valid email address');
        return false;
    }
    
    // Validate password using edtech rules
    const validation = updatePasswordValidation();
    if (!validation || !validation.allValid) {
        showError('Password does not meet all criteria');
        return false;
    }
    
    if (!validation.passwordsMatch) {
        showError('Passwords do not match');
        return false;
    }
    
    return true;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'error-message';
}

// Show success message
function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'success-message';
}

// Hide error/success message
function hideMessage() {
    errorMessage.style.display = 'none';
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;
    } else {
        submitBtn.textContent = 'Create Account';
        submitBtn.disabled = false;
    }
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    setLoading(true);
    hideMessage();
    
    // Get current form values
    formData.name = nameInput.value.trim();
    formData.email = emailInput.value.trim();
    formData.password = passwordInput.value;
    formData.confirmPassword = confirmPasswordInput.value;
    
    console.log('Signup form data:', formData); // Debug log
    
    if (!validateForm()) {
        setLoading(false);
        return;
    }
    
    try {
        // Remove confirmPassword from data to send
        const { confirmPassword, ...dataToSend } = formData;
        console.log('Data being sent to API:', dataToSend); // Debug log
        
        const result = await simulateSignup(dataToSend);
        console.log('Signup result:', result); // Debug log
        
        if (result.success) {
            // Show success message
            showSuccess(result.message);
            
            // Store user session (for demo purposes)
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Clear form
            signupForm.reset();
            formData = { name: '', email: '', password: '', confirmPassword: '' };
            
            // Remove validation classes
            document.querySelectorAll('.form-group input').forEach(input => {
                input.classList.remove('error', 'success');
            });
            
            // Clear password validation
            if (validationList) {
                validationList.style.display = 'none';
            }
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                window.location.href = '../login/index.html';
            }, 2000);
        } else {
            showError(result.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Registration failed. Please try again.');
    } finally {
        setLoading(false);
    }
}

// Password toggle functionality
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                this.textContent = 'Hide';
            } else {
                targetInput.type = 'password';
                this.textContent = 'Show';
            }
        });
        
        // Make it focusable for accessibility
        toggle.setAttribute('tabindex', '0');
        
        // Handle keyboard access
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Event listeners
nameInput.addEventListener('input', handleInputChange);
emailInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);
confirmPasswordInput.addEventListener('input', handleInputChange);
signupForm.addEventListener('submit', handleSubmit);

// Demo information
console.log('Signup page initialized');
console.log('Existing demo emails (will show error if used):');
console.log('- user@example.com');
console.log('- admin@shop.com');
console.log('- demo@user.com');
console.log('Try using a different email to test successful registration.');

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Signup page loaded');
    hideMessage();
    initPasswordToggle();
});