 (function() {
      const form = document.getElementById('loginForm');
      const submitBtn = document.getElementById('submitBtn');
      const email = document.getElementById('email');
      const password = document.getElementById('password');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');
      const formMeta = document.getElementById('formMeta');
      const metaMsg = document.getElementById('metaMsg');

      // Show/Hide password
      const toggle = document.getElementById('togglePw');
      const eyeOpen = document.getElementById('eyeOpen');
      const eyeClosed = document.getElementById('eyeClosed');
      toggle.addEventListener('click', () => {
        const shown = password.type === 'text';
        password.type = shown ? 'password' : 'text';
        toggle.setAttribute('aria-pressed', String(!shown));
        toggle.setAttribute('aria-label', shown ? 'Show password' : 'Hide password');
        eyeOpen.style.display = shown ? '' : 'none';
        eyeClosed.style.display = shown ? 'none' : '';
      });

      // Basic real-time validation feedback
      const setError = (el, msg) => {
        el.textContent = msg || '';
      };

      email.addEventListener('input', () => {
        if (email.validity.valid) setError(emailError, '');
      });

      password.addEventListener('input', () => {
        if (password.validity.valid) setError(passwordError, '');
      });

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let ok = true;

        if (!email.value.trim()) {
          setError(emailError, 'Please enter your email.');
          ok = false;
        } else if (!email.checkValidity()) {
          setError(emailError, 'Enter a valid email address.');
          ok = false;
        } else setError(emailError, '');

        if (!password.value.trim()) {
          setError(passwordError, 'Please enter your password.');
          ok = false;
        } else if (password.value.length < 6) {
          setError(passwordError, 'Password must be at least 6 characters.');
          ok = false;
        } else setError(passwordError, '');

        if (!ok) return;

        submitBtn.disabled = true;
        const original = submitBtn.textContent;
        submitBtn.textContent = 'Signing in…';

        // Simulate async sign-in. Replace with your actual fetch("/api/login", { ... })
        try {
          await new Promise(r => setTimeout(r, 900));
          formMeta.hidden = false;
          metaMsg.textContent = 'Signed in successfully. Redirecting…';
          // window.location.href = '/dashboard';
        } catch (err) {
          formMeta.hidden = false;
          metaMsg.textContent = 'Something went wrong. Please try again.';
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
        }
      });
    })();
