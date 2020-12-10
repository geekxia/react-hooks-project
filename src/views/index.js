import loadable from '@loadable/component'
import {
    DotChartOutlined,
    DashboardOutlined,
    FormOutlined,
    TableOutlined,
    ProfileOutlined,
    CheckCircleOutlined,
    WarningOutlined,
    UserOutlined,
    HighlightOutlined,
    TeamOutlined,
    ShoppingOutlined
} from '@ant-design/icons'

const ReduxStudy = loadable(() => import('./home/ReduxStudy'))

// Dashboard
const AnalysePage = loadable(() => import('./yyj/Dashboard/AnalysePage'))
const MonitorPage = loadable(() => import('./yyj/Dashboard/MonitorPage'))
const WorkPage = loadable(() => import('./yyj/Dashboard/WorkPage'))

// 表单页FormPage
const BasicsForm = loadable(() => import('./yyj/FormPage/BasicsForm'))
const Distribution = loadable(() => import('./yyj/FormPage/Distribution'))
const AdvForm = loadable(() => import('./yyj/FormPage/AdvForm'))

// 列表页ListPage
const Search = loadable(() => import('./yyj/ListPage/Search'))
const EnquiryForm = loadable(() => import('./yyj/ListPage/EnquiryForm'))
const StandardList = loadable(() => import('./yyj/ListPage/StandardList'))
const CardList = loadable(() => import('./yyj/ListPage/CardList'))

// 详情页DetailsPage
const BasicsDetails = loadable(() => import('./yyj/DetailsPage/BasicsDetails'))
const AdvDetails = loadable(() => import('./yyj/DetailsPage/AdvDetails'))

// 结果页ResultPage
const SucPage = loadable(() => import('./yyj/ResultPage/SucPage'))
const LosePage = loadable(() => import('./yyj/ResultPage/LosePage'))

// 异常页AbnormalPage
const A403 = loadable(() => import('./yyj/AbnormalPage/A403'))
const A404 = loadable(() => import('./yyj/AbnormalPage/A404'))
const A500 = loadable(() => import('./yyj/AbnormalPage/A500'))

// 个人页PersonPage
const MyCenter = loadable(() => import('./yyj/PersonPage/MyCenter'))
const SetPage = loadable(() => import('./yyj/PersonPage/SetPage'))

// 图形编辑器GraphPage
const Flow = loadable(() => import('./yyj/GraphPage/Flow'))
const MindMap = loadable(() => import('./yyj/GraphPage/MindMap'))
const Topology = loadable(() => import('./yyj/GraphPage/Topology'))

// 商品管理
const GoodList = loadable(() => import('./yyj/Good/goodList'))
const GoodAddOrEdit = loadable(() => import('./yyj/Good/GoodAddOrEdit'))

// 用户模块
const UserList = loadable(() => import('./yyj/Users/UserList'))
export default [ // eslint-disable-line
    /* {
      id: 11,
      text: '概况管理',
      icon: <DotChartOutlined />,
      children: [
        {
          id: 1111,
          text: '学习Redux',
          path: '/',
          component: ReduxStudy
        }
      ]
    }, */
    {
        id: 12,
        text: '商品管理',
        icon: <ShoppingOutlined />,
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
    },
    {
        id: 13,
        text: '用户管理',
        icon: <TeamOutlined />,
        children: [
            {
                id: 1310,
                text: '用户列表',
                path: '/user/list',
                component: UserList
            }
        ]
    },
    {
        id: 50,
        text: '结果页',
        icon: <CheckCircleOutlined />,
        children: [
            {
                id: 5010,
                text: '成功页',
                path: '/sucPage',
                component: SucPage
            },
            {
                id: 5011,
                text: '失败页',
                path: '/losePage',
                component: LosePage
            }
        ]
    },
    {
        id: 60,
        text: '异常页',
        icon: <WarningOutlined />,
        children: [
            {
                id: 6010,
                text: '403',
                path: '/a403',
                component: A403
            },
            {
                id: 6011,
                text: '404',
                path: '/a404',
                component: A404
            },
            {
                id: 6012,
                text: '500',
                path: '/a500',
                component: A500
            }
        ]
    },
    {
        id: 10,
        text: 'Dashboard',
        icon: <DashboardOutlined />,
        children: [
            {
                id: 1010,
                text: '分析页',
                path: '/',
                component: AnalysePage
            },
            {
                id: 1011,
                text: '监控页',
                path: '/monitorPage',
                component: MonitorPage
            },
            {
                id: 1012,
                text: '工作台',
                path: '/workPage',
                component: WorkPage
            }
        ]
    },
    /* {
        id:20,
        text:'表单页',
        icon:<FormOutlined />,
        children:[
            {
                id:2010,
                text:'基础表单',
                path:'/basicsForm',
                component: BasicsForm
            },
            {
                id:2011,
                text:'分步表单',
                path:'/distribution',
                component: Distribution
            },
            {
                id:2012,
                text:'高级表单',
                path:'/advForm',
                component: AdvForm
            }
        ]
    },
    {
        id:30,
        text:'列表页',
        icon:<TableOutlined />,
        children:[
            {
                id:3010,
                text:'搜索列表',
                path:'/search',
                component: Search
            },
            {
                id:3011,
                text:'查询列表',
                path:'/enquiryForm',
                component: EnquiryForm
            },
            {
                id: 3012,
                text: '标准列表',
                path: '/standardList',
                component: StandardList
            },
            {
                id: 3013,
                text: '卡片列表',
                path: '/cardList',
                component: CardList
            }
        ]
    },
    {
        id:40,
        text:'详情页',
        icon:<ProfileOutlined />,
        children:[
            {
                id:4010,
                text:'基础详情页',
                path:'/basicsDetails',
                component: BasicsDetails
            },
            {
                id:4011,
                text:'高级详情页',
                path:'/advDetails',
                component: AdvDetails
            }
        ]
    },
    {
        id:70,
        text:'个人页',
        icon:<UserOutlined />,
        children:[
            {
                id:7010,
                text:'个人中心',
                path:'/myCenter',
                component:MyCenter
            },
            {
                id:7011,
                text:'个人设置',
                path:'/setPage',
                component:SetPage
            }
        ]
    },
    {
        id:80,
        text:'图形编辑器',
        icon:<HighlightOutlined />,
        children:[
            {
                id:8010,
                text:'流程编辑器',
                path:'/flow',
                component:Flow
            },
            {
                id: 8011,
                text:'脑图编辑器',
                path:'/mindMap',
                component:MindMap
            },{
                id: 8012,
                text:'拓扑编辑器',
                path:'/topology',
                component:Topology
            }
        ]
    },
    {
        id: 90,
        text: 'ReduxStudy',
        icon:<HighlightOutlined />,
        children: [
            {
                id: 9010,
                text: 'ReduxStudy',
                path:'/reduxStudy',
                component: ReduxStudy
            }
        ]
    } */
]
