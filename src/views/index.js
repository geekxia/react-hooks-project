import loadable from '@loadable/component'
import React from "react"
import {  
  DotChartOutlined,
  FormOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
const jiChuBiaoDan = loadable(()=>import('./pages/BiaoDanYe/jiChuBiaoDan'))


export default [ // eslint-disable-line
  {
    id: 11,
    text: '概况管理啊',
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
    id: 12,
    text: '表单页',
    icon: <FormOutlined />,
    children: [
      {
        id: 1111,
        text: '基础表单',
        path: '/biao',
        component: jiChuBiaoDan
      }
    ]
  }
]
