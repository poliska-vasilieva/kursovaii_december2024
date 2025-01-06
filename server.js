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
    await Account.create({ username, email, password })
    response.sendStatus(200)
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

app.post('/login', async (request, response) => {
    const { email, password } = request.body;
    let account = await Account.findOne({ where: { email: email } })
    if (account == undefined || account == null) {
        response.sendStatus(404)
        return
    }

    if (account.password != password) {
        response.sendStatus(400)
        return
    }

    response.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});