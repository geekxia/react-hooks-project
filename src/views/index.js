import loadable from '@loadable/component'
import {
  DribbbleOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))
import {
  DotChartOutlined,
  GitlabFilled 
} from '@ant-design/icons'

const ListHome = loadable(()=>import("./list/ListHome"))
const Ming = loadable(()=>import('./zhappy/Zregist'))
const Yue = loadable(()=>import('./zhappy/ZRo'))
const Song = loadable(()=>import('./zhappy/zgood/ZCreate'))
const Zhao = loadable(()=>import('./zhappy/Zhao'))
const Zintel = loadable(()=>import('./zhappy/Internation'))
const ZDisplay = loadable(()=>import('./zhappy/zgood/ZDisplay'))

export default [
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1110,
        text: 'TestRedux',
        path: '/',
        component: TestRedux
      },
      {
        id: 1111,
        text: 'TestReduxHook',
        path: '/redux/hook',
        component: TestReduxHook
      }
    ]
  },
  {
    id: 12,
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1210,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 121010,
            text: '商品新增与编辑',
            path: '/good/update',
            component: GoodAddOrEdit
          }
        ]
      }
    ]
  },
  {
    id: 13,
    text:"胡辉列表",
    icon:<DribbbleOutlined />,
    children :[
      {
        id:1211,
        text:"查询表格",
        path:"/hulist",
        component:ListHome
      }
    ]
  },
  {
    id: 20172021,
    text: 'Z-表单',
    icon: <GitlabFilled />,
    children: [
      {
        id: 2017202101,
        text: '注册表单',
        path: '/zhappy/ming',
        component:Ming
      },
      {
        id: 2017202102,
        text: '个人资料',
        path: '/zhappy/yue',
        component: Yue
      },
      {
        id: 2017202105,
        text: '可编辑',
        path: '/zhappy/zhao',
        component: Zhao
      },
      {
        id: 2017202106,
        text: '国际化',
        path: '/zhappy/intel',
        component: Zintel
      },
      {
        id:2017202107,
        text:'商品展示',
        path:'/zhappy/display',
        component:ZDisplay,
        children:[
          {
            id: 2017202103,
            path: '/zhappy/song/:id',
            component: Song
          },
        ]
      }
    ]
  }
]
