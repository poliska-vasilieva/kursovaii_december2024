document.getElementById('loginButton').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let data = {
        email,
        password
    }

    fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status == 404) {
            alert("Пользователь не найден")
            return
        }

        if (response.status == 400) {
            alert("Неверный пароль")
            return
        }

        alert('Вы зашли!')
    })
})

