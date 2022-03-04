import { createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';

import UserStore from './store/UserStore';
import DeviceStore from './store/DeviceStore';
import LoaderStore from './store/LoaderStore';

//hook для получения данных из контекста
const Context = createContext()
export const useStore = () => useContext(Context)

console.log(process.env)

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
    load: new LoaderStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

