import { lazy } from 'react';
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from './utils/const';

const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Registration = lazy(() => import('./pages/Registration'));
const Basket = lazy(() => import('./pages/Basket'));
const Shop = lazy(() => import('./pages/Shop'));
const DevicePage = lazy(() => import('./pages/DevicePage'));



export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        element: <Admin />
    },
    {
        path: BASKET_ROUTE,
        element: <Basket />
    },
];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        element: <Shop />
    },
    {
        path: LOGIN_ROUTE,
        element: <Login />
    },
    {
        path: REGISTRATION_ROUTE,
        element: <Registration />
    },
    {
        path: DEVICE_ROUTE + '/:id',
        element: <DevicePage />
    },
];