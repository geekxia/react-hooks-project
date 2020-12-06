import loadable from '@loadable/component'
import {
  DotChartOutlined,
  FormOutlined 
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Basic = loadable(()=>import('./form/Basic'))
const Distribution = loadable(()=>import('./form/Distribution'))
const Advanced = loadable(()=>import('./form/Advanced'))

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
    text: '表单页',
    icon: <FormOutlined />,
    children: [
      {
        id: 1201,
        text: '基础表单',
        path: '/form/basic',
        component: Basic
      },
      {
        id: 1202,
        text: '分布表单',
        path: '/form/advanced',
        component: Distribution
      },
      {
        id: 1203,
        text: '高级表单',
        
        path: '/form/distribution',
        component: Advanced
      }
    ]
  }
]
