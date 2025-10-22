
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    return isEmailValid;
};

const validatePassword = (password) => {
    const isPasswordValid = password.length >= 6;

    return isPasswordValid;
};

const displaySnackBar = (message) => {
    const snackbar = document.getElementById("snackbar")

    const textNode = document.createTextNode(message)
    snackbar.append(textNode)

    const lineBreak = document.createElement("br");
    snackbar.appendChild(lineBreak);

    snackbar.style.display = "flex"

    setTimeout(() => {
        snackbar.style.display = "none"
        snackbar.innerHTML = ""
    }, 3000);
}

const login = () => {

    const loginButton = document.getElementById("login")

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();

        let isValid = true;

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (!validateEmail(email)) {
            isValid = false;
            displaySnackBar("Email is incorrect format")
        }

        if (!validatePassword(password)) {
            isValid = false;
            displaySnackBar("Password must be 6 characters long")
        }

        if (isValid) {
            displaySnackBar("Login successful")
        }
    })

}

const signup = () => {

    const signupButton = document.getElementById("signup")

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();

        let isValid = true;

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        if (!validateEmail(email)) {
            isValid = false;
            displaySnackBar("Email is incorrect format")
        }

        if (!validatePassword(password)) {
            isValid = false;
            displaySnackBar("Password must be 6 characters long")
        }

        if (isValid) {
            displaySnackBar("Login successful")
        }
    })
}


function main() {

    const arr = window.location.pathname.split("/")
    const pathname = arr[arr.length-1]

    if (pathname === "index.html") {
        login()
    }
    else {
        signup()
    }
}


main() 