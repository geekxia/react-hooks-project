import loadable from '@loadable/component'
import {
  DotChartOutlined,
  WifiOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))


const YLQHomePage = loadable(()=>import("./ylq/YLQHomePage"))
const YLQHomePageGoodList = loadable(()=>import("./ylq/YLQHomePageGoodList"))
const YLQNewAddPage = loadable(()=>import("./ylq/YLQNewAddPage"))

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
    id: 999,
    text:"YLQ模块",
    icon:<WifiOutlined />,
    children :[
      {
        id:99910,
        text:"个人中心",
        path:"/ylq/homepage",
        component:YLQHomePage
      },
      {
        id:99911,
        text:"商品列表",
        path:"/ylq/homepage/goodlist",
        component:YLQHomePageGoodList,
        children:[
          {
            id:9991110,
            path:"/ylq/homepage/goodlist/newaddpage",
            component:YLQNewAddPage
          }
        ]
      },

    ]
  }
]
