require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileupload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const PORT = process.env.PORT || 5000;


//инициализация приложения
const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

//создание корс-запросов для работы с браузером
app.use(cors())
//для работы с json форматом
app.use(express.json())
//для открытия файлов по строке запроса
app.use(express.static(path.resolve(__dirname, 'static')))
//для работы с файлами
app.use(fileupload({}))
//для работы с маршрутами
app.use('/api', router)


//обработка ошибок, последний middleware
app.use(errorHandler)

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