 const showLoginBtn = document.getElementById('show-login');
        const showSignupBtn = document.getElementById('show-signup');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');


        showLoginBtn.addEventListener('click', () => {
      
            loginForm.classList.remove('form-hidden');
            loginForm.classList.add('form-visible');


            signupForm.classList.add('form-hidden');
            signupForm.classList.remove('form-visible');


            showLoginBtn.classList.add('bg-indigo-600', 'text-white');
            showLoginBtn.classList.remove('text-gray-400');

            showSignupBtn.classList.remove('bg-indigo-600', 'text-white');
            showSignupBtn.classList.add('text-gray-400');
        });


        showSignupBtn.addEventListener('click', () => {

            loginForm.classList.add('form-hidden');
            loginForm.classList.remove('form-visible');


            signupForm.classList.remove('form-hidden');
            signupForm.classList.add('form-visible');


            showSignupBtn.classList.add('bg-indigo-600', 'text-white');
            showSignupBtn.classList.remove('text-gray-400');

            showLoginBtn.classList.remove('bg-indigo-600', 'text-white');
            showLoginBtn.classList.add('text-gray-400');
        });
