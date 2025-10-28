 const loginTab = document.getElementById('tab-login');
    const signupTab = document.getElementById('tab-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginTab.onclick = () => {
      loginTab.classList.add('active');
      signupTab.classList.remove('active');
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    };

    signupTab.onclick = () => {
      signupTab.classList.add('active');
      loginTab.classList.remove('active');
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
    };

    // --- PASSWORD TOGGLE ---
    document.querySelectorAll('.toggle-pass').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        input.type = input.type === 'password' ? 'text' : 'password';
        btn.textContent = btn.textContent === 'Show' ? 'Hide' : 'Show';
      });
    });

    // --- DEMO FILL ---
    document.getElementById('demo-fill').onclick = () => {
      document.getElementById('login-username').value = 'prachi123';
      document.getElementById('login-password').value = 'password123';
    };