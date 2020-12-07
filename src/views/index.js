import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Login = loadable(()=>import('./User/Login'))
const Detail = loadable(()=>import('./User/Details'))
const YourMsg = loadable(()=>import('./User/YourMsg'))
const RegistrationForm = loadable(()=>import('./User/Register'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))
export default [
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
    text: '个人中心',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1210,
        text: '轮播图',
        path: '/detail',
        component: Detail
      },
      {
        id: 1211,
        text: '登录跳转看轮播图',
        path: '/login',
        component: Login
      },
      {
        id: 1231,
        text: '个人信息设置',
        path: '/yourMsg',
        component: YourMsg
      },
      {
        id: 1232,
        text: '请先注册',
        path: '/register',
        component: RegistrationForm
      },
    ]
  },
  {
    id: 13,
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1310,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 131010,
            text: '商品新增与编辑',
            path: '/good/update',
            component: GoodAddOrEdit, 
          },
        
        ]
      },
    
    ]
  },
]
