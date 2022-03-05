const ApiError = require("../error/apiError");
const { BasketDevice, Basket } = require('../models/models');


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

            //получение от бд корзины конкретного пользователя
            const basketItems = await BasketDevice.findAll({ where: { basketId: basket.id } })
            
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
            const user = req.user;
            //получение данных о пользователе
            const { id } = req.params;
            console.log(id)

            //поиск корзины пользователя
            const basket = await Basket.findOne({ where: { userId: user.id } });

            //запрос на удаление
            const deleteItem = await BasketDevice.destroy(
                {include: {
                    basketId: basket.id,
                }, where: {deviceId: id}})
            
            //возвращаем удаленный элемент
            return res.json(deleteItem)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()