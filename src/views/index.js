import loadable from '@loadable/component'
import {
  DotChartOutlined, MehOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(() => import('./home/ReduxStudy'))
const QiangStudy = loadable(() => import('./qiang/qiangqiang'))
const QiangGoods = loadable(() => import("./qiang/qianggoodList"))
const QiangGoodsUpdate = loadable(() => import("./qiang/qianggoodupdate"))

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
    id: 57,
    text: '2009qiang',
    icon: <MehOutlined />,
    children: [
      {
        id: 5701,
        text: '天气预报',
        path: '/qiang',
        component: QiangStudy
      },
      {
        id: 5702,
        text: '商品管理',
        path: '/qianggood/list',
        component: QiangGoods,
        children: [
          {
            id: 570201,
            text: "商品新增编辑",
            path: '/qianggood/update',
            component: QiangGoodsUpdate
          }
        ]
      },
    ]
  }
]
