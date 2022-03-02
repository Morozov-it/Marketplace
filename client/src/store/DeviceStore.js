import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._types = [
            { id: 1, name: 'TV' },
            { id: 2, name: 'Mobile' },
            { id: 3, name: 'Laptop' },
            { id: 4, name: 'PC' },
        ]
        this._brands = [
            { id: 1, name: 'Samsung' },
            { id: 2, name: 'LG' },
            { id: 3, name: 'Nvidia' },
            { id: 4, name: 'AMD' },
        ]
        this._devices = [
            { id: 1, name: 'S22', price: 70000, rating: 5, img: 'https://items.s1.citilink.ru/1488805_v01_b.jpg' },
            { id: 2, name: 'S20 FE', price: 35000, rating: 4, img: '' },
            { id: 3, name: 'LG 40', price: 35000, rating: 3.5, img: '' },
            { id: 4, name: 'Conqueror', price: 35000, rating: 3, img: '' },
            { id: 5, name: 'Pro 13', price: 35000, rating: 2.5, img: '' },
            { id: 6, name: 'Tablet top', price: 35000, rating: 1, img: '' },
        ]
        this._selectedType = null
        this._selectedBrand = null
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
    setSelectedType(id) {
        this._selectedType = id
    }
    setSelectedBrand(id) {
        this._selectedBrand = id
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
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}