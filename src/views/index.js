import loadable from '@loadable/component';
import {
  DotChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const BasicForm = loadable(()=>import('./form/BasicForm'));
const SeniorForm = loadable(()=>import('./form/SeniorForm'));
const TestRedux = loadable(()=>import('./home/TestRedux'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEit = loadable(()=>import('./good/GoogAddOrEdit'));

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
        id: 1111,
        text: '学习Redux哟',
        path: '/',
        component: ReduxStudy
      },
      {
        id:1110,
        text:'类组件形式',
        path:'/redux/class',
        component:TestRedux
      }
    ]
  },
  {
    id:21,
    text:'工作表单',
    icon:<AppstoreOutlined/>,
    children:[
      {
        id:2101,
        text:'基础表单',
        path:'/basic',
        component:BasicForm
      },
      {
        id:2102,
        text:'高级表单',
        path:'/senior',
        component:SeniorForm
      }
    ]
  },
  {
    id:31,
    text:'商品管理',
    icon:<DotChartOutlined />,
    children:[
      {
        id:3110,
        text:'商品列表',
        path:'/good/list',
        component:GoodList,
        children:[
          {
            id:311010,
            text:'商品新增与编辑',
            path:'/good/updata/:id',
            component:GoodAddOrEit
          }
        ]
      }
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