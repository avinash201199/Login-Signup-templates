const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginTab.addEventListener('click', () => {
  loginForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
  loginTab.classList.add('tab-active');
  signupTab.classList.remove('tab-active');
});

signupTab.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  loginForm.classList.add('hidden');
  signupTab.classList.add('tab-active');
  loginTab.classList.remove('tab-active');
});
