import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Good=loadable(()=>import('./good/GoodaddList'))
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
    id: 1410,
    text: '商品栏',
    path: 'good',
    children:[{
      id: 1411,
      text: '商品新增',
      path: '/good',
     
      component: Good

    }
     
    ]
    
  },

]
