 const passwordField = document.getElementById('password');
        const togglePassword = document.getElementById('togglePassword');
        const eyeOpen = document.getElementById('eye-open');
        const eyeClosed = document.getElementById('eye-closed');

        togglePassword.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            eyeOpen.classList.toggle('hidden');
            eyeClosed.classList.toggle('hidden');
        });
        

        const form = document.getElementById('loginForm');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    input.classList.remove('border-cyan-400');
                } else {
                    input.classList.remove('border-red-500');
                    input.classList.add('border-cyan-400');
                }
            });

            if(isValid) {
                const submitButton = form.querySelector('button[type="submit"]');
                submitButton.textContent = 'ACCESS GRANTED';
                submitButton.style.background = 'linear-gradient(90deg, #00ff00, #00ffff)';
                
                setTimeout(() => {
                     submitButton.textContent = 'AUTHENTICATE';
                     submitButton.style.background = 'linear-gradient(90deg, #00ffff, #ff00ff)';
                }, 2000);
            }
        });