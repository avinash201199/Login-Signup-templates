let currentColor = 'cyan';

const colors = {
  cyan: 'rgba(0, 255, 255, 0.9)',
  gold: 'rgba(255, 215, 0, 0.9)'
};


document.addEventListener('mousemove', (e) => {
  const trail = document.createElement('div');
  trail.classList.add('trail');
  trail.style.left = `${e.pageX}px`;
  trail.style.top = `${e.pageY}px`;
  trail.style.background = colors[currentColor];
  document.body.appendChild(trail);
  setTimeout(() => trail.remove(), 800);
});


const toggle = document.getElementById('colorToggle');
toggle.addEventListener('click', () => {
  currentColor = currentColor === 'cyan' ? 'gold' : 'cyan';
  toggle.style.color = currentColor === 'cyan' ? '#00ffff' : '#ffd700';
  toggle.style.textShadow =
    currentColor === 'cyan'
      ? '0 0 10px #00ffff, 0 0 25px #00ffff'
      : '0 0 10px #ffd700, 0 0 25px #ffd700';
});


const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  loginButton.classList.add('active');
  loginButton.textContent = "Launching... 🚀";

  setTimeout(() => {
    loginButton.textContent = "Welcome!";
    loginButton.style.background = 'linear-gradient(90deg, #00ffcc, #00ffff)';
  }, 1500);

  setTimeout(() => {
    loginButton.classList.remove('active');
    loginButton.textContent = "Login";
  }, 3000);
});


const canvas = document.getElementById('shootingStars');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];

function createShootingStar() {
  stars.push({
    x: Math.random() * canvas.width,
    y: 0,
    length: Math.random() * 80 + 20,
    speed: Math.random() * 8 + 4,
    opacity: Math.random()
  });
}

function drawShootingStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let s of stars) {
    ctx.beginPath();
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.length, s.y + s.length);
    grad.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
    grad.addColorStop(1, 'transparent');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.length, s.y + s.length);
    ctx.stroke();
    s.x += -s.speed;
    s.y += s.speed;
  }
  for (let i = 0; i < stars.length; i++) {
    if (stars[i].x < 0 || stars[i].y > canvas.height) stars.splice(i, 1);
  }
}

function animateStars() {
  drawShootingStars();
  requestAnimationFrame(animateStars);
}

setInterval(createShootingStar, 2500);
animateStars();
