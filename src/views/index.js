import loadable from '@loadable/component'
import {
    DotChartOutlined
} from '@ant-design/icons'

const Home = loadable(()=>import('./home/Home'))
const User = loadable(()=>import('./user/User'))
const GoodList = loadable(()=>import('./good/wdGoodList'))
const GoodAddOrEdit = loadable(()=>import('./good/wdGoodAddOrEdit'))


export default [ // eslint-disable-line
    {
        id: 11,
        text: '概况管理',
        icon: <DotChartOutlined />,
        children: [
            {
            id: 1111,
            text: '学习Redux',
            path: '/',
            component: Home
            }
        ]
    },
    {
        id: 22,
        text: '个人页',
        children: [
            {
            id: 2211,
            text: '个人中心',
            path: '/user',
            component: User
            }
        ]
    },
    {
        id: 33,
        text: '商品管理',
        children: [
            {
            id: 3311,
            text: '商品列表',
            path: '/good/list',
            component: GoodList,
            children:[
                {
                    id:331111,
                    text:'编辑商品',
                    path:'/good/update/:id',
                    component:GoodAddOrEdit
                }
            ]
            }
        ]
    }
]
