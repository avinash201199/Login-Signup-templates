document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const alertEl = document.getElementById('alert');

  const showError = (name, msg) => {
    const el = document.querySelector(`.error[data-for="${name}"]`);
    if (el) el.textContent = msg || '';
  };

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    showError('name', name ? '' : 'Please enter your name');
    showError('email', isEmail(email) ? '' : 'Please enter a valid email');
    showError('message', message ? '' : 'Please enter your feedback');

    if (!name || !isEmail(email) || !message) return;

    alertEl.hidden = false;
    alertEl.textContent = 'Sending feedback…';
    // simulate network
    setTimeout(() => {
      alertEl.textContent = 'Thanks — your feedback has been received.';
      form.reset();
    }, 900);
  });
});