import { HashRouter } from 'react-router-dom'
import { Layout,Login } from '@/components'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  const id = localStorage.getItem('token')
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          {
            id?<Layout />:<Login/>
          }
          {/* <Layout />
          <Login/> */}
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
