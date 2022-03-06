import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from './index';
import { check } from './http/userAPI';
import { fetchBasket } from './http/basketAPI';

import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

const App = observer(() => {
  //подключение к userStore
  const { user, global, basket } = useStore()

  //проверка авторизации при первой загрузке 
  async function checkAuth() {
    try {
      const { decodeUser } = await check();
      user.setUser(decodeUser);
      user.setIsAuth(true);

      //получение корзины пользователя
      const items = await fetchBasket();
      basket.setItems(items);
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
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default React.memo(App);
