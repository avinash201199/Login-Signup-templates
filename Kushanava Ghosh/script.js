const card = document.querySelector('.card');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

showRegister.addEventListener('click', () => {
  card.style.transform = 'rotateY(180deg)';
});

showLogin.addEventListener('click', () => {
  card.style.transform = 'rotateY(0deg)';
});

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Login form submitted!');
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Register form submitted!');
});

// Social login button clicks
document.querySelectorAll('.social-icons button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`Clicked ${btn.className.replace('google','Google').replace('outlook','Outlook').replace('github','GitHub')} login!`);
  });
});
