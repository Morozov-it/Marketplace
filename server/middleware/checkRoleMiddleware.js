const jwt = require("jsonwebtoken");

//на экспорт функция для проверки токена и сохранении из него данных в запросе
module.exports.max = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") next();
        try {
            const token = req.headers.authorization.split(' ')[1] //Bearer token
            if (!token) {
                return res.status(401).json({message: "User is not authorized"})
            }

            //расшифровка токена чтобы брать из него id & role пользователя
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            //проверка роли пользователя
            if (decoded.role !== role) {
                return res.status(403).json({message: "You have no access"})
            }

            //добавление поля user в запрос
            req.user = decoded
            //следующая функция
            next()
        } catch (e) {
            res.status(401).json({message: "Authorization error "})
        }
    }
}

//только после проверки авторизации
module.exports.min = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") next();
        try {
            //проверка роли пользователя
            if (req.user.role !== role) {
                return res.status(403).json({message: "You have no access"})
            }
            next()
        }
        catch (e) {
            res.status(401).json({message: "Authorization error "})
        }
    }
}