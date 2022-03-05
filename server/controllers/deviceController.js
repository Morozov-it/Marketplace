const uuid = require('uuid');
const path = require('path');
const ApiError = require("../error/apiError");
const { Device, DeviceInfo } = require('../models/models');


class DeviceController {
    //функция создания нового девайса
    async create(req, res, next) {
        try {
            //получение данных из тела запроса
            let { name, price, brandId, typeId, info } = req.body;
            //получение файла из объекта с файлами
            const { img } = req.files;
            //генерация рандомного названия файла
            let filename = uuid.v4() + '.jpg';
            //перемещение файла в папку static, resolve адаптирует путь по ОС
            img.mv(path.resolve(__dirname, '..', 'static', filename))

            //создание записи в бд, рейтинг по default 0
            const device = await Device.create({ name, price, brandId, typeId, info, img: filename })

            //проверка если клиент указал info
            if (info) {
                //с фронта будет приходить массив в формате json
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                });
            }
            //возврат клиенту созданного девайса
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //функция получения всех девайсов
    async getAll(req, res, next) {
        try {
            //для сортировки и пагинации получаем из параметров строки запроса
            let { brandId, typeId, limit, page } = req.query;
            page = page || 1;
            limit = limit || 10;
            let offset = page * limit - limit;

            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset});
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset})
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset})
            }
            //возвращаем сортированный массив
            return res.json(devices)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //функция получение конкретного девайса
    async getOne(req, res, next) {
        try {
            //получаем id из объекта параметров
            const { id } = req.params;
            const device = await Device.findOne({
                where: { id },
                //включая массив характеристик
                include: [{model: DeviceInfo, as: 'info'}]
            })

            //возврат клиенту девайс с характеристиками
            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new DeviceController()