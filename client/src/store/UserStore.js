import { makeAutoObservable } from 'mobx';

export default class UserStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._isAuth = true
        this._user = {}
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}