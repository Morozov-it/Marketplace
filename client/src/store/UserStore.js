import { makeAutoObservable } from 'mobx';

export default class UserStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._isAuth = false
        this._isError = ''
        this._user = {}
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsError(error) {
        this._isError = error
    }
    setUser(user) {
        this._user = user
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get isAuth() {
        return this._isAuth
    }
    get isError() {
        return this._isError
    }
    get user() {
        return this._user
    }
}