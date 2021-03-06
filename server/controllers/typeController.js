const ApiError = require('../error/apiError');
const { Type } = require('../models/models');


class TypeController {
    //функция создания типа
    async create(req, res, next) {
        //получение типа из тела запроса
        const { name } = req.body;

        //проверка существующего типа
        const current = await Type.findOne({ where: { name } });
        if (current) {
            return next(ApiError.badRequest("This type is already existed"))
        }

        //сохранение типа в бд
        const type = await Type.create({ name });
        return res.json(type)
    }

    //функция получения всех типов
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }
}

module.exports = new TypeController()