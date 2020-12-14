import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined,
  GiftOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const ListHome = loadable(()=>import("./list/ListHome"))

const GoodQtpList = loadable(()=>import("./qtp/GoodQtpList"))

const GoodQtpUpdate = loadable(()=>import('./qtp/GoodQtpUpdate'))


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
    id: 13,
    text:"胡辉列表",
    icon:<DribbbleOutlined />,
    children :[
      {
        id:1211,
        text:"查询表格",
        path:"/hulist",
        component:ListHome
      }
    ]
  },
  {
    id: 14,
    text:"滴滴小店",
    icon: <GiftOutlined />,
    children: [
      {
        id: 1233,
        text:"小店商品",
        path:'/qtp/list',
        component:GoodQtpList,
        children: [
          {
            id: 112222,
            text: '商品添加与编辑',
            path: '/qtp/update/:id',
            component: GoodQtpUpdate
          }
        ]
      }
    ]
  }
]
