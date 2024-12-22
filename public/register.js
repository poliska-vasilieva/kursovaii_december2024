document.getElementById('registerButton').addEventListener('click', () => {
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        username,
        email, 
        password
    }
    
    fetch('http://localhost:3000/register', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => console.log(response))
})