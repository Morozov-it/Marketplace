import { $authHost, $host } from './index';

export const registration = async (email, password) => {
    //возврат ответа от сервера на post запрос
    const response = await $host.post('/user/registration', {
        email,
        password,
        role: 'ADMIN'
    })
    return response
};

export const login = async (email, password) => {
    //возврат ответа от сервера на post запрос
    const response = await $authHost.post('/user/login', {
        email,
        password
    })
    return response
};

export const check = async () => {
    //возврат ответа от сервера на post запрос
    const response = await $authHost.get('/user/login')
    return response
};
