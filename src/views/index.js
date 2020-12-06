import loadable from '@loadable/component'
import {
  DotChartOutlined,
ApartmentOutlined
} from '@ant-design/icons'

const Home = loadable(()=>import('./home/Home'))
const Mqh = loadable(()=>import('./mqh/Mqh'))
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
        component: Home
      },
    ]
  },
  {
    id: 22,
    text: '数据分析',
    icon: <ApartmentOutlined />,
    children: [
      {
        id: 1111,
        text: '前端开发之数据分析',
        path: '/mqh',
        component: Mqh
      },
      
    ]
  }
]
