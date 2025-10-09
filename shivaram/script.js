const signUpButton = document.getElementById('signUp');
const logInButton = document.getElementById('logIn');
const container = document.getElementById('container');

// Switch to Signup View
signUpButton.addEventListener('click', () => {
    container.classList.add("active");
});

// Switch to Login View
logInButton.addEventListener('click', () => {
    container.classList.remove("active");
});
