function switchTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const tabs = document.querySelectorAll(".tab");
  const indicator = document.getElementById("tabIndicator");

  tabs.forEach((t) => t.classList.remove("active"));

  if (tab === "login") {
    tabs[0].classList.add("active");
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    indicator.style.left = "0";
    indicator.style.width = "50%";
  } else {
    tabs[1].classList.add("active");
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    indicator.style.left = "50%";
    indicator.style.width = "50%";
  }
}

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === "password" ? "text" : "password";
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  alert("Login successful! Email: " + email);
}

function handleSignup(e) {
  e.preventDefault();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const name = document.getElementById("signupName").value;
  alert("Signup successful! Welcome, " + name + "!");
}

// Initialize tab indicator
window.onload = function () {
  const indicator = document.getElementById("tabIndicator");
  indicator.style.left = "0";
  indicator.style.width = "50%";
};
