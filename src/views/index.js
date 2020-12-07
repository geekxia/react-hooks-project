import loadable from '@loadable/component'
import {
    DotChartOutlined,
    FormOutlined,
    CheckCircleOutlined,
    WarningOutlined,

} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))

// 表单页FormPage
const BasicsForm = loadable(()=>import('./yyj/FormPage/BasicsForm'))

// 结果页ResultPage
const SucPage = loadable(()=>import('./yyj/ResultPage/SucPage'))
const LosePage = loadable(()=>import('./yyj/ResultPage/LosePage'))

// 异常页AbnormalPage
const A403 = loadable(()=>import('./yyj/AbnormalPage/A403'))
const A404 = loadable(()=>import('./yyj/AbnormalPage/A404'))
const A500 = loadable(()=>import('./yyj/AbnormalPage/A500'))

export default [ // eslint-disable-line
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
  },
  {
    id:20,
    text:'表单页',
    icon:<FormOutlined />,
    children:[
      {
          id:2010,
          text:'基础表单',
          path:'/basicsForm',
          component: BasicsForm
      }
    ]
  },
  {
      id:50,
      text:'结果页',
      icon:<CheckCircleOutlined />,
      children:[
          {
              id:5010,
              text:'成功页',
              path:'/sucPage',
              component:SucPage
          },
          {
              id:5011,
              text:'失败页',
              path:'/losePage',
              component:LosePage
          }
      ]
  },
  {
      id:60,
      text:'异常页',
      icon:<WarningOutlined />,
      children:[
          {
              id: 6010,
              text:'403',
              path:'/a403',
              component:A403
          },
          {
              id: 6011,
              text:'404',
              path:'/a404',
              component:A404
          },
          {
              id: 6012,
              text:'500',
              path:'/a500',
              component:A500
          }
      ]
  }
]
