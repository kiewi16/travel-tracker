let loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', authenticateLogin)

function authenticateLogin(event) {
    // event.preventDefault()

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "admin" && password === "password") {
        console.log("test")
        window.location.href = "../dist/index.html";
    } else {
        alert("Invalid username or password");
    }
}