import { makeAutoObservable } from 'mobx';

export default class BasketStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._items = []
        this._summ = 0
        this._amount = 0
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setItems(items) {
        this._items = items
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get items() {
        return this._items
    }
    get summ() {
        return this._items.reduce((acc, elem) => {
            return acc + elem.device.price
        }, 0)
    }
    get amount() {
        return this._items.length
    }
}
