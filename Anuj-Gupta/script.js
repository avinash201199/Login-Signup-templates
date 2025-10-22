const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Toggle logic
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

// Simple password confirmation (client-side check)
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password = signupForm.querySelectorAll("input[type='password']")[0].value;
  const confirm = signupForm.querySelectorAll("input[type='password']")[1].value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  alert("Signup successful! 🎉");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login successful! ✅");
});
