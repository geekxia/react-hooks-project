import loadable from '@loadable/component'
import {
  DotChartOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ReduxText = loadable(()=>import('./home/ReduxText'))
// 引入自己的两个详情页
const BaseDetail = loadable(()=>import('./detail/baseDetail'))
const HighDetail = loadable(()=>import('./detail/highDetail'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1110,
        text: '学习Redux',
        path: '/',
        component: ReduxStudy
      },
      {
        id: 1111,
        text: '学习from',
        path: '/from/:id',
        component: ReduxText
      }
    ]
  },
  {
    id:99,
    text:"详情页",
    icon:<MenuUnfoldOutlined/>,
   children:[
        {
          id:9901,
          text:"基础详情页",
          path:"/basedetail",
          component:BaseDetail
        },
        {
          id:9902,
          text:"高级详情页",
          path:"/highdetail",
          component:HighDetail
        }
   ]
  }
]
