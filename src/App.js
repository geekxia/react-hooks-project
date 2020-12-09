import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'

import { useState,useEffect } from "react"


// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  const [isLogin,setIsLogin] = useState(true)
  useEffect(()=>{
    setIsLogin(localStorage.getItem('token'))
    return undefined
  },[])
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isLogin?<Layout/>:<Login onLogin={token=>setIsLogin(token)}/>
          }
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
