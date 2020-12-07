import loadable from '@loadable/component'
import {
  DotChartOutlined,
  AreaChartOutlined,
  HeartTwoTone
} from '@ant-design/icons'


const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Analyse=loadable(()=>import('./dashboard/Analyse'))
const GoodList=loadable(()=>import('./good/GoodList'))
const GoodDetail=loadable(()=>import('./good/GoodDetail'))
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
    text:"Dashboard",
    icon:<AreaChartOutlined/>,
    children:[
      {
        id: 1210,
        text: '分析页',
        path: '/analyse',
        component: Analyse
      }
    ]
  },
  {
    id:13,
    text:'吴晗的矿',
    icon:<HeartTwoTone />,
    children:[
      {
        id:1310,
        text:'矿列表',
        path:'/good',
        component:GoodList,
        children:[
          {
            id:131010,
            path:'/detail',
            component:GoodDetail
          }

        ]
      }
    ]
  }
]
