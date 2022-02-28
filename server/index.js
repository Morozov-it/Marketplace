require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
//const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index')

const PORT = process.env.PORT || 5000;


//инициализация приложения
const app = express();

//создание корс-запросов для работы с браузером
app.use(cors())
//для работы с json форматом
app.use(express.json())
//для работы с маршрутами
app.use('/api', router)



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









//стартовая проверка работы приложения
// app.get('/', (req, res) => {
//     res.status(200).json({message: 'Working'})
// })