import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Xxl =loadable(()=>import('./xxl/Xxl'))

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
    id: 20201205,
    text: '小溪流文件',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 2020120501,
        text: 'xxl简介',
        path: '/xxl',
        component: Xxl
      }
    ]
  }
]
