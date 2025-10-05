document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    btn.textContent = "Creating...";
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = "Created account. Welcome to Acme Inc.";
        btn.classList.add("bg-[oklch(12.9%_0.042_264.695)]");
    }, 1500);
});
