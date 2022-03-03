import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from '../index';
import { observer } from 'mobx-react-lite';
import {authRoutes, publicRoutes} from '../routes'
import Spinner from './Spinner';


const AppRouter = observer(() => {
    const { user } = useStore();
    
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                {user.isAuth && authRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} />
                )}
                {publicRoutes.map(({ path, element }) =>
                    <Route key={path} path={path} element={element} />
                )}
                <Route path="*" element={<h2>Page not found</h2>}/>
            </Routes>
        </Suspense>
    )
})

export default AppRouter;