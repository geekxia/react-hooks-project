import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const FoodList = loadable(()=>import('./ttfood/FoodList'))
const AddGoods = loadable(()=>import('./ttshop/AddGood'))
const TtGoodList = loadable(()=>import('./ttshop/TtGoodList'))
const TestEchart = loadable(()=>import('./home/TestEchart'))
const TestMap = loadable(()=>import('./home/TestMap'))
const TestSocket = loadable(()=>import('./home/TestSocket'))

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
      },{
        id: 1112,
        text: '测试图表',
        path:'/echart',
        component: TestEchart
      },{
        id: 1113,
        text: '测试地图',
        path: '/map',
        component: TestMap
      },{
        id: 1114,
        text: '测试socket',
        path: '/socket',
        component: TestSocket
      }
    ]
  },
  {
    id: 12,
    text: '涛涛美食',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1211,
        text: '菜谱大全',
        path: '/food',
        component: FoodList
      }
    ]
  },
  {
    id: 13,
    text: '涛涛小店',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1311,
        text: '商品列表',
        path: '/ttgood',
        component: TtGoodList
      },
      {
        id: 1312,
        text: '新增商品',
        path: '/ttgood/update/:id',
        component: AddGoods
      }
    ]
  }
]
