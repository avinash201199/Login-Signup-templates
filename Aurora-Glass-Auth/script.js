// Tab logic
const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const panelLogin = document.getElementById("panel-login");
const panelSignup = document.getElementById("panel-signup");

function activate(tab, panel){
  document.querySelectorAll('.tab').forEach(t=>{
    t.classList.toggle('active', t===tab);
    t.setAttribute('aria-selected', t===tab ? 'true':'false');
  });
  document.querySelectorAll('.panel').forEach(p=>{
    p.classList.toggle('active', p===panel);
  });
}

tabLogin.addEventListener('click', ()=> activate(tabLogin, panelLogin));
tabSignup.addEventListener('click', ()=> activate(tabSignup, panelSignup));

// password toggle
function setupToggle(btnId, inputId){
  const btn = document.getElementById(btnId);
  const input = document.getElementById(inputId);
  btn.addEventListener('click', ()=>{
    const isPwd = input.type === 'password';
    input.type = isPwd ? 'text' : 'password';
    btn.textContent = isPwd ? 'Hide' : 'Show';
  })
}

setupToggle('login-toggle','login-password');
setupToggle('signup-toggle','signup-password');

// very light client-side validation demo
document.getElementById('panel-login').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('login-email');
  const pwd = document.getElementById('login-password');
  if(!email.value || !pwd.value){
    alert('Please fill email and password');
    return;
  }
  alert('Logged in (demo)');
});

document.getElementById('panel-signup').addEventListener('submit', (e)=>{
  e.preventDefault();
  const email = document.getElementById('signup-email');
  const pwd = document.getElementById('signup-password');
  if(!email.value || !pwd.value || pwd.value.length < 8){
    alert('Please provide a valid email and password (min 8 chars)');
    return;
  }
  alert('Account created (demo)');
});
