import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined,
  RadarChartOutlined
} from '@ant-design/icons'
import { List } from 'antd/lib/form/Form'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const ListHome = loadable(()=>import("./list/ListHome"))
const YjbGood = loadable(()=>import("./yjb/good/YjbGood"))
const GoodAdd = loadable(()=>import("./yjb/good/GoodAdd"))


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
        id:1311,
        text:"查询表格",
        path:"/hulist",
        component:ListHome
      }
    ]
  },
  {
    id:14,
    text:"易剑波列表",
    icon:<RadarChartOutlined />,
    children:[
      {
        id:1410,
        text:"商品详情页",
        path:"/bolist",
        component:YjbGood,
        children:[
          {
            id:141010,
            text:"商品新增页",
            path:"/bolist/add",
            component:GoodAdd
          }
        ]
      }
    ]
  }
]
