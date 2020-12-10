import loadable from '@loadable/component'
import {
  DotChartOutlined,
  FormOutlined ,
  TableOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
// 表单页的三个页面
const Basic = loadable(()=>import('./form/Basic'))
const Distribution = loadable(()=>import('./form/Distribution'))
const Advanced = loadable(()=>import('./form/Advanced'))

//商品页的两个页面
const ShopList = loadable(()=>import('./shop/ShopList'))
const ShopAddOrEdit = loadable(()=>import('./shop/ShopAddOrEdit'))


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
    text: '表单页',
    icon: <FormOutlined />,
    children: [
      {
        id: 1201,
        text: '基础表单',
        path: '/form/basic',
        component: Basic
      },
      {
        id: 1202,
        text: '分布表单',
        path: '/form/advanced',
        component: Distribution
      },
      {
        id: 1203,
        text: '高级表单',
        
        path: '/form/distribution',
        component: Advanced
      }
    ]
  },
  {
    id: 13,
    text: '商品页',
    icon: <TableOutlined />,
    children: [
      {
        id: 1301,
        text: '商品列表',
        path: '/shop/list',
        component: ShopList,
        children:[
          {
            id:130101,
            text:'商品新增',
            path:'/shop/addList/:id',
            component:ShopAddOrEdit
          }
        ]
      }
    ]
  }
]
