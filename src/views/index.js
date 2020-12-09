import loadable from '@loadable/component'
import {
  DotChartOutlined,
  DribbbleOutlined
} from '@ant-design/icons'

const TestRedux = loadable(()=>import('./home/TestRedux'))
const TestReduxHook = loadable(()=>import('./home/TestReduxHook'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))

const ListHome = loadable(()=>import("./huhui/ListHome"))
const FormHome = loadable(()=>import("./huhui/FormHome"))
const HuhClass = loadable(()=>import("./huhui/HuhClass"))
const HuhAddorEdit = loadable(()=>import("./huhui/HuhAddorEdit"))


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
            path: '/good/update/:id',
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
        id:1311,
        text:"查询表格",
        path:"/hulist",
        component:ListHome
      },
      {
        id:1312,
        text:"分步表单",
        path:"/huform",
        component:FormHome
      },
      {
        id:1313,
        text:"课堂练习",
        path:"/hucontact",
        component:HuhClass,
        children:[
          {
            id:131311,
            text:"商品新增",
            path:"/hucontact/gooduptate",
            component:HuhAddorEdit
          }
        ]
      }
    ]
  }
]
