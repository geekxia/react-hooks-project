import loadable from "@loadable/component";
import { DotChartOutlined, AppleOutlined } from "@ant-design/icons";

const Home = loadable(() => import("./home/Home"));
const OneTwo = loadable(() => import("./home/OneTwo"));
const TestRedux = loadable(() => import("./home/TestRedux"));
const TestReduxHook = loadable(() => import("./home/TestReduxHook"));
const GoodList = loadable(() => import("./good/GoodList"));
const TwoTwo = loadable(() => import("./good/TwoTwo"));
const KzkTest = loadable(() => import("./kzk/KzkTest"));
const GoodAddOrEdit = loadable(() => import("./good/GoodAddOrEdit"));

export default [
  // eslint-disable-line
  {
    id: 11,
    text: "概况管理",
    icon: <DotChartOutlined />,
    children: [
      {
        id: 1110,
        text: "表格展示",
        path: "/",
        component: OneTwo,
      },
      {
        id: 1111,
        text: "page12",
        path: "/OneTwo",
        component: Home,
      },
      {
        id: 1112,
        text: "TestRedux",
        path: "/TestRedux",
        component: TestRedux,
      },
      {
        id: 1113,
        text: "TestReduxHook",
        path: "/TestReduxHook",
        component: TestReduxHook,
      },
    ],
  },
  {
    id: 12,
    text: "商品管理",
    icon: <AppleOutlined />,
    children: [
      {
        id: 1210,
        text: "商品列表",
        path: "/Good/list",
        component: GoodList,
        children: [
          {
            id: 121010,
            text: "商品新增与编辑",
            path: "/Good/update/:id",
            component: GoodAddOrEdit,
          },
        ],
      },
      {
        id: 1211,
        text: "商品待定",
        path: "/TwoTwo",
        component: TwoTwo,
      },
    ],
  },
  {
    id: 13,
    text: "康泽凯测试",
    icon: <AppleOutlined />,
    children: [
      {
        id: 1310,
        text: "康泽凯测试",
        path: "/KzkTest",
        component: KzkTest,
      },
    ],
  },
];
