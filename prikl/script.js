document.addEventListener("DOMContentLoaded", () => {

    const showLoginBtn = document.getElementById("show-login-btn");
    const showSignupBtn = document.getElementById("show-signup-btn");
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    const body = document.body;

    showSignupBtn.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        signupForm.classList.remove("hidden");
        
        showSignupBtn.classList.add("active");
        showLoginBtn.classList.remove("active");
    });

    showLoginBtn.addEventListener("click", () => {
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");

        showLoginBtn.classList.add("active");
        showSignupBtn.classList.remove("active");
    });

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Login form submitted");
        alert("Login functionality is not implemented in this demo.");
    });

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Sign up form submitted");
        alert("Sign-up functionality is not implemented in this demo.");
    });
});