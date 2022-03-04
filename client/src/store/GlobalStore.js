import { makeAutoObservable } from 'mobx';

export default class GlobalStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._loading = true
        this._errorAuth = ''
        this._errorLogin = ''
        this._errorRegistration = ''
        this._errorShop = ''
        this._errorDevice = ''
        this._errorCreateType = ''
        this._errorCreateBrand = ''
        this._errorCreateDevice = ''
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setLoading(bool) {
        this._loading = bool
    }
    setErrorAuth(error) {
        this._errorAuth = error
    }
    setErrorLogin(error) {
        this._errorLogin = error
    }
    setErrorRegistration(error) {
        this._errorRegistration = error
    }
    setErrorShop(error) {
        this._errorShop = error
    }
    setErrorDevice(error) {
        this._errorDevice = error
    }
    setErrorCreateType(error) {
        this._errorCreateType = error
    }
    setErrorCreateBrand(error) {
        this._errorCreateBrand = error
    }
    setErrorCreateDevice(error) {
        this._errorCreateDevice = error
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get loading() {
        return this._loading
    }
    get errorAuth() {
        return this._errorAuth
    }
    get errorLogin() {
        return this._errorLogin
    }
    get errorRegistration() {
        return this._errorRegistration
    }
    get errorShop() {
        return this._errorShop
    }
    get errorDevice() {
        return this._errorDevice
    }
    get errorCreateType() {
        return this._errorCreateType
    }
    get errorCreateBrand() {
        return this._errorCreateBrand
    }
    get errorCreateDevice() {
        return this._errorCreateDevice
    }
}