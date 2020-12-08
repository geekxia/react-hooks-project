import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DingdingOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const GoodList = loadable(()=>import('./yunxi/GoodList'))
const GoodAddorEdit = loadable(()=>import('./yunxi/GoodAddorEdit'))


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
    id: 22,
    text: '云兮商品',
    icon: <DingdingOutlined />,
    children: [
      {
        id: 2222,
        text: '商品列表',
        path: '/list', 
        component: GoodList,
        children:[
          {
            id: 23333,
            text: '新增商品与编辑',
            path: '/aore/:id', 
            component: GoodAddorEdit,
          }
        ]
      }
    ]
  }
]
