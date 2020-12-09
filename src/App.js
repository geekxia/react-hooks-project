import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

import {useState} from 'react'

function App() {
  // let isLogin=true
  let [isLogin,setIsLogin] = useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {isLogin?<Layout />:<Login onLogin={()=>setIsLogin()}/>}
          
          
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
