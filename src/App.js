import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'
import { useState } from 'react'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  let [ isLogin,setIsLogin ] = useState(false)
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          { localStorage.getItem('token') ? <Layout /> : <Login onLogin = {(login)=>setIsLogin(login)}/> }
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
