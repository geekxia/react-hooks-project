import React ,{useState} from "react"
import { HashRouter } from 'react-router-dom'
import { Layout } from '@/components'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

import Login from "@/views/xxl/login/login"

function App() {
  let [isLogin,setIsLogin] = useState(false)
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isLogin ? <Layout /> : <Login onLogin ={()=>(setIsLogin(true))}/>
          }  
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
