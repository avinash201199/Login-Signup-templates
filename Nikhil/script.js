// Toggle between Login and Signup forms
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

// Example form handlers
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("login-msg").textContent = "✅ Logged in successfully!";
  setTimeout(() => {
    document.getElementById("login-msg").textContent = "";
  }, 3000);
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("signup-msg").textContent = "🎉 Account created successfully!";
  setTimeout(() => {
    document.getElementById("signup-msg").textContent = "";
  }, 3000);
});
