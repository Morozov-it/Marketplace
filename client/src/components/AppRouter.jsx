import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useData } from '../index';
import {authRoutes, publicRoutes} from '../routes'

const AppRouter = () => {
    const { user } = useData();
    //console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            {publicRoutes.map(({ path, element }) =>
                <Route key={path} path={path} element={element} />
            )}
            <Route path="*" element={<h2>Page not found</h2>}/>
        </Routes>
    )
}
export default AppRouter;