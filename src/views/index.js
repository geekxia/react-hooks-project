import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DingdingOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ReduxYunxi = loadable(()=>import('./yunxi/ReduxYunxi'))

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
    text: 'yunxi',
    icon: <DingdingOutlined />,
    children: [
      {
        id: 2222,
        text: '第一个工作',
        path: '/yunxi',
        component: ReduxYunxi
      }
    ]
  }
]
