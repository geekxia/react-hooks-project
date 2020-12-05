import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ShawnLearn = loadable(()=>import('./home/ShawnLearn'))


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
    text: 'Shawn',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1211,
        text: 'learn more',
        path: '/shawnlearn',
        component: ShawnLearn
      }
    ]
  }
]
