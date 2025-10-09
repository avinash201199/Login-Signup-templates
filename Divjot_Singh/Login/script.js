// script.js

document.addEventListener("DOMContentLoaded", () => {
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");


  loginTab.addEventListener("click", () => {
    if (loginTab.classList.contains("tab-active")) return; // prevent re-click animation

    loginTab.classList.add("tab-active");
    signupTab.classList.remove("tab-active");


    signupForm.classList.add("slide-out");
    setTimeout(() => {
      signupForm.classList.add("hidden");
      signupForm.classList.remove("slide-out");
      loginForm.classList.remove("hidden");
      loginForm.classList.add("slide-in");
      setTimeout(() => loginForm.classList.remove("slide-in"), 400);
    }, 250);
  });

  // Function to show signup form with animation
  signupTab.addEventListener("click", () => {
    if (signupTab.classList.contains("tab-active")) return;

    signupTab.classList.add("tab-active");
    loginTab.classList.remove("tab-active");

    loginForm.classList.add("slide-out");
    setTimeout(() => {
      loginForm.classList.add("hidden");
      loginForm.classList.remove("slide-out");
      signupForm.classList.remove("hidden");
      signupForm.classList.add("slide-in");
      setTimeout(() => signupForm.classList.remove("slide-in"), 400);
    }, 250);
  });

  // Optional ripple effect for buttons
  document.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${e.clientX - btn.offsetLeft}px`;
      ripple.style.top = `${e.clientY - btn.offsetTop}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
});
