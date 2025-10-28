  // Switch between login and signup tabs
        function switchTab(tab) {
            // Get all tab buttons and forms
            const tabButtons = document.querySelectorAll('.tab-btn');
            const forms = document.querySelectorAll('.form-content');
            
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            forms.forEach(form => form.classList.remove('active'));
            
            // Add active class to selected
            if (tab === 'login') {
                tabButtons[0].classList.add('active');
                document.getElementById('loginForm').classList.add('active');
            } else {
                tabButtons[1].classList.add('active');
                document.getElementById('signupForm').classList.add('active');
            }
            
            // Hide success message when switching tabs
            document.getElementById('successMessage').classList.remove('show');
        }

        // Handle login form submission
        function handleLogin(event) {
            event.preventDefault();
            
            const btn = document.getElementById('loginBtn');
            const email = document.getElementById('loginEmail').value;
            
            // Show loading state
            btn.disabled = true;
            btn.innerHTML = '<span class="loading"></span>Signing in...';
            
            // Simulate API call (replace with your actual login logic)
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = 'Sign In';
                
                // Show success message
                showSuccess('Login successful! Welcome back, ' + email);
                
                // Here you would typically redirect or handle the login success
                console.log('Login with:', email);
            }, 2000);
        }

        // Handle signup form submission
        function handleSignup(event) {
            event.preventDefault();
            
            const btn = document.getElementById('signupBtn');
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            
            // Show loading state
            btn.disabled = true;
            btn.innerHTML = '<span class="loading"></span>Creating account...';
            
            // Simulate API call (replace with your actual signup logic)
            setTimeout(() => {
                btn.disabled = false;
                btn.innerHTML = 'Create Account';
                
                // Show success message
                showSuccess('Account created successfully! Welcome, ' + name);
                
                // Here you would typically redirect or handle the signup success
                console.log('Signup with:', { name, email });
            }, 2000);
        }

        // Show success message
        function showSuccess(message) {
            const successMsg = document.getElementById('successMessage');
            successMsg.textContent = message;
            successMsg.classList.add('show');
            
            // Hide after 5 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }