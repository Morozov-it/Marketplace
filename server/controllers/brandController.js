const ApiError = require("../error/apiError");
const { Brand } = require('../models/models');

class BrandController {
    //функция создания бренда
    async create(req, res, next) {
        //получение типа из строки запроса
        const { name } = req.body;

        //проверка существующего бренда
        const current = await Brand.findOne({ where: { name } });
        if (current) {
            return next(ApiError.badRequest("This brand is already existed"))
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