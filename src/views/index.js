import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'


const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Loading =loadable(()=>import('./loading/Loading'))

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
    id:12,
    text:'加载页面',
    children:[
      {
        id:1201,
        text:'余——加载',
        path:'/load',
        component:Loading
      }
    ]
  }
]
