import loadable from '@loadable/component'
import {DotChartOutlined} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Index=loadable(()=>import('./ZJF/index'))
const products=loadable(()=>import('./ZJF/proudcts'))
const edit=loadable(()=>import('./ZJF/edit'))


export default [
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1111,
        text: '学习Redux哟',
        path: '/ReduxStudy',
        component: ReduxStudy
      }
    ]
  },
  {
    id: 22,
    text: '数据总表',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 2222,
        text: '数据总表',
        path: '/Index',
        component:Index
      },
      {
        id: 5555,
        text: '商品详情页',
        path: '/products',
        component:products
      },
      
      
    ]
  }
]
