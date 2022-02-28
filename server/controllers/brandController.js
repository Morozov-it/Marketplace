const ApiError = require("../error/apiError");
const { Brand } = require('../models/models');

class BrandController {
    //функция создания бренда
    async create(req, res) {
        //получение типа из строки запроса
        const { name } = req.body;
        //проверка наличия бренда в запросе
        if (!name) {
            //получение ошибки и выход из функции
            return next(ApiError.badRequest("Name is'not received"))
        }
        //сохранение типа в бд
        const brand = await Brand.create({ name });
        return res.json(brand)
    }

    //функция получения всех брендов
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
}

module.exports = new BrandController()