const switchLink = document.getElementById("switchLink");
const title = document.getElementById("title");
const nameField = document.getElementById("nameField");
const confirmField = document.getElementById("confirmField");
const submitBtn = document.getElementById("submitBtn");

let isSignup = true;

switchLink.addEventListener("click", () => {
  isSignup = !isSignup;
  if (isSignup) {
    title.textContent = "Join Movie Journal 🎬";
    nameField.style.display = "block";
    confirmField.style.display = "block";
    submitBtn.textContent = "Sign Up";
    switchLink.textContent = "Login";
  } else {
    title.textContent = "Welcome Back 🍿";
    nameField.style.display = "none";
    confirmField.style.display = "none";
    submitBtn.textContent = "Login";
    switchLink.textContent = "Sign up";
  }
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const action = isSignup ? "Signup" : "Login";
  alert(`${action} successful! Enjoy your movie journal 🎥`);
});
