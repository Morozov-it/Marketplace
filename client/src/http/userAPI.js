import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';


export const registration = async (email, password) => {
    //возврат ответа от сервера на post запрос
    const { data } = await $host.post('/user/registration', {
        email,
        password,
        role: 'ADMIN'
    })

    //возврат на клиент информации из токена
    const decodeUser = jwt_decode(data.token)
    return { decodeUser }
};

export const login = async (email, password) => {
    //возврат ответа от сервера на post запрос
    const { data } = await $authHost.post('/user/login', {
        email,
        password
    })

    //сохранение в localStorage токена
    localStorage.setItem('token', data.token)
    
    //возврат на клиент информации из токена
    const decodeUser = jwt_decode(data.token)
    return { decodeUser }
};

export const check = async () => {
    //возврат ответа от сервера на get запрос
    const { data } = await $authHost.get('/user/auth')

    //сохранение в localStorage токена
    localStorage.setItem('token', data.token)
    
    //возврат на клиент информации из токена
    const decodeUser = jwt_decode(data.token)
    return { decodeUser }
};
