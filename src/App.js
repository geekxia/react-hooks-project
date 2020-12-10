import {HashRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import {Layout,Login} from '@/components'
import store from '@/store'
import { useState, useEffect } from 'react'
function App() {
  // console.log('app store',store.msg)
  const [isLogin,setIsLogin]=useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
        {isLogin? <Layout />:<Login onLogin={()=>setIsLogin(true)} />}
        </div>
      </Provider>
    </HashRouter>
    
  );
}

export default App