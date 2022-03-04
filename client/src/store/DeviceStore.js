import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
    //конструктор вызывается при создании нового объекта этого класса
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._limit = 4
        this._totalCount = 0
        this._selectedPage = 1
        this._pages = 0
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
        this.setSelectedPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setSelectedPage(1)
        this._selectedBrand = brand
    }
    setLimit(limit) {
        this._limit = limit
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setSelectedPage(page) {
        this._selectedPage = page
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
    get limit() {
        return this._limit
    }
    get selectedPage() {
        return this._selectedPage
    }
    get pages() {
        return Math.ceil(this._totalCount / this._limit)
    }
}