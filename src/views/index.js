import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined,
  AliwangwangOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const LjxGoodList = loadable(()=>import("./ljx/LjxGoodList"))
const LjxGoodUpdate = loadable(()=>import("./ljx/LjxGoodUpdate"))


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
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1210,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 121010,
            text: '商品新增与编辑',
            path: '/good/update',
            component: GoodAddOrEdit
          }
        ]
      }
    ]
  },
  {
    id: 60,
    text:"不讲武德",
    icon:<AliwangwangOutlined />,
    children :[
      {
        id:6010,
        text:"商品列表",
        path:"/ljxgood",
        component:LjxGoodList,
        children: [
          {
            id: 601010,
            text: '商品新增与编辑',
            path: '/ljxgood/update',
            component: LjxGoodUpdate
          }   
        ]
      }
    ]
  }
]
