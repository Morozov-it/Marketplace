const ApiError = require("../error/apiError");
const bcrypt = require('bcrypt');
const {User, Basket} = require('../models/models');
const jwt = require("jsonwebtoken");

const generateJWT = (id, email, role) => {
    return jwt.sign(
        { id, email, role }, //payload
        process.env.SECRET_KEY, //key
        { expiresIn: '24h' } //options
    );
}

class UserController {
    async registration(req, res) {
        //получение рег.данных из тела запроса
        const { email, password, role } = req.body;
        
        //проверка ввода данных
        if (!email || !password) {
            return next(ApiError.badRequest("Email or password is empty"))
        }

        //проверка существующего пользователя
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest("This user is existed"))
        }

        //шифрование пароля
        const hashPassword = await bcrypt.hash(password, 3);

        //создание пользователя в бд
        const user = await User.create({ email, role, password: hashPassword });
        //создание корзины пользователя в бд
        const basket = await Basket.create({ userId: user.id });

        //создание токена для пользователя
        const token = generateJWT(user.id, user.email, user.role);//role: default "USER"
        
        //возврат токена на клиент
        return res.json({token})
    }

    async login(req, res) {

    }

    async check(req, res, next) {
        const { id } = req.query
        if (!id) {
            //получение ошибки и выход из функции
            return next(ApiError.badRequest("Id is'not got"))
        }
        res.json(id)
    }
}

module.exports = new UserController()