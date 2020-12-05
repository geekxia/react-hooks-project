import loadable from '@loadable/component'
import {
  DotChartOutlined,
  UserDeleteOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const ztyBasicForm = loadable(()=>import('./zhaoty/ztyBasicForm'))
const ztyTableList = loadable(()=>import('./zhaoty/ztyTableList'))

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
    id:30009000,
    text:'zhaoty',
    icon:<UserDeleteOutlined />,
    children:[
      {
        id:'30009001',
        text:'基础表单',
        path:'/zhao/basic-form',
        component:ztyBasicForm
      },
      {
        id:30009002,
        text:'查询表格',
        path:'/zhao/table-list',
        component:ztyTableList
      }
    ]

  }
]
