import loadable from '@loadable/component'
import {
  DotChartOutlined,
  UserOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))




const DjlUser = loadable(()=>import('./djluser/User'))
const DjlGoods = loadable(()=>import('./djluser/Goods.js'))
const DjlGoodadd = loadable(()=>import('./djluser/GoodAdd'))




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
    text:'邓继林中心',
    icon:<UserOutlined />,
    children:[
      {
        id:1210,
        text:'个人信息',
        path:'/djluser',
        component:DjlUser
      },
      {
        id:1211,
        text:'商品列表',
        path:'/good/list',
        component:DjlGoods,
        children:[
          {
            id:1212,
            path:'/goodadd/:id',
            component:DjlGoodadd
          }
        ]
      },
    
    ]
  }
]
