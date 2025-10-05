const container = document.getElementById('container');
const reisterBtn = document.getElementById('register');
const loginButton = document.getElementById('login');

// Function to validate email
reisterBtn.addEventListener('click', () => {
    container.classList.add('active');
})
loginButton.addEventListener('click', () => {   
    container.classList.remove('active');
})