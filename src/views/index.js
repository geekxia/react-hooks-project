import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DashboardOutlined
} from '@ant-design/icons'


const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Analysis =loadable(()=>import('./analysis/Analysis.js'))
const Testsocket=loadable(()=>import('./home/Testsocket'))
const GoodAddOrEdit=loadable(()=>import('./home/GoodAddOrEdit.js'))


export default [ // eslint-disable-line
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
    text:'田育帆',
    icon:<DashboardOutlined />,
    children:[
      {
        id:1212,
        text:'详情页',
        path:'/analysis',
        component:Analysis
      },
      {
        id:1213,
        text:'商品列表',
        path:'/good/list',
        component:Testsocket,
        children:[
          {
            id:121314,
            text:'商品新增和编辑',
            path:'/good/updata',
            component:GoodAddOrEdit
          }        
        ]
      },
      
    ]
  }
]
