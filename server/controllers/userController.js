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
    async registration(req, res, next) {
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

    async login(req, res, next) {
        //получение auth.данных из тела запроса
        const { email, password } = req.body;

        //проверка email пользователя
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("User is not found"))
        }

        //проверка password пользователя
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal("Password is incorrect"))
        }

        //создание токена для пользователя
        const token = generateJWT(user.id, user.email, user.role);

        //возврат токена на клиент
        return res.json({token})
    }

    async check(req, res) {
        //создание токена для пользователя
        const token = generateJWT(req.user.id, req.user.email, req.user.role);
        return res.json({token})
    }
}

module.exports = new UserController()