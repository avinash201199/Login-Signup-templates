
// ====== TOGGLE FORMS ======
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignUp = document.getElementById("showSignUp");
const showLogin = document.getElementById("showLogin");

showSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
});

showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
});

// ====== SIMPLE FORM HANDLERS ======
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    alert(`Logged in as ${email}`);
});

signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    alert(`Welcome ${name}! Your account for ${email} has been created.`);
    signupForm.reset();
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
});
