import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._types = [
            { id: 1, name: 'TV' },
            { id: 2, name: 'Mobile'}
        ]
        this._brands = [
            { id: 1, name: 'Samsung' },
            { id: 2, name: 'LG'}
        ]
        this._devices = [
            { id: 1, name: 'S22', price: 70000, rating: 5, img: '' },
            { id: 2, name: 'S20 FE', price: 35000, rating: 5, img: '' },
        ]
        //параметром передается объект контекста this
        makeAutoObservable(this)
    }

    //actions:
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    //геттеры для получения переменных из состояния, вызываются только если указанная переменная была изменена
    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }
}