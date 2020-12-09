import loadable from '@loadable/component'
import {DotChartOutlined} from '@ant-design/icons'

const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))
const TestRedux = loadable(()=>import('./home/TestRedux'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

export default [
  {
    id: 10,
    text: '列表管理',
    icon: <DotChartOutlined/>,
    children: [
      {
        id: 1010,
        text: '列表1',
        path: '/',
        component:TestReduxHook
      },
      {
        id:1011,
        text:'列表2',
        path:'/redux/hook',
        component:TestRedux
      }
    ]
  },
  {
    id:11,
    text:'商品管理',
    icon:<DotChartOutlined />,
    children:[
      {
        id:1110,
        text:'商品列表',
        path:'/good/list',
        component: GoodList,
      }
    ]
  },
]
