function togglePW(){
  var password = document.querySelector('#password');
  const eye = $('#eye');

  if (password.getAttribute('type') === 'password') {
    password.setAttribute('type', 'text');
    eye.html(feather.icons['eye-off'].toSvg());
  } else {
    password.setAttribute('type', 'password');
    eye.html(feather.icons['eye'].toSvg());
  }
}

// dark/light toggle
function changeTheme() {
  const themeToggle = document.querySelector('#toggle')
  const bodyClass = document.querySelector("#body")
  const backgroundImg = document.querySelector('.left-section')
  const mainTitle = document.querySelector('.mainTitle')
  const labelColor1 = document.querySelector('.labelColor1')
  const labelColor2 = document.querySelector('.labelColor2')
  const labelColor3 = document.querySelector('.labelColor3')
  
  if (themeToggle.checked) {
    bodyClass.className = "dark";
    backgroundImg.classList.add('dark');
    backgroundImg.classList.remove('light');
  } else {
    bodyClass.className = "light";
    backgroundImg.classList.remove('dark');
    backgroundImg.classList.add('light');
  }
}