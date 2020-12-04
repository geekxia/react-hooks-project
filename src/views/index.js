import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))

export default [
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
  }
]
