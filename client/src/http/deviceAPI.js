import { $authHost, $host } from './index';


export const createType = async (type) => {
    const { data } = await $authHost.post('/type', type)

    //возврат ответа от сервера на post запрос
    return data
};

export const fetchTypes = async () => {
    const { data } = await $host.get('/type')

    //возврат ответа от сервера на post запрос
    return data
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post('/brand', brand)

    //возврат ответа от сервера на post запрос
    return data
};

export const fetchBrands = async () => {
    const { data } = await $host.get('/brand')

    //возврат ответа от сервера на post запрос
    return data
};

export const createDevice = async (device) => {
    const { data } = await $authHost.post('/device', device)

    //возврат ответа от сервера на post запрос
    return data
};

export const fetchDevices = async (brandId, typeId, limit = 4, page = 1) => {
    const { data } = await $host.get('/device', {
        params: {
            brandId, typeId, limit, page
    }})

    //возврат ответа от сервера на post запрос
    return data
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get('/device/' + id)

    //возврат ответа от сервера на post запрос
    return data
};