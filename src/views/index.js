import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Number = loadable(()=>import('./px-number/Number'))

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
    id:2211,
    text:'潘曦号码归属地',
    icon: <DotChartOutlined />,
    children: [
      {
        id:221101,
        text:"归属地查询",
        path:'/testdemo',
        component:Number
      }
    ]
  }
]
