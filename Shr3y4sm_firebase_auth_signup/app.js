const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorText = document.getElementById('error-text');

function showError(message) {
    errorText.textContent = message;
    errorText.hidden = !message;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
    showError('');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!validateEmail(email)) {
        showError('Please enter a valid email address.');
        emailInput.focus();
        return;
    }
    if (password.length < 6) {
        showError('Password must be at least 6 characters.');
        passwordInput.focus();
        return;
    }

    // Simulate submit
    alert('Account created for ' + email + '! (Hook up Firebase here)');
    form.reset();
});

document.getElementById('google-btn').addEventListener('click', function () {
    alert('Google sign-in clicked (wire to provider).');
});
document.getElementById('facebook-btn').addEventListener('click', function () {
    alert('Facebook sign-in clicked (wire to provider).');
});


