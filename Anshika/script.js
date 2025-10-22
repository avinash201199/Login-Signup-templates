const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

loginTab.addEventListener("click", () => {
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
});

signupTab.addEventListener("click", () => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
});

loginForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("login-msg").textContent = "Login Successful (Demo)";
    loginForm.reset();
});

signupForm.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("signup-msg").textContent = "Account Created (Demo)";
    signupForm.reset();
});
