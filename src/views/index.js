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
