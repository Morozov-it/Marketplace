const jwt = require("jsonwebtoken");

//на эекспорт функция для проверки токена и сохранении из него данных в запросе
module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] //Bearer token
        if (!token) {
            res.status(401).json({message: "User is not authorized"})
        }

        //расшифровка токена чтобы брать из него id пользователя
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        //добавление id пользователя к полю user в теле запроса
        req.user = decoded
        //следующая функция
        next()
    } catch (e) {
        res.status(401).json({message: "Authorization error "})
    }
}