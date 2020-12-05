import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Shopping = loadable(()=>import('./home/Shopping'))


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
    text: '购物车',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1212,
        text: '买东西了',
        path: '/cart',
        component: Shopping
      }
    ]
  }
]
