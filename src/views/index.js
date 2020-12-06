import loadable from '@loadable/component'
import {
  DotChartOutlined,
  AppleOutlined
} from '@ant-design/icons'

const Home = loadable(()=>import('./home/Home'))
const OneTwo = loadable(()=>import('./home/OneTwo'))
const OneThree = loadable(()=>import('./home/OneThree'))
const OneFour = loadable(()=>import('./home/OneFour'))
const TwoOne = loadable(()=>import('./music/TwoOne'))
const TwoTwo = loadable(()=>import('./music/TwoTwo'))

export default [ // eslint-disable-line
  {
    id: 11,
    text: '第一部分',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1112,
        text: '表格展示',
        path: '/',
        component: OneTwo
      },{
        id: 1113,
        text: 'page12',
        path: '/OneTwo',
        component: Home
      },{
        id: 1114,
        text: 'page13',
        path: '/OneThree',
        component: OneThree
      },{
        id: 1115,
        text: 'page14',
        path: '/OneFour',
        component: OneFour
      }
    ]
  },
  {
    id: 12,
    text: '第二部分',
    icon: <AppleOutlined />,
    children: [
      {
        id: 1216,
        text: 'page21',
        path: '/TwoOne',
        component: TwoOne
      },
      {
        id: 1217,
        text: 'page22',
        path: '/TwoTwo',
        component: TwoTwo
      }
    ]
  }
]
