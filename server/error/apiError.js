
//создание класса ошибки
class ApiError extends Error {
    constructor(status, message) {
        //вызов родительского конструктора
        super();
        this.status = status
        this.message = message
    }

    //static функции можно вызывать без создания нового класса
    static badRequest(message) {
        return new ApiError(484, message)
    }

    static internal(message) {
        return new ApiError(500, message)
    }
    static forbidden(message) {
        return new ApiError(403, message)
    }
}