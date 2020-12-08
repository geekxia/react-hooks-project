import loadable from '@loadable/component'
import React from "react"
import {  
  DotChartOutlined,
  FormOutlined
} from '@ant-design/icons'
const GoodList = loadable(()=>import('./good/GoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/GoodAddOrEdit'))
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
        id: 2222,
        text: '基础表单',
        path: '/basic-form',
        component: jiChuBiaoDan
      }
    ]
  },
  {
    id: 13,
    text: '商品管理',
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1210,
        text: '商品列表',
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 121010,
            text: '商品新增与编辑',
            path: '/good/update/:id',
            component: GoodAddOrEdit
          }
        ]
      }
    ]
  }
]
