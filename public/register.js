document.getElementById('registerButton').addEventListener('click', () => {
    let username = document.getElementById('username').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value; 

    const usernameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;
    if (!usernameRegex.test(username)) {
        alert("Имя должно состоять только из букв");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Пожалуйста, введите корректный адрес электронной почты.");
        return;
    }

    let data = {
        username,
        email,
        password
    };

    fetch('/register', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.status == 409) {
            alert("Аккаунт с такой почтой уже существует!");
            return;
        }
        if (response.status == 200) {
            alert("Успешно");
            // window.location.href = '/profile';
        }
    });
});
