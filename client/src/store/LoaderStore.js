import { makeAutoObservable } from 'mobx';

export default class LoaderStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._loading = true
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setLoading(bool) {
        this._loading = bool
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get loading() {
        return this._loading
    }
}