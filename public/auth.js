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

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        window.location.href = '/profile';
    } else {
        alert('Ошибка входа, проверьте свои данные.');
    }
});