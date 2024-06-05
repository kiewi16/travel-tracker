let loginButton = document.querySelector('#login-button')
let mainSection = document.querySelector('.main-wrapper')
let formSection = document.querySelector('.login-form-wrapper')

loginButton.addEventListener('click', authenticateLogin)

function authenticateLogin(event) {
    event.preventDefault()

    let username = document.querySelector('#username').value;
    let password = document.querySelector('#password').value;

    if (username === "admin" && password === "password") {
        console.log("test")
        formSection.classList.add('hidden')
        mainSection.style.display = 'block'     
    } else {
        alert("Invalid username or password");
    }
}