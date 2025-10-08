const card = document.getElementById("auth-card");

// Flip to signup/login
document.getElementById("flip-to-signup").addEventListener("click", (e) => {
  e.preventDefault();
  card.classList.add("flipped");
});

document.getElementById("flip-to-login").addEventListener("click", (e) => {
  e.preventDefault();
  card.classList.remove("flipped");
});

// Show/Hide password using Font Awesome icons
document.querySelectorAll(".toggle-password").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.getAttribute("data-target");
    const input = document.getElementById(targetId);

    // Toggle input type
    input.type = input.type === "password" ? "text" : "password";

    // Toggle Font Awesome eye icon
    toggle.classList.toggle("fa-eye");
    toggle.classList.toggle("fa-eye-slash");
  });
});

// Helper: remove error when field is valid
function handleFieldBlur(input, errorId, validator, errorMessage) {
  input.addEventListener("blur", () => {
    const value = input.value.trim();
    const errorElement = document.getElementById(errorId);
    if (!value) {
      return;
    } else if (!validator(value)) {
      errorElement.textContent = errorMessage;
    } else {
      errorElement.textContent = "";
    }
  });
}

// Validators
const isNotEmpty = (v) => v.length > 0;
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v) => v.length >= 6;

// Remember Me functionality
const rememberMe = document.getElementById("remember-me");
const loginEmail = document.getElementById("login-email");

window.addEventListener("DOMContentLoaded", () => {
  const rememberedEmail = localStorage.getItem("rememberedEmail");
  if (rememberedEmail) {
    loginEmail.value = rememberedEmail;
    rememberMe.checked = true;
  }
});

// Add blur handlers to remove errors dynamically
handleFieldBlur(
  loginEmail,
  "login-email-error",
  isValidEmail,
  "Please enter a valid email."
);
handleFieldBlur(
  document.getElementById("login-password"),
  "login-password-error",
  isValidPassword,
  "Password must be at least 6 characters."
);
handleFieldBlur(
  document.getElementById("signup-name"),
  "signup-name-error",
  isNotEmpty,
  "Please enter your full name."
);
handleFieldBlur(
  document.getElementById("signup-email"),
  "signup-email-error",
  isValidEmail,
  "Please enter a valid email."
);
handleFieldBlur(
  document.getElementById("signup-password"),
  "signup-password-error",
  isValidPassword,
  "Password must be at least 6 characters."
);

// Login form validation
document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Reset previous errors
  document.getElementById("login-email-error").textContent = "";
  document.getElementById("login-password-error").textContent = "";

  let valid = true;

  if (!isValidEmail(email)) {
    document.getElementById("login-email-error").textContent =
      "Please enter a valid email.";
    valid = false;
  }

  if (!isValidPassword(password)) {
    document.getElementById("login-password-error").textContent =
      "Password must be at least 6 characters.";
    valid = false;
  }

  if (!valid) return;

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (!users[email] || users[email].password !== password) {
    alert("Invalid email or password.");
    return;
  }

  if (rememberMe.checked) localStorage.setItem("rememberedEmail", email);
  else localStorage.removeItem("rememberedEmail");

  alert(`Login successful! Welcome back, ${users[email].name}`);
});

// Signup form validation
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value.trim();

  // Reset previous errors
  document.getElementById("signup-name-error").textContent = "";
  document.getElementById("signup-email-error").textContent = "";
  document.getElementById("signup-password-error").textContent = "";

  let valid = true;

  if (!isNotEmpty(name)) {
    document.getElementById("signup-name-error").textContent =
      "Please enter your full name.";
    valid = false;
  }

  if (!isValidEmail(email)) {
    document.getElementById("signup-email-error").textContent =
      "Please enter a valid email.";
    valid = false;
  }

  if (!isValidPassword(password)) {
    document.getElementById("signup-password-error").textContent =
      "Password must be at least 6 characters.";
    valid = false;
  }

  if (!valid) return;
  // Save credentials in localStorage
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[email]) {
    document.getElementById("signup-email-error").textContent =
      "Email already exists.";
    return;
  }

  users[email] = { name, password };
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful! You can now login.");
  document.getElementById("signup-form").reset();
  card.classList.remove("flipped");
});
