import {HashRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import {Layout} from '@/components'
import store from '@/store'
function App() {
  console.log('app store',store.msg)
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