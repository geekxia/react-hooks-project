import loadable from '@loadable/component'
import {
  FormOutlined,
  HomeOutlined,
  AreaChartOutlined,
  WarningOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const AdvAnalyze = loadable(()=>import('./xfwadv/AdvAnalyze'))
const AddProduct = loadable(()=>import('./xfwform/AddProduct'))
const ErrorFore = loadable(()=>import('./xfwerror/ErrorFore'))
const ErrorThree = loadable(()=>import('./xfwerror/ErrorThree'))
const ErrorFive = loadable(()=>import('./xfwerror/ErrorFive'))
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAdd = loadable(()=>import('./good/GoodAdd'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理',
    icon: <HomeOutlined />,
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
    text:'销量统计',
    icon:<AreaChartOutlined />,
    children:[
      {
        id:1201,
        text:'穿搭类',
        path:'/areaChart',
        component:AdvAnalyze
      }
    ]
  },
  {
    id:13,
    text:'表单页',
    icon:<FormOutlined/>,
    children:[
      {
        id:1301,
        text:'添加商品',
        path:'/add',
        component:AddProduct
      }
    ]
  },
  {
    id:14,
    text:'异常页',
    icon:<WarningOutlined />,
    children:[
      {
        id:1401,
        text:'404',
        path:'/404',
        component:ErrorFore
      },
      {
        id:1402,
        text:'403',
        path:'/403',
        component:ErrorThree
      },
      {
        id:1403,
        text:'500',
        path:'/500',
        component:ErrorFive
      }
    ]
  },
  {
    id:15,
    text:'商品管理',
    icon:<ShoppingCartOutlined />,
    children:[
      {
        id:1501,
        text:'商品列表',
        path:'/good/list',
        component:GoodList,
        children:[
          {
            id:150101,
            text:'商品添加',
            path:'/good/add/:id',
            component:GoodAdd
          }
        ]
      }

    ]
  }
]
