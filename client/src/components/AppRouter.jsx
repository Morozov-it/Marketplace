import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {authRoutes, publicRoutes} from '../routes'

const AppRouter = () => {
    const isAuth = true;
    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, element }) =>
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