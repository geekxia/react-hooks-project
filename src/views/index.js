import loadable from '@loadable/component'
import {
  DotChartOutlined,
  // <BellFilled />,
  // <AlipaySquareFilled />
  // <Html5Filled />
  // <ClusterOutlined />
  // <ContactsOutlined />
  // <InfoCircleOutlined />
  // <DislikeOutlined />
  MenuUnfoldOutlined,
  FileUnknownOutlined,
  // <HeartOutlined />
  // <MessageOutlined />
  // <StarOutlined />
  UserOutlined,
  // <SearchOutlined />
  // <TaobaoCircleOutlined />
  // <DingdingOutlined />
} from '@ant-design/icons'
const User = loadable(()=> import('@/views/user/user.js'))
// const UserSetting = loadable(()=> import('@/views/user/userSetting.js'))
import UserSetting from '@/views/user/userSetting.js'
const ReduxStudy = loadable(()=>import('./home/ReduxStudy'))
import {
  BaseDetail,
  AdvanceDetail
} from '@/views/detail/index.js'
import {
  ApplyList,
  ArticleList,
  CatalogueList,
  CardList,
  SearchTab,
  StandardList
} from '@/views/list/index'
import A from '@/views/list/index'
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
        exact: true, 
        component: ReduxStudy
      }
    ]
  },
  {
    id: 30,
    text: '个人中心',
    icon: <UserOutlined />,
    children: [
      {
        id: 3001,
        text: '个人中心',
        path: '/userCenter',
        component: User
      },
      {
        id: 3002,
        text: '个人设置',
        path: '/userSetting',
        component: UserSetting
      }
    ]
  },
  {
    id: 40,
    text: '详情页',
    icon: <MenuUnfoldOutlined />,
    children: [
      {
        id: 4001,
        text: '基础详情页',
        path: '/baseDetail',
        component: BaseDetail
      },
      {
        id: 4002,
        text: '高级基础',
        path: '/advanceDetail',
        component: AdvanceDetail
      }
    ]
  },
  {
    id: 50,
    text: '列表页',
    icon: <MenuUnfoldOutlined />,
    children: [
      {
        id: 5001,
        text: '搜索列表',
        children:[
          {
            id: 50011,
            text: '搜索列表（文章）',
            path: '/articleList',
            component: ArticleList
          },
          {
            id: 50012,
            text: '搜索列表（目录）',
            path: '/catalogueList',
            component: CatalogueList
          },
          {
            id: 50013,
            text: '搜索列表（应用）',
            path: '/applyList',
            component: ApplyList
          }
        ]
      },
      {
        id: 5004,
        text: '查询表格',
        path: '/searchTab',
        component: SearchTab
      },
      {
        id: 5002,
        text: '标准列表',
        path: '/standardList',
        component: StandardList
      },
      {
        id: 5003,
        text: '卡片列表',
        path: '/cardList',
        component: CardList
      }
    ]
  }
]
