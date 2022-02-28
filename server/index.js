require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;


//запуск приложения
const app = express();

const start = async () => {
    try {
        //запуск авторизации к бд
        await sequelize.authenticate();
        //сверка состояния данных со схема для базы данных
        await sequelize.sync()
        //запуск приложения
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e)
    }
};
start();
