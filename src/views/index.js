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
const HuhECharts = loadable(()=>import("./huhui/ECharts"))
const HuhEBmap = loadable(()=>import("./huhui/Huhmap"))

// [
//   { id: 1, pid: -1, path: '/', component: 'Home', icon: 'home', text: '首页' },
//   { id: 2, pid: 1, path: '/test/redux', component: 'TestRedux', icon: 'redux', text: '测试Redux'}
//   { id: 3, pid: 1, path: '/test/redux2', component: 'TestRedux', icon: 'redux', text: '测试Redux'}
//   { id: 4, pid: 1, path: '/test/redux3', component: 'TestRedux', icon: 'redux', text: '测试Redux'},
//   { id: 5, pid: 4, path: '' }
//   {}
// ]

// 把一维数组，转化成树结构


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
            path:"/hucontact/gooduptate/:id",
            component:HuhAddorEdit
          }
        ]
      },
      {
        id:1314,
        text:"ECharts",
        path:"/echarts",
        component:HuhECharts
      },
      {
        id:1315,
        text:"BaiduMap",
        path:"/bmap",
        component:HuhEBmap
      },
    ]
  }
]

// 管理系统开发 = 20%功能开发 + 80%业务开发

// 功能开发：角色管理模块、用户管理模块、菜单管理功能

// CEO  1
// 总监  2
// 经理  3
// 主管  4
// 员工  5
// 保安  6

// 用户管理 -> 要给用户选角色
// 菜单管理 -> 粗粒度的权限管理（要让不同角色的用户，看到不同的页面）
