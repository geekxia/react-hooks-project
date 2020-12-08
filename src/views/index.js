import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const GoodList =loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit =loadable(()=>import('./good/GoodAddOrEdit'))

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
    id:12,
    text:'商品管理',
    icon:'',
    children:[{
      id:1210,
      text:'商品列表',
      path:'/good/list',
      component:GoodList,
      children:[{
        id:121010,
        text:'商品新增和编辑',
        path:'/good/update',
        component:GoodAddOrEdit
      }]
    }]
  }

]
