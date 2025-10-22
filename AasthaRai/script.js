const loginForm = document.querySelector(".login");
const signupForm = document.querySelector(".signup");
const signupLink = document.querySelector("#signup-link");
const loginLink = document.querySelector("#login-link");

signupLink.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});
