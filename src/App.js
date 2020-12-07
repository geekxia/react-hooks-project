import { HashRouter } from 'react-router-dom'
import { Layout } from '@/components'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider,DatePicker }from 'antd'


// react-redux
import { Provider } from 'react-redux'
import store from '@/store'

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <ConfigProvider locale={locale}>
          <DatePicker defaultValue={moment('YYYY-MM-DD')} />
           <div className="app">
            <Layout />
           </div>
        </ConfigProvider>
      </Provider>
    </HashRouter>

  );
}

export default App
