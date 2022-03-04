import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './index';
import { check } from './http/userAPI';

import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const App = observer(() => {
  //подключение к userStore
  const { user, global } = useStore()

  //проверка авторизации при первой загрузке 
  async function checkAuth() {
    try {
      const { decodeUser } = await check();
      user.setUser(decodeUser);
      user.setIsAuth(true);
    } catch (e) {
      global.setErrorAuth(e.response.data.message);
    } finally {
      global.setLoading(false)
    }
  }

  useEffect( () => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      {global.loading && <Spinner />}
      {global.errorAuth && <div className='error'>{global.errorAuth}</div>}
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default React.memo(App);
