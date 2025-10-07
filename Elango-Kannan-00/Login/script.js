// Handle Login Submit
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields.");
  } else {
    alert(`Welcome back, ${email}! You have logged in successfully.`);
  }
});

// Redirect to Signup Page
function redirectToSignup() {
  window.location.href = "../Sign-up/index.html";
}
