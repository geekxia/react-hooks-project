import loadable from '@loadable/component'
import {
  DotChartOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))


const lonxuexiongList = loadable(()=>import('./tabel/lonxuexiongList'))


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
    id: 14,
    text: '表单业',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1411,
        text: '基数表单',
        path: '/list',
        component: lonxuexiongList
      }
    ]
  }
]
