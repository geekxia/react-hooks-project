import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'
import {useState} from 'react'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'
function App() {
  const [isLogin,setIsLoign]=useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isLogin?
            <Layout />:
            <Login />
          }
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
