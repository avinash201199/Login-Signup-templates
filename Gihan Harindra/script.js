/**
 * Toggles visibility between the Login and Sign Up forms.
 * @param {string} formId - 'login' or 'signup'
 */
function switchForm(formId) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const statusMessage = document.getElementById('status-message');

    if (formId === 'login') {
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        statusMessage.textContent = 'Awaiting login credentials...';
    } else if (formId === 'signup') {
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        statusMessage.textContent = 'Awaiting new user data entry...';
    }
}

// Optional: Add a simple submit handler to prevent page reload
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.hacker-form');
    const statusMessage = document.getElementById('status-message');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formType = form.id.includes('login') ? 'Login' : 'Registration';
            
            // Simulating a successful transaction
            statusMessage.textContent = `Attempting ${formType}... Connection established.`;
            
            // You would replace this with actual AJAX/fetch calls in a real application
            console.log(`${formType} submitted!`);
        });
    });

    // --- MATRIX BACKGROUND LOGIC ---
    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');

    // Set canvas size to full window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to use (Hiragana, Katakana, numbers, symbols)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/`~';
    // const chars = 'アァカサタナハマヤラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポヴッン'; // Japanese characters for more classic Matrix look

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Each drop is a y-coordinate. Initialize with random y-positions
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        // Darken the background slightly over time to create the fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            // Get a random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Send the drop back to the top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment y-coordinate for the drop
            drops[i]++;
        }
    }

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Re-initialize drops for new column count
        const newColumns = canvas.width / fontSize;
        drops.length = 0; // Clear existing drops
        for (let i = 0; i < newColumns; i++) {
            drops[i] = Math.random() * (canvas.height / fontSize); // Random start to avoid all starting at once
        }
    });

    // Run the animation
    setInterval(drawMatrix, 33); // Approximately 30 frames per second
});