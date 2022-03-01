import { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';

//hook для получения данных из контекста
const Context = createContext()
export const useStore = () => useContext(Context)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

