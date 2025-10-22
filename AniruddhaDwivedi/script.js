document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  if (user === "" || pass === "") {
    alert("Please fill in all fields");
    return;
  }

  // Temporary login feedback
  alert(`Welcome, ${user}! (Demo Login Successful)`);
});