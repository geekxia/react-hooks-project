import loadable from '@loadable/component'
import {
  DotChartOutlined,
  AppleFilled,
  GithubOutlined
} from '@ant-design/icons'


const Apple = loadable(()=>import('./home/Apple'))
const Add = loadable(()=>import('./product/Add.js'))
const ProductList = loadable(()=>import('./product/ProductList.js'))

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))


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
    id: 12,
    text: 'Apple管理',
    icon: <AppleFilled />,
    children: [
      {
        id: 1210,
        text: 'Apple iphone12',
        path: '/apple',
        component: Apple
      }
    ]
  },
  {
    id: 13,
    text: 'JDT列表',
    icon: <GithubOutlined />,
    children: [
      {
        id: 1310,
        text: '商品添加',
        path: '/add',
        component: Add
      },
      {
        id: 1311,
        text: '商品列表',
        path: '/productlist',
        component: ProductList
      }
    ]
  }
]
