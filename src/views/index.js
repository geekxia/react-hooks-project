import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined
} from '@ant-design/icons'

const Number = loadable(()=>import('./px-number/Number'))
const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const PxGoodList = loadable(()=>import('./px-good/GoodList'))
const PxGoodListAddOrEdit = loadable(()=>import('./px-good/GoodAddOrEdit'))


const ListHome = loadable(()=>import("./list/ListHome"))


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
    id:2211,
    text:'潘曦号码归属地',
    icon: <DotChartOutlined />,
    children: [
      {
        id:221101,
        text:"归属地查询",
        path:'/testdemo',
        component:Number
      }
    ]
  },
  {
    id:2212,
    text:'潘曦-商品管理',
    icon: <DotChartOutlined />,
    children:[
      {
        id:221201,
        text:'商品列表',
        path:'/panxi/good/list',
        component:PxGoodList,
        children:[
          {
            id:22120101,
            text:'商品新增',
            path:'/panxi/good/list/addoredit/:id',
            component:PxGoodListAddOrEdit
          }
        ]
      }
    ]
  }
]
