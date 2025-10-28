// Author: Gupta Khushbu

const formTitle = document.getElementById('form-title');
        const nameField = document.getElementById('name-field');
        const confirmPasswordField = document.getElementById('confirm-password-field');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const submitButton = document.getElementById('submitButton');
        const toggleAuthText = document.getElementById('toggle-auth-text');

        const nameInput = document.getElementById('name');
        const confirmPasswordInput = document.getElementById('confirm-password');
        let isRegisterMode = true; // Start in Register mode

        function setupToggleListener() {
            // Remove any existing listener to prevent duplicates
            const existingLink = document.getElementById('toggle-auth-link');
            if (existingLink) {
                existingLink.removeEventListener('click', toggleAuthMode);
            }

            // Get the new link element
            const newLink = document.getElementById('toggle-auth-link');
            if (newLink) {
                newLink.addEventListener('click', toggleAuthMode);
            }
        }

        function toggleAuthMode(e) {
            e.preventDefault();
            isRegisterMode = !isRegisterMode;
            updateFormState();
        }

        function updateFormState() {
            if (isRegisterMode) {
                formTitle.textContent = 'Register';
                nameField.style.display = 'block';
                confirmPasswordField.style.display = 'block';
                forgotPasswordLink.style.display = 'none';
                submitButton.textContent = 'Register';
                toggleAuthText.innerHTML = 'Already have an account? <a href="#" id="toggle-auth-link">Login</a>';
                nameInput.setAttribute('required', '');
                confirmPasswordInput.setAttribute('required', '');
            } else {
                formTitle.textContent = 'Login';
                nameField.style.display = 'none';
                confirmPasswordField.style.display = 'none';
                forgotPasswordLink.style.display = 'block';
                submitButton.textContent = 'Login';
                toggleAuthText.innerHTML = 'Don\'t have an account? <a href="#" id="toggle-auth-link">Sign up</a>';
                nameInput.removeAttribute('required');
                confirmPasswordInput.removeAttribute('required');
            }
            // Re-attach the event listener to the new anchor tag
            setupToggleListener();
        }

        // Initial setup
        updateFormState();