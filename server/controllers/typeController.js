const ApiError = require('../error/apiError');
const { Type } = require('../models/models');


class TypeController {
    //функция создания типа
    async create(req, res) {
        //получение типа из строки запроса
        const { name } = req.body;
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