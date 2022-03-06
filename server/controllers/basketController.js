const ApiError = require("../error/apiError");
const { Device, BasketDevice, Basket } = require('../models/models');


class BasketController {
    //функция создания нового элемента в корзине
    async create(req, res, next) {
        try {
            //получение данных о товаре
            const { deviceId } = req.body;
            //получение данных о пользователе
            const { id } = req.user;

            //поиск корзины пользователя
            const basket = await Basket.findOne({ where: { userId: id } });

            //создание нового элемента товара для корзины пользователя
            const basketItem = await BasketDevice.create({ basketId: basket.id, deviceId });

            //возврат клиенту добавленного элемента
            return res.json(basketItem)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //функция получения всех элементов корзины
    async getAll(req, res, next) {
        try {
            //получение данных о пользователе
            const { id } = req.user;

            //поиск корзины пользователя
            const basket = await Basket.findOne({ where: { userId: id } });

            //получение от бд корзины конкретного пользователя c моделями указанных id
            const basketItems = await BasketDevice.findAll({include: {
                model: Device
            }, where: { basketId: basket.id }
            })
            
            //возвращаем корзину элементов
            return res.json(basketItems)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //функция удаления элемента из корзины пользователя
    async remove(req, res, next) {
        try {
            //получение данных о пользователе
            //const user = req.user;
            //получение данных об элементе
            const {id} = req.params;
            console.log(id)

            //поиск корзины пользователя
            //const basket = await Basket.findOne({ where: { userId: user.id } })

            //запрос на удаление
            await BasketDevice.destroy({ where: { id } })

            //ответ сервера
            return res.json({message: "Deleting is success"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()



//преобразование в массив с id и device
// const devices = basketItems.map(item => {
//     return {
//         id: item.id,
//         device: item.device
//     }
// })
// // вычисление суммы в корзине
// const summ = devices.reduce((acc, elem) => {
//     return acc + elem.device.price
// }, 0)
// //возвращаем корзину элементов
// return res.json({ devices, summ })