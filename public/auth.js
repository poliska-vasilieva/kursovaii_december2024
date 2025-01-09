document.getElementById('loginButton').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        email,
        password
    }

    fetch('/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status == 404) {
            alert("Пользователя не существует или данные введены неверно!")
            return
        }

        if (response.status == 400) {
            alert("Неверный пароль")
            return
        }

        if (response.status == 200) {
            window.location.href = '/profile';
        };
    })
})