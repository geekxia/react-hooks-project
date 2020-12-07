import loadable from '@loadable/component'
import {
  DotChartOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const PageOne = loadable(()=>import('./zj/Pageone'))
const PageTwo = loadable(()=>import('./zj/Pagetwo'))
const GoodList=loadable(()=>import('./zj/GoodList'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1111,
        text: '学习Redux',
        path: '/',
        component: ReduxStudy
      }
    ]
  },
  {
    id:12,
    text:'赵杰测试',
    icon:<CustomerServiceOutlined/>,
    children:[
      {
        id:1211,
        text:'页面1',
        path:'/pageone',
        component:PageOne
      },
      {
        id:1212,
        text:'页面2',
        path:'/pagetwo',
        component:PageTwo
      },
      
    ]
  },
  {
    id: 1213,
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1310,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 1311,
            text: '商品新增与编辑',
            path: '/good/update',
            component: PageTwo
          }
        ]
      }
    ]
  },
]
