import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const PlayLOL = loadable(()=>import('./play/LOL'))
const PlayCF = loadable(()=>import('./play/CF'))
const PlayDNF = loadable(()=>import('./play/DNF'))
const GoodList = loadable(()=>import('./goods/GoodList'))
const GoodUpData = loadable(()=>import('./goods/GoodUpdata'))

export default [
  {
    id: 1,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 101,
        text: '学习Redux',
        path: '/',
        component: ReduxStudy
      }
    ]
  },
  {
    id:2,
    text:"热门游戏",
    icon: <DotChartOutlined />,
    children:[
      {
        id:201,
        text:"LOL",
        path:"/lol",
        component: PlayLOL
      },
      {
        id:202,
        text:"CF",
        path:"/cf",
        component: PlayCF
      },
      {
        id:203,
        text:"DNF",
        path:"/dnf",
        component: PlayDNF
      }
    ]
  },
  {
    id:3,
    text:"周志林的商品管理",
    icon: <DotChartOutlined />,
    children:[
      {
        id:"301",
        text: '商品列表',
        path: '/goodlist',
        component: GoodList,
        children:[
          {
            id:30101,
            text:"新增",
            path:"/goodlist/updata",
            component: GoodUpData,
          }
        ]
      }
    ]
  }
]
