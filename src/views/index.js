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
    id: 13,
    text: 'Apple管理',
    icon: <AppleFilled />,
    children: [
      {
        id: 1310,
        text: 'Apple iphone12',
        path: '/apple',
        component: Apple
      }
    ]
  },
  {
    id: 14,
    text: 'JDT列表',
    icon: <GithubOutlined />,
    children: [
      
      {
        id: 1411,
        text: '商品列表',
        path: '/productlist',
        component: ProductList,
        children: [
            {
                id:141010,
                text:'商品新增与编辑',
                path:'/productlist/update/:id',
                component: Add
            }
        ]
      }
    ]
  }
]
