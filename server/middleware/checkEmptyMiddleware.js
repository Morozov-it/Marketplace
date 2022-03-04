const ApiError = require('../error/apiError');

//на экспорт функция для проверки
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    //проверка наличия данных в запросе
    if (!req.body.name) {
        //получение ошибки и выход из функции
        return next(ApiError.badRequest("Data is'not received"))
    }
    
    //следующая функция
    next()
}