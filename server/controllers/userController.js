const ApiError = require("../error/apiError")

class UserController {
    async registration(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
        }
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