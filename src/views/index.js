import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const Xxl =loadable(()=>import('./xxl/Xxl'))
const RenderXxl = loadable(()=>import("./xxl/renderXxl"))
const xxlAddShop = loadable(()=>import("./xxl/xxlAddShop"))
const xxlshopList = loadable(()=>import("./xxl/xxlshopList"))

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
    id: 20201205,
    text: '小溪流文件',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 2020120501,
        text: '基础表单',
        path: '/xxl',
        component: Xxl
      },{
        id: 2020120502,
        text: '渲染基础表单',
        path: '/formmsg',
        component: RenderXxl
      },{
        id: 2020120503,
        text: '新增商品',
        path: '/xxladd/:id',
        component: xxlAddShop
      },{
        id: 2020120504,
        text: '商品列表',
        path: '/xxlshop',
        component: xxlshopList
      }
      
    ]
  }
]
