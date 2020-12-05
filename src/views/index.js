import loadable from '@loadable/component'
import {
  DotChartOutlined, MehOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(() => import('./home/ReduxStudy'))
const QiangStudy = loadable(() => import('./qiang/qiangqiang'))

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
    id: 57,
    text: '2009qiang',
    icon: <MehOutlined />,
    children: [
      {
        id: 5701,
        text: '占位置',
        path: '/qiang',
        component: QiangStudy
      }
    ]
  }
]
