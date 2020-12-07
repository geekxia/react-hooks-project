import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ListHome = loadable(()=>import("./list/ListHome"))
const GoodList = loadable(()=>import("./cyw/good/GoodList"))
const GoodAddOrEdit = loadable(()=>import("./cyw/good/GoodAddOrEdit"))

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
    id: 12,
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
    id: 13,
    text:"cyw-good",
    icon:<DribbbleOutlined />,
    children :[
      {
        id:1311,
        text:"商品列表",
        path:"/good/list",
        component: GoodList,
        children: [
          {
            id: 131110,
            text: '商品新增与编辑',
            path: '/good/update',
            component: GoodAddOrEdit
          }
        ]
      }
    ]
  }
]
