import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'


const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Loading =loadable(()=>import('./loading/Loading'))
const AdvancedForm=loadable(()=>import('./form/AdvancedForm'))
const StepForm=loadable(()=>import('./form/StepForm'))

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
    text:'余——加载页面',
    children:[
      {
        id:1201,
        text:'余——加载',
        path:'/load',
        component:Loading
      }
    ]
  },
  {
    id:13,
    text:'余——表单',
    children:[
      {
        id:1301,
        text:'余——高级表单',
        path:'/form/advanced-form',
        component:AdvancedForm
      },
      {
        id:1302,
        text:'余——分步表单',
        path:'/form/step-form',
        component:StepForm
      }
    ]
  }
]
