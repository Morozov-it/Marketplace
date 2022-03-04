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
  const { user, load } = useStore()

  //проверка авторизации при первой загрузке 
  async function checkAuth() {
    try {
      const { decodeUser } = await check();
      user.setIsError('');
      user.setUser(decodeUser);
      user.setIsAuth(true);
    } catch (e) {
      //user.setIsError(e.response.data.message)
      console.log(e.response.data.message)
    } finally {
      load.setLoading(false)
    }
  }

  useEffect( () => {
    checkAuth()
  }, [])

  return (
    <BrowserRouter>
      {load.loading &&  <Spinner />}
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default React.memo(App);
