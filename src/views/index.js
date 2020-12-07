import loadable from '@loadable/component'
import {
  DotChartOutlined,
  
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAdd = loadable(()=>import('./good/GoodAdd'))




export default [
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1111,
        text: '学习Redux哟',
        path: '/',
        component: ReduxStudy
      }
    ]
  },
  {
    id: 12,
    text: '音乐管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1212,
        text: '音乐列表',
        path: '/music',
        component: TestReduxHook
      }
    ]
  },
  {
    id: 13,
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1313,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children:[
          {
            id: 1314,
            text:'商品新增与编辑',
            path:'/good/updata',
            component: GoodAdd
          
          }

        ]
      }
    ]
  }
]
