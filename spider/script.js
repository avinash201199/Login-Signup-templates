const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// Toggle between login and signup
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = field.nextElementSibling;
    
    if (field.type === "password") {
        field.type = "text";
        button.textContent = "🙈";
    } else {
        field.type = "password";
        button.textContent = "👁️";
    }
}

// Login form validation
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    if (email && password) {
        showMessage("Login successful! Welcome back.", "success");
        setTimeout(() => {
            loginForm.reset();
        }, 1500);
    } else {
        showMessage("Please fill in all fields", "error");
    }
});

// Signup form validation
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage("Please enter a valid email address", "error");
        return;
    }
    
    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long", "error");
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage("Passwords do not match!", "error");
        return;
    }
    
    if (username && email && password && confirmPassword) {
        showMessage("Account created successfully! Please login.", "success");
        setTimeout(() => {
            signupForm.reset();
            container.classList.remove("sign-up-mode");
        }, 2000);
    }
});

// Show message function
function showMessage(message, type) {
    const existingMessage = document.querySelector(".message-box");
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageBox = document.createElement("div");
    messageBox.className = `message-box ${type}`;
    messageBox.textContent = message;
    
    messageBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.5s ease-in-out;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        background: ${type === "success" ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" : "linear-gradient(135deg, #eb3349 0%, #f45c43 100%)"};
    `;
    
    document.body.appendChild(messageBox);
    
    setTimeout(() => {
        messageBox.style.animation = "slideOut 0.5s ease-in-out";
        setTimeout(() => {
            messageBox.remove();
        }, 500);
    }, 3000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
