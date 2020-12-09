import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'


const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Find = loadable(()=>import('./liufind/Find.js'))
const GoodList = loadable(()=>import('./liufind/GoodList.js'))

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
    id:12,
    text:'liuyahua练习页面',
    children:[
      {
        id:1201,
        text:'表格新增呀',
        path:'/find/:id',
        component:Find
      },
      {
        id:1202,
        text:'商品列表呀',
        path:'/goodlist',
        component:GoodList
      }
    ]
  }
]
