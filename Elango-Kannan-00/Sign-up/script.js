// Handle Signup Submit
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !phone || !password) {
    alert("Please fill in all fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  alert(`Welcome, ${name}! Your account has been created successfully.`);

  // Redirect to login page after signup
  window.location.href = "../login/index.html";
});
