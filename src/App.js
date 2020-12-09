import { HashRouter } from 'react-router-dom'
import { Layout } from '@/components'
import {useState} from "react"
// react-redux
import { Provider } from 'react-redux'
import store from '@/store'
import {Login} from "@/components/"

function App() {
  let [flag,setflag]=useState(localStorage.getItem("token"))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
         {flag?<Layout />  :<Login ons={(e)=>setflag(e)}/>}
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
