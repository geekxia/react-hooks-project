import loadable from '@loadable/component'
import {
  DotChartOutlined,
  UserOutlined,
  WarningFilled,
  FormOutlined,
  AccountBookFilled
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const User = loadable(()=>import('./user/User'))
const ErrorThree = loadable(()=>import('./error/ErrorThree'))
const ErrorFour = loadable(()=>import('./error/ErrorFour'))
const ErrorFive = loadable(()=>import('./error/ErrorFive'))
const Basic = loadable(()=>import('./form/Basic'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAdd'))



export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1111,
        text: '学习Redux',
        path: '/',
        component: ReduxStudy
      }
    ]
  },
  {
    id: 1657,
    text: '商品管理',
    icon: <AccountBookFilled />,
    children: [
      {
        id: 165711,
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
    id: 19990713,
    text: '异常页',
    icon: <WarningFilled />,
    children: [
      {
        id: 403,
        text: '403',
        path: '/errorthree',
        component: ErrorThree
      },
      {
        id: 404,
        text: '404',
        path: '/errorfour',
        component: ErrorFour
      },
      {
        id: 500,
        text: '500',
        path: '/errorfive',
        component: ErrorFive
      }
    ]
  },
  {
    id: 19990723,
    text: '个人页',
    icon: <UserOutlined />,
    children: [
      {
        id: 11,
        text: '个人中心',
        path: '/user',
        component: User
      }
    ]
  },
  {
    id: 19990733,
    text: '表单页',
    icon: <FormOutlined />,
    children: [
      {
        id: 11,
        text: '基础表单',
        path: '/basic-form',
        component: Basic
      }
    ]
  }
]
