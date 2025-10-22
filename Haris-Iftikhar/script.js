document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('login-form')?.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Signed in (demo)');
  });

  document.getElementById('signup-form')?.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Account created (demo)');
  });
});
