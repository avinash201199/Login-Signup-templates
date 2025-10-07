// Login form functionality with simulated backend calls

// Simulated user database for demo purposes
const DEMO_USERS = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@shop.com', password: 'admin123' },
    { email: 'demo@user.com', password: 'demo123' }
];

// Simulated login function
function simulateLogin(email, password) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            const user = DEMO_USERS.find(u => u.email === email && u.password === password);
            
            if (user) {
                resolve({
                    success: true,
                    message: 'Login successful! Welcome back!',
                    user: { email: user.email }
                });
            } else {
                resolve({
                    success: false,
                    message: 'Invalid email or password. Please try again.'
                });
            }
        }, 1000); // 1 second delay to simulate network request
    });
}

// Form elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const errorMessage = document.getElementById('error-message');

// Form data object
let formData = {
    email: '',
    password: ''
};

// Update form data when inputs change
function handleInputChange(event) {
    const { name, value } = event.target;
    formData[name] = value;
    console.log('Form data updated:', formData); // Debug log
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Set loading state
function setLoading(isLoading) {
    if (isLoading) {
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;
    } else {
        submitBtn.textContent = 'Sign In';
        submitBtn.disabled = false;
    }
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    setLoading(true);
    hideError();
    
    // Get current form values
    formData.email = emailInput.value;
    formData.password = passwordInput.value;
    
    console.log('Login form data:', formData); // Debug log
    
    try {
        const result = await simulateLogin(formData.email, formData.password);
        console.log('Login result:', result); // Debug log
        
        if (result.success) {
            // Show success message
            alert(result.message);
            
            // Store user session (for demo purposes)
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Redirect to home page (you can change this URL)
            window.location.href = '../../index.html'; // Adjust path as needed
        } else {
            showError(result.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Login failed. Please try again.');
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
emailInput.addEventListener('input', handleInputChange);
passwordInput.addEventListener('input', handleInputChange);
loginForm.addEventListener('submit', handleSubmit);

// Demo credentials helper (optional - you can remove this)
console.log('Demo credentials for testing:');
console.log('Email: user@example.com, Password: password123');
console.log('Email: admin@shop.com, Password: admin123');
console.log('Email: demo@user.com, Password: demo123');

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page initialized');
    hideError();
    initPasswordToggle();
});