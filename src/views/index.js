import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const ListHome = loadable(()=>import("./list/ListHome"))

const GoodsList = loadable(()=>import('./goods/GoosdList'))
const GoodsAdd = loadable(()=>import('./goods/GoodsAdd'))
const Login = loadable(()=>import('./user/login'))


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
    id: 131,
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
    id:13,
    text:'LF列表1',
    icon:<DribbbleOutlined />,
    children:[
      {
        id:1301,
        text:'商品列表1',
        path:'/goods/list',
        component:GoodsList,
        children:[
          {
            id:1302,
            text:'商品新增1',
            path:'/goods/add',
            component:GoodsAdd
          }
        ]
      }
    ]
  },
  {
    id:14,
    text:'LF登录',
    children:[
      {
        id:1401,
        text:'登录',
        path:'/user/login',
        component:Login
      }
    ]
  }
]
