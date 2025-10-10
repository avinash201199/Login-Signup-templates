  // Import Firebase SDKs from CDN (v12 modular)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
  import { firebaseConfig } from "./config.js";

  // Initialize Firebase and Auth
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  const form = document.getElementById("auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorText = document.getElementById("error-text");
  const googleBtn = document.getElementById("google-btn");
  const phoneBtn = document.getElementById("phone-btn");
  const recaptchaContainerId = "recaptcha-container";

  function showError(message) {
    errorText.textContent = message || "";
    errorText.hidden = !message;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showError("");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!/\S+@\S+\.\S+/.test(email)) {
      showError("Please enter a valid email address.");
      emailInput.focus();
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      passwordInput.focus();
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created for " + email + "!");
      form.reset();
    } catch (err) {
      showError(err.message || "Registration failed.");
    }
  });

  // Provider sign-in handlers
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      showError("");
      try {
        await signInWithPopup(auth, googleProvider);
        alert("Signed in with Google");
      } catch (err) {
        showError(err.message || "Google sign-in failed.");
      }
    });
  }

  if (phoneBtn) {
    phoneBtn.addEventListener("click", async () => {
      showError("");
      try {
        // Initialize invisible reCAPTCHA once
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
            size: "invisible"
          });
        }

        const phoneNumber = prompt("Enter phone number (e.g. +15551234567)");
        if (!phoneNumber) return;

        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
        const code = prompt("Enter the verification code you received");
        if (!code) return;
        await confirmationResult.confirm(code);
        alert("Signed in with phone number");
      } catch (err) {
        showError(err.message || "Phone sign-in failed.");
      }
    });
  }