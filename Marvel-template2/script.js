document.addEventListener('DOMContentLoaded', () => {

    // --- Password Visibility Toggle ---
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle eye icon
            if (type === 'password') {
                togglePassword.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
            } else {
                togglePassword.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
            }
        });
    }

    // --- Animated Grid ---
    const gridContainer = document.getElementById('grid-container');
    if(gridContainer) {
        const gridSize = 9;
        const gridItems = [];

        // Create grid items
        for (let i = 0; i < gridSize; i++) {
            const item = document.createElement('div');
            item.classList.add('grid-item');
            gridContainer.appendChild(item);
            gridItems.push(item);
        }

        // Animate grid items
        const animateGrid = () => {
            const randomIndex = Math.floor(Math.random() * gridSize);
            const randomItem = gridItems[randomIndex];

            randomItem.style.opacity = '1';
            randomItem.style.transform = 'scale(1.05)';

            setTimeout(() => {
                randomItem.style.opacity = '0.3';
                randomItem.style.transform = 'scale(1)';
            }, 500); // Animation duration
        };
        
        setInterval(animateGrid, 300); // Interval between animations
    }
});
