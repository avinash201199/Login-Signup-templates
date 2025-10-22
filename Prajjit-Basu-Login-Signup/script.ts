// Simple form validation
document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();
    alert('Login form submitted! Email: ' + document.getElementById('loginEmail').value);
});

document.getElementById('signupForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const pic = document.getElementById('signupPic').files[0] ? document.getElementById('signupPic').files[0].name : 'No picture';
    alert(`Signup form submitted!\nName: ${name}\nEmail: ${email}\nProfile Picture: ${pic}`);
});
