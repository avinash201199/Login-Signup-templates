const pwd = document.getElementById('password');
const toggle = document.getElementById('pwdToggle');
const form = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');

toggle.addEventListener('click', () => {
  const isHidden = pwd.type === 'password';
  pwd.type = isHidden ? 'text' : 'password';
  toggle.textContent = isHidden ? 'Hide' : 'Show';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign in';
    alert('Signed in (demo) — implement backend to proceed.');
  }, 900);
});
