import axios from 'axios';

//instance для неавторизованного пользователя
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

//instance для авторизованного пользователя
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});


//функция для заполнения поля авторизации в headers
const authInterceptor = (config) => {
    //добавление в поле авторизации токена из localStorage
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
};

//добавление функции с токеном в перехватчик axios на запросы
$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}