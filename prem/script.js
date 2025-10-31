let signupBtn = document.getElementById("signupBtn");
let loginBtn = document.getElementById("loginBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

signupBtn.onclick = function() {
  nameField.style.display = "block";
  title.innerHTML = "Sign Up";
  signupBtn.classList.remove("disable");
  loginBtn.classList.add("disable");
};

loginBtn.onclick = function() {
  nameField.style.display = "none";
  title.innerHTML = "Login";
  signupBtn.classList.add("disable");
  loginBtn.classList.remove("disable");
};
