import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const FoodList = loadable(()=>import('./food/FoodList'))

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
    text: '美食专栏',
    icon: '',
    children: [
      {
        id: 1211,
        text: '菜谱大全',
        path: '/food',
        component: FoodList
      }
    ]
  }
]
