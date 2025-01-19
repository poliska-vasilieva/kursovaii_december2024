const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "public/text.sqlite",
});

const Account = sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

sequelize.sync()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.post('/register', async (request, response) => {
    const { username, email, password } = request.body;

    const existingAccount = await Account.findOne({ where: { email: email } });
    if (existingAccount) {
        return response.status(409).send('Account with this email already exists.');
    }

    await Account.create({ username, email, password });
    response.sendStatus(200);
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.post('/login', async (request, response) => { 
    const { email, password } = request.body; 
    let account = await Account.findOne({ where: { email } }); 
    
    if (!account) { 
        return response.sendStatus(404); 
    }

    if (account.password !== password) { 
        return response.sendStatus(400); 
    }

    return response.json({ 
        username: account.username, 
        email: account.email,
        password: account.password 
    });
});

app.post('/updateProfile', async (request, response) => {
    const { username, email, password, newPassword } = request.body; 
    const account = await Account.findOne({ where: { email } });

    if (!account) {
        
        return response.sendStatus(404);
    }

    // Проверяем, был ли изменен пароль
    if (newPassword) {
        // Проверяем текущий пароль
        if (account.password !== password) {
            return response.sendStatus(403); // Ошибка доступа, текущий пароль неверен
        }
        account.password = newPassword; // Обновляем пароль
    }

    account.username = username;
    account.email = email;
    await account.save();

    response.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 