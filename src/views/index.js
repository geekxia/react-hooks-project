import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined,
  NodeIndexOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./mqh/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./mqh/GoodAddOrEdit'))



export default [
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1110,
        text: 'TestRedux',
        path: '/',
        component: TestRedux
      },
      {
        id: 1111,
        text: 'TestReduxHook',
        path: '/redux/hook',
        component: TestReduxHook
      }
    ]
  },
  {
    id: 12,
    text: '清华商品',
    icon:   <NodeIndexOutlined/>,
    children: [
      {
        id: 1210,
        text: '商品列表',
        path: '/mqh/list',
        component: GoodList,
        children: [
          {
            id: 121010,
            text: '商品新增与编辑',
            path: '/mqh/update/:id',
            component: GoodAddOrEdit
          }
        ]
      }
    ]
  },
]
