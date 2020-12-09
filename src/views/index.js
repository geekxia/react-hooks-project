import loadable from '@loadable/component'
import {
  DotChartOutlined,
  LoadingOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ShawnTestRedux = loadable(()=>import('./shawn/ShawnTestRedux'))
const ShawnGoodList = loadable(()=>import('./shawn/ShawnGoodList'))
const ShawnGoodDetail = loadable(()=>import('./shawn/ShawnGoodDetail'))


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
    id: 444,
    text: 'Shawn',
    icon: <LoadingOutlined />,
    children: [
      {
        id: 4441,
        text: '测试redux',
        path: '/shawntestredux',
        component: ShawnTestRedux
      },
      {
        id: 4442,
        text: '商品列表',
        path: '/shawngoodlist',
        component: ShawnGoodList,
        children: [
          {
            id: 4443,
            text: '详情',
            path: '/shawngoodlist/detail/:id',
            component: ShawnGoodDetail
          }
        ]
      }
    ]
  }
]
