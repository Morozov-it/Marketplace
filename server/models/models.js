const sequelize = require('../db')
const { DataTypes } = require('sequelize')

//создание модели пользователя
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
});

//модель корзины
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//модель девайса в корзине
const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

//модель девайса
const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
});

//модель характеристик девайса
const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
});

//модель типа девайса
const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//модель бренда девайса
const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

//модель оценки девайса
const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
});

//связующая модель для типов и брендов
const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});


//Описание типов связей между моделями
//один к одному:
User.hasOne(Basket)//пользователь имеет одну корзину
Basket.belongsTo(User)//корзина принадлежит пользователю


//один ко многим:
User.hasMany(Rating)//пользователь делает много оценок
Rating.belongsTo(User)//оценка принадлежит одному пользователю

Basket.hasMany(BasketDevice)//корзина имеет много элементов с товаром
BasketDevice.belongsTo(Basket)//элемент с товаром принадлежит одной корзине

Device.hasOne(BasketDevice)//
BasketDevice.belongsTo(Device)//

Type.hasMany(Device)//один тип имеет много девайсов
Device.belongsTo(Type)//один девайс принадлежит конкретному типу

Brand.hasMany(Device)//один бренд имеет много девайсов
Device.belongsTo(Brand)//один девайс принадлежит конкретному бренду

Device.hasMany(Rating)//один девайс имеет много оценок
Rating.belongsTo(Device)//оценка принадлежит конкретному девайсу

Device.hasMany(DeviceInfo, { as: 'info' })//девайс имеет много информации
//поле info у массива характеристик
DeviceInfo.belongsTo(Device)//информация принадлежит девайсу

//многие ко многим:
Type.belongsToMany(Brand, {through: TypeBrand})//много типов принадлежит многим брендам, через связующую модель
Brand.belongsToMany(Type, {through: TypeBrand})//много брендов принадлежит многим типам

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    Type,
    Brand,
    Rating,
    TypeBrand
}
