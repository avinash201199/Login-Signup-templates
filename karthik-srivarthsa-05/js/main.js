document.addEventListener('DOMContentLoaded', () => {

    const themeToggleButton = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle i');
    const body = document.body;

    const applySavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('dark-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    };

    const handleThemeToggle = () => {
        if (themeToggleButton) {
            themeToggleButton.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                
                if (body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
        }
    };

    applySavedTheme();
    handleThemeToggle();    

    const setupPasswordToggle = (inputId, toggleId) => {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', () => {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                
                toggleIcon.classList.toggle('fa-eye');
                toggleIcon.classList.toggle('fa-eye-slash');
            });
        }
    };
    
    setupPasswordToggle('signin-password', 'toggle-signin-password');
    setupPasswordToggle('signup-password', 'toggle-signup-password');

    const signupPasswordInput = document.getElementById('signup-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.password-strength p');
    
    if (signupPasswordInput && strengthBar && strengthText) {
        signupPasswordInput.addEventListener('input', () => {
            const password = signupPasswordInput.value;
            let strength = 0;
            
            if (password.length > 5) strength++; 
            if (password.length > 8) strength++; 
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            strengthBar.className = 'strength-bar'; 
            if (password.length > 0) {
                switch (strength) {
                    case 0:
                    case 1:
                    case 2:
                        strengthBar.classList.add('weak');
                        strengthText.textContent = 'Weak';
                        break;
                    case 3:
                    case 4:
                        strengthBar.classList.add('medium');
                        strengthText.textContent = 'Medium';
                        break;
                    case 5:
                        strengthBar.classList.add('strong');
                        strengthText.textContent = 'Strong';
                        break;
                    default:
                        strengthText.textContent = 'Password strength';
                        break;
                }
            } else {
                strengthText.textContent = 'Password strength';
            }
        });
    }
});