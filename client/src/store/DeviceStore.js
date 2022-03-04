import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
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
    setSelectedType(type) {
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this._selectedBrand = brand
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