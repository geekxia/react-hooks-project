import { HashRouter } from 'react-router-dom'
import { Layout ,Login} from '@/components'
import {useState} from 'react';
// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  let [isLogin,setIsLogin] = useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isLogin?<Layout/>:<Login onLogin={()=>setIsLogin(true)} />
          }
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
