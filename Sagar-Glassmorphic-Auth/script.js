function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Login successful! (demo)");
});
