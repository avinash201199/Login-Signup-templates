  // Elements
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const messages = document.getElementById('messages');

    // Utility: show message
    function showMessage(text, type='error', timeout = 4000){
      messages.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'msg ' + (type === 'success' ? 'success' : 'error');
      div.textContent = text;
      messages.appendChild(div);
      if(timeout) setTimeout(()=> { if(messages.contains(div)) messages.removeChild(div); }, timeout);
    }

    // Tab switching
    function setActiveTab(tab){
      if(tab === 'login'){
        tabLogin.classList.add('active');
        tabSignup.classList.remove('active');
        loginForm.style.display = '';
        signupForm.style.display = 'none';
      } else {
        tabLogin.classList.remove('active');
        tabSignup.classList.add('active');
        loginForm.style.display = 'none';
        signupForm.style.display = '';
      }
    }
    tabLogin.addEventListener('click', ()=> setActiveTab('login'));
    tabSignup.addEventListener('click', ()=> setActiveTab('signup'));

    // Toggle password visibility
    document.querySelectorAll('.toggle-pass').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const target = document.getElementById(btn.dataset.target);
        if(!target) return;
        if(target.type === 'password'){ target.type = 'text'; btn.textContent = 'Hide'; }
        else { target.type = 'password'; btn.textContent = 'Show'; }
      });
    });

    // Simple localStorage user store (for demo only)
    function getUsers(){
      try{
        return JSON.parse(localStorage.getItem('demo_users') || '{}');
      }catch(e){ return {}; }
    }
    function saveUsers(users){
      localStorage.setItem('demo_users', JSON.stringify(users));
    }

    // Signup handler
    signupForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const username = document.getElementById('signup-username').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;

      if(!username || !email || !password || !confirm){
        showMessage('Please fill all fields.');
        return;
      }
      if(password.length < 6){
        showMessage('Password must be at least 6 characters.');
        return;
      }
      if(password !== confirm){
        showMessage('Passwords do not match.');
        return;
      }

      const users = getUsers();
      if(users[username]){
        showMessage('Username already exists. Pick another.');
        return;
      }
      // store user - note: storing plain password is insecure; demo only
      users[username] = { email, password };
      saveUsers(users);

      showMessage('Account created! You can now log in.', 'success');
      signupForm.reset();
      setActiveTab('login');
    });

    // Login handler
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const username = document.getElementById('login-username').value.trim();
      const password = document.getElementById('login-password').value;
      if(!username || !password){
        showMessage('Please enter username and password.');
        return;
      }
      const users = getUsers();
      const user = users[username];
      if(!user || user.password !== password){
        showMessage('Invalid username or password.');
        return;
      }
      // "Logged in" -> demo behavior: show success message
      showMessage('Login successful! Welcome, ' + username + '.', 'success', 5000);
      loginForm.reset();
      // In a real app, redirect or set session cookie here
    });

    // Demo fill button (quickly fill login fields)
    document.getElementById('demo-fill').addEventListener('click', ()=>{
      const users = getUsers();
      const keys = Object.keys(users);
      if(keys.length === 0){
        // create a demo account
        const demo = { demo: { email: 'demo@example.com', password: 'demo123' } };
        saveUsers(demo);
        showMessage('Demo account created: username "demo" / password "demo123"', 'success', 3500);
      } else {
        showMessage('Pick an existing demo user to log in. Try username "demo" / "demo123" if created.');
      }
      document.getElementById('login-username').value = 'demo';
      document.getElementById('login-password').value = 'demo123';
    });

    // Clear demo storage
    document.getElementById('clear-storage').addEventListener('click', ()=>{
      localStorage.removeItem('demo_users');
      showMessage('Demo users cleared.', 'success', 2500);
    });

    // Accessibility: allow Enter on tab buttons
    [tabLogin, tabSignup].forEach(t=> t.addEventListener('keydown', (e)=> {
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); t.click(); }
    }));