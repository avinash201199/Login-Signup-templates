/* Tech script: particles background + form logic */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

// Elements
const loginTab = $('#login-tab');
const signupTab = $('#signup-tab');
const loginForm = $('#login-form');
const signupForm = $('#signup-form');
const successBox = $('#success-box');
const segTrack = document.querySelector('.seg-track');
const segIndicator = document.querySelector('.seg-indicator');
let segKnob = document.querySelector('.seg-knob');
if(segTrack && !segKnob){
  segKnob = document.createElement('div');
  segKnob.className = 'seg-knob';
  segTrack.appendChild(segKnob);
}
const revealEl = document.getElementById('reveal');

// Move indicator + knob with springy animation
function updateIndicator(){
  const active = document.querySelector('.seg-item.active');
  if(!active || !segTrack) return;
  const rect = active.getBoundingClientRect();
  const parentRect = segTrack.getBoundingClientRect();
  const offset = rect.left - parentRect.left;
  // flat indicator
  if(segIndicator) segIndicator.style.transform = `translateX(${offset}px)`;
  // circular knob animation using keyframe var
  if(segKnob){
    const centerX = offset + rect.width/2 - segKnob.offsetWidth/2;
    segKnob.style.setProperty('--tx', `${centerX}px`);
    // retrigger keyframe for spring
    segKnob.style.animation = 'none';
    void segKnob.offsetWidth;
    segKnob.style.animation = 'knob-spring 620ms both';
  }
}

// Show reveal circle at knob and swap forms after a short delay
function switchTo(tab){
  if(!revealEl || !segTrack) return;
  const activeBtn = document.querySelector(`.seg-item[data-mode="${tab}"]`);
  if(!activeBtn) return;
  const btnRect = activeBtn.getBoundingClientRect();
  const trackRect = segTrack.getBoundingClientRect();
  const formsEl = document.querySelector('.forms');
  const formsRect = formsEl.getBoundingClientRect();
  const centerX = btnRect.left + btnRect.width/2;
  const centerY = trackRect.top + trackRect.height/2;
  // position reveal element centered at knob relative to forms
  revealEl.style.width = `44px`;
  revealEl.style.height = `44px`;
  revealEl.style.left = `${centerX - formsRect.left - 22}px`;
  revealEl.style.top = `${centerY - formsRect.top - 22}px`;
  revealEl.classList.add('show');

  setTimeout(() => {
    if(tab === 'login'){
      loginTab.classList.add('active'); loginTab.setAttribute('aria-selected','true');
      signupTab.classList.remove('active'); signupTab.setAttribute('aria-selected','false');
      loginForm.classList.add('active'); signupForm.classList.remove('active');
    } else {
      signupTab.classList.add('active'); signupTab.setAttribute('aria-selected','true');
      loginTab.classList.remove('active'); loginTab.setAttribute('aria-selected','false');
      signupForm.classList.add('active'); loginForm.classList.remove('active');
    }
    updateIndicator();
    setTimeout(() => revealEl.classList.remove('show'), 420);
  }, 160);
  // move knob immediately
  if(tab === 'login') loginTab.classList.add('active'); else signupTab.classList.add('active');
}

loginTab.addEventListener('click', () => switchTo('login'));
signupTab.addEventListener('click', () => switchTo('signup'));

// Demo fill
const demoBtn = $('#demo-fill');
if(demoBtn) demoBtn.addEventListener('click', () => { $('#login-email').value = 'demo@example.com'; $('#login-pass').value = 'password123'; updateMeterFor($('#login-pass')); });

// Success
function showSuccess(){
  if(!successBox) return;
  successBox.classList.add('show');
  successBox.setAttribute('aria-hidden','false');
  setTimeout(() => {
    successBox.classList.remove('show');
    successBox.setAttribute('aria-hidden','true');
    switchTo('login');
  }, 1600);
}

if(loginForm) loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(loginForm);
  if(!data.get('email') || !data.get('password')) return;
  showSuccess();
});
if(signupForm) signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(signupForm);
  if(!data.get('fullname') || !data.get('email') || !data.get('password')) return;
  showSuccess();
});

/* Particles */
const canvas = document.getElementById('particles');
const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
let W = 0, H = 0, particles = [];
function resize(){ if(!canvas) return; W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
function rand(min, max){ return Math.random() * (max - min) + min }
function makeParticles(count){ particles = []; for(let i=0;i<count;i++) particles.push({ x: rand(0,W), y: rand(0,H), r: rand(0.6,2.8), vx: rand(-0.2,0.6), vy: rand(-0.15,0.15), hue: rand(180,260) }); }
function draw(){ if(!ctx) return; ctx.clearRect(0,0,W,H); for(const p of particles){ p.x += p.vx; p.y += p.vy; if(p.x > W+20) p.x = -20; if(p.x < -20) p.x = W+20; if(p.y > H+20) p.y = -20; if(p.y < -20) p.y = H+20; ctx.beginPath(); const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*6); g.addColorStop(0, `hsla(${p.hue},100%,65%,0.9)`); g.addColorStop(1, `hsla(${p.hue},80%,50%,0)`); ctx.fillStyle = g; ctx.arc(p.x,p.y,p.r*3,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(draw); }
function initParticles(){ if(!canvas || !ctx) return; resize(); const count = Math.max(24, Math.floor((W*H)/90000)); makeParticles(count); draw(); }
window.addEventListener('resize', () => { resize(); updateIndicator(); });
initParticles();

// placeholders for floating labels
$$('.field input').forEach(i => { if(!i.placeholder) i.placeholder = ' ' });
window.requestAnimationFrame(() => updateIndicator());

/* Password strength */
function scorePassword(pw){ let score = 0; if(!pw) return 0; if(pw.length >= 8) score += 2; else if(pw.length >=6) score += 1; if(/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 1; if(/\d/.test(pw)) score += 1; if(/[^A-Za-z0-9]/.test(pw)) score += 1; return Math.min(score,4); }

function updateMeterFor(inputEl){
  const id = inputEl.id;
  const meter = document.querySelector(`.pw-meter[data-target="${id}"]`);
  const label = document.querySelector(`.pw-label[data-target="${id}"]`);
  if(!meter) return;
  const bars = Array.from(meter.querySelectorAll('.pw-bar'));
  const val = inputEl.value || '';
  const s = scorePassword(val);
  bars.forEach((b, idx) => { b.classList.remove('fill-1','fill-2','fill-3','fill-4'); if(idx < s){ const cls = `fill-${Math.min(idx+1,4)}`; b.classList.add(cls); } });
  if(label){ label.classList.remove('weak','fair','good','strong'); if(!val){ label.textContent = '\u00A0'; } else if(s <= 1){ label.textContent = 'Weak'; label.classList.add('weak'); } else if(s === 2){ label.textContent = 'Fair'; label.classList.add('fair'); } else if(s === 3){ label.textContent = 'Good'; label.classList.add('good'); } else { label.textContent = 'Strong'; label.classList.add('strong'); } }
}

['signup-pass','login-pass'].forEach(id => {
  const el = document.getElementById(id);
  if(!el) return;
  el.addEventListener('input', () => updateMeterFor(el));
  el.addEventListener('focus', () => updateMeterFor(el));
  updateMeterFor(el);
});

window.addEventListener('load', () => updateIndicator());
