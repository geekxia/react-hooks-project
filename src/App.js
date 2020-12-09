import { useState } from "react"
import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  let [isToken,setIstoken] = useState(localStorage.getItem("token"))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            isToken ? <Layout /> : <Login onLogin={()=>setIstoken(true)} />
          }
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
