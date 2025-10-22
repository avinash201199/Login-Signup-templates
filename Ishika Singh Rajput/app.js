document.addEventListener('DOMContentLoaded', () => {
    const templateContainer = document.getElementById('templateContainer');
    const formToggle = document.getElementById('formToggle');
    const formTitle = document.getElementById('formTitle');
    const switchText = document.getElementById('switchText');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginCta = document.getElementById('loginCta');
    const signupCta = document.getElementById('signupCta');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const welcomeSubtitle = document.getElementById('welcomeSubtitle');

    const toggleForms = (isSignup) => {
        if (isSignup) {
            // Switch to SIGNUP mode
            templateContainer.classList.add('active-signup');
            formTitle.textContent = 'SIGNUP';
            switchText.textContent = 'LOGIN';
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            welcomeTitle.innerHTML = 'JOIN <br> OUR PLATFORM';
            welcomeSubtitle.textContent = 'Create your new account.';
            formToggle.checked = true;

        } else {
            // Switch to LOGIN mode
            templateContainer.classList.remove('active-signup');
            formTitle.textContent = 'LOGIN';
            switchText.textContent = 'SIGNUP';
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            welcomeTitle.innerHTML = 'WELCOME TO <br> OUR PLATFORM';
            welcomeSubtitle.textContent = 'Unlock your potential.';
            formToggle.checked = false;
        }
    };

    // 1. Handle the toggle switch
    formToggle.addEventListener('change', (e) => {
        toggleForms(e.target.checked);
    });

    // 2. Handle the text click next to the switch (SIGNUP/LOGIN)
    switchText.addEventListener('click', () => {
        formToggle.checked = !formToggle.checked; // Toggle the state
        toggleForms(formToggle.checked);
    });
    
    // 3. Handle the CTA buttons in the abstract panel
    loginCta.addEventListener('click', () => {
        toggleForms(false); // Force to Login
    });

    signupCta.addEventListener('click', () => {
        toggleForms(true); // Force to Signup
    });

    // Initialize the state (should be Login by default)
    toggleForms(false);
});