import loadable from '@loadable/component'
import {
  DotChartOutlined,
  UserOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))

const UserSeting = loadable(()=>import('./xw-user/UserSeting'))

const List=loadable(()=>import('./xw-user/List'))

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
    id:12,
    text:"个人页",
    icon:<UserOutlined />,
    children:[
      {
        id:1210,
        text:"个人设置",
        path:'/user/seting',
        component:UserSeting
      },
      {
        id:1211,
        text:'商品列表',
        path:'/user/list',
        component:List
      }
    ]
  }
]
