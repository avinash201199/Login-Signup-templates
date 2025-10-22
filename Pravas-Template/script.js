const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');
const container = document.querySelector('.container');

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.classList.remove('active');
    signupForm.classList.add('active');
    createParticles(e);
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.classList.remove('active');
    loginForm.classList.add('active');
    createParticles(e);
});

// Particle effect on button click
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.closest('.btn')) {
            createParticles(e);
        }
    });
});

function createParticles(e) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Prevent form submission for demo
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! (This is a demo)');
    });
});

// Mouse move effect on glass container
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    container.style.transform = `perspective(1000px) rotateY(${percentX * 5}deg) rotateX(${-percentY * 5}deg)`;
});

container.addEventListener('mouseleave', () => {
    container.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
});
