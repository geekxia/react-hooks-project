import { HashRouter } from 'react-router-dom'
import { Layout } from '@/components'

// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div className="app">
          <Layout />
        </div>
      </Provider>
    </HashRouter>

  );
}

export default App
