import { $authHost } from './index';


export const addToBasket = async (deviceId) => {
    const { data } = await $authHost.post('/basket', deviceId)

    //возврат ответа от сервера на post запрос
    return data
};

export const fetchBasket = async () => {
    const { data } = await $authHost.get('/basket')

    //возврат ответа от сервера на post запрос
    return data
};

export const deleteFromBasket = async (id) => {
    const { data } = await $authHost.delete('/basket/' + id)

    //возврат ответа от сервера на post запрос
    return data
};
