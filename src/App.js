import { HashRouter } from 'react-router-dom'
import { Layout } from '@/components'
import { useState,useEffect } from 'react'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  const [isLogin,setIsLogin] = useState(localStorage.getItem('token'))
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
         {
           isLogin?<Layout />:<login onLogin={()=>setIsLogin(true)} />
         }
        </div>
      </Provider>
    </HashRouter>

  )
}

// 1 登录的组件  assets /components/login  抛出n
// 2 useState 一个布尔值   isLoogin ? 《Layout /> :
// 3 useEffect  setIsLogin(localStorage.getItem('toke'))
// 4 手动添加路由url  useEffect   location.href = '/#/login'  history.replace('/')
// 5 登录组件   api.fetch  localStorage.setItem('token')
// 6 useHistory from react-router-dom
//  加密 md5   values.password = md5(valus.password)


// 不同级别的用户登录 数据库配置的 
// 一维数组转化成树结构
export default App
