import loadable from '@loadable/component'
import {
  DotChartOutlined,
  AppleFilled,
  GithubOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Apple = loadable(()=>import('./home/Apple'))
const Add = loadable(()=>import('./product/Add.js'))
const ProductList = loadable(()=>import('./product/ProductList.js'))

export default [ // eslint-disable-line
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
