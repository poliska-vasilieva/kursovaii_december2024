document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (username) {
        document.getElementById('username').value = username;
    }
    if (email) {
        document.getElementById('email').value = email;
    }
});

document.getElementById('saveButton').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('currentPassword').value; 
    const newPassword = document.getElementById('newPassword').value; 

    const response = await fetch('/updateProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password: currentPassword, newPassword })
    });

    if (response.ok) {
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        alert('Данные успешно обновлены');
    } else {
        alert('Ошибка при обновлении данных');
    }
});

document.getElementById('ButtonLogOut').addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/login'; 
});