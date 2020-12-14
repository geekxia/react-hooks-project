##  一. 环境

### 1. React常用脚手架有哪些？
1. create-react-app  
2. umi：https://umijs.org/
3. dva：https://dvajs.com/

---

### 2.包管理器用 yarn
```
cnpm install yarn -g  : 全局安装yarn
yarn install abc -S
yarn install efg -D

自定义yarn命令：
yarn start
yarn build
yarn eject
```
---

### 3. 项目创建
1. cnpm install create-react-app -g ： 全局安装脚手架
2. create-react-app 自己定义的项目名称 ： 创建项目 project

---

### 4. 如何执行eject暴露命令
- 作用：把从create-react-app 隐藏的配置文件暴露出来
```
git init   // 创建本地仓库
git add .   // 全部提交到暂存区
git commit -m '暴露前的提交'   //提交到本地仓库
yarn eject   //暴露
```
### 5. 整理目录:
1. .eslintcache  // eslint缓存文件    --> 删除
2. 修改package.json文件
```js
    1. 修改成："devDependencies"
    2. "dependencies": {  //新建这个对象把react的拿到这,其它环境所需要的不用管,
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    }
```
3. src/index.css文件
    - index.css文件里的内容剪切放到新建的common.scss文件里，index.css删掉。
    - 再src/index.js 修改路径：import './assets/css/common.scss';
    - import reportWebVitals from './reportWebVitals'  和  reportWebVitals(); 这是个报告文件-->删除
4. setupTests.js 、 reportWebVitals.js、App.test.js、App.css、logo.svg 文件 --> 删除
5. App.js文件：修改成的样式
```js
function App() {
  return (
    <div className="app">
      <h1>hello 2009</h1>
    </div>
  );
}
export default App
```
6. 安装 node-sass：cnpm install node-sass@4.14.1 -D
7. 把public文件里面的 robots.txt 和 两张img --> 删除
8. 把manifest.json文件里的上面两张图片的配置对象删除

---
### 6. 项目环境配置改修 
#### 1、scripts目录：
+ ==修改webpack的配置时，有两种方法==：
    - 直接在/config 或 /scripts 中去改
    - 自己封装配置文件来改（建议使用第2种办法） 抽象出来,改了自己知道
- 第一步：scripts>start.js文件 （配置端口号）
```js
1.添加配置端口号：const QfConfig = require('../react.config')
2.修改有端口号使用自己的,没有使用3000端口：
    const DEFAULT_PORT = parseInt(process.env.PORT, 10) || QfConfig.port || 3000;
```
- 第二步：config>paths.js文件 （配置入口和前缀）
```js
+ 修改入口文件
    1.appIndexJs: resolveModule(resolveApp, 'src/main'),  //修改成我们的入口文件
    2.把src下的index.js修改成main.js.

+ 修改前缀：
    1. 添加：const qfConfig = require('../react.config')
    2.   publicUrlOrPath: qfConfig.publicPath || '' ; 打包时看有没有我设置的前缀,有就设置，没有就为空
```
- 第三步：  （配置代理）

```js
+. webpackDevServer.config文件：
    1. 添加：const qfConfig = require('../react.config')
    2. 修改： // `proxy` is run between `before` and `after` `webpack-dev-server` hooks这行下的代码：
         proxy:qfConfig.proxy || proxy,
```
- 第四步： （配置@）
```js
+ webpack.config.js文件：
    77行：   1. 添加：const qfConfig = require('../react.config')
    336:行： 2. 添加：...qfConfig.alias  // 合并
```
- 第五步：  （配置less）
```
538行： 1. 添加支持less：   ...qfConfig.module.rules,
```
- 上面需要和这个文一起配置  -->新建 react.config.js配置
```js
const path = require('path')

module.exports={
    port: 9000,  // 端口号
    publicPath: '',  // 前缀
    proxy:{    //代理
        '/api': {
        target: 'http://10.20.158.117:9999',
        changeOrigin: true
      }
    },
    alias:{  // 配置 @
      '@': path.resolve(__dirname,'src')
    },
     module: {
        rules: [
          // less-loader用于加载.less文件，交给 less 进行编译，编译成 css文件。
          // 如何配置 less 支持 antd 主题色的修改？如下两种方法（二选一）：
          // 一种是使用 webpack 的 less-loader 选项配置
          // 一种是直接修改文件 /node_modules/antd/lib/style/themes/default.less
          { test: /\.less$/, use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'less-loader', options: {
              lessOptions: {
                // 开启JavaScript，支持less中的JS函数
                javascriptEnabled: true,
                // 自定义antd主题
                modifyVars: {
                  "primary-color": "#C27CCD"
                }
              }
            }}
          ]}
        ]
    }
}
```
- 第六步   （关闭eslint）
新建文件.eslintrc.json配置代码如下：
```
{
  "rules": {
    "import/no-anonymous-default-export": 0
  }
}
```



## 二、redux 和 react-redux常用高阶组件：
#### 一：redux：
+ 三大原则：
  - 单一数据源、State是只读的、使用纯函数来执行修改

+ 三大概念：
  - Action、Store()、Reducers其实就是个函数
+ 三大API:
1. createStore(reducer) :用于创建store的；它是redux的store中发挥核心作用的工具，是真正处理数据的地方
2. combineReducers(reducers) ； 合并modules的 （合并多个子store）
3. applyMiddleware(...middlewares) ; 中间件，解决异步的action
    - 需配合第三方插件**redux-thunk**一起使用   /    redux-saga
        - 用于把一个异步action，转化成两个同步的action
        - 即，让 dispatch({}) 支持 dispatch(dispatch=>dispatch({})) 语法
        - 比如我们要把后端异步数据放进Store，在组件中先发送一次空的action，通知调接口
        - 调接口成功后，再把后端真实数据 dispatch() 到Store

---

#### 二：react-redux:
- API:
1. Provider  : 基于react上下文封装的
2. connect() : 连接
3. Hooks()
```js
    useSelector(箭头函数) ：帮直接拿store
    useDispatch() : 派发，派发的是actions
        - dispatch = useDispatch()
        - dispatch(action.changeMsgAction('hello 2011'))  // 我派发个change信号叫你改变他，改变的结果为2011
```

---

### 1、如何使用redux？
**一： 在src/store/index.js中定义store, 伪代码如下：**
-     安装redux：cnpm install redux -S
1. 创建store，怎么创建呢？ createStore(reducerFn)
2. 定义reducerFn: function reducerFn(state={}, action) { switch 语句 }
3. export default store

---

**二：在App.js使用上下文引入store**

- 安装react-redux：cnpm install react-redux -S
- import { Provider } from 'react-redux'
- export default ()=>(<Provider store={store}></Provider>)

---

**三：在组件中，使用store数据**
- 有两种方式：一是使用connect()的写法，二是使用hooks写法：
1. 如果使用connect()的方式：export default connect(fn1, fn2)(Home)
2. 如果使用hooks的方式，const msg = useSelector(store=>store.msg)  // 建议使用 hooks 写法


#### 在环境搭建好之后，我们拿之前的项目页面，需下载以下包：
+ 安装路由：cnpm install react-router-dom -S 
+ 安装antd：cnpm install antd -S
+ 安装loadble: cnpm insatll @loadable/component -S
+ 安装Icons：cnpm install @ant-design/icons -S
+ 安装less：cnpm install less -D 
+ 安装less：cnpm install less-loader less -D 
+ 安装axios：cnpm insatll axios -S
```js
引入： import {HashRouter} from 'react-router-dom'  <HashRouter></HashRouter>
拿Layout文件放在commponents里 ; 在App.js文件引入： import Layout from '@/commponents'
main.js引入less文件 ： import 'and/dist/antd.less'
建个页面目录views/index.js : 需要引入 import loadable from '@loadable/component'
views/创建Home.js页面
```
---

## 二： redux  (三大原则、三个API、三大概念)
+ Redux: 是定义store的 ； 安装：cnpm install redux -S
+ React-Redux: 连接工具 ； 安装：cnpm install react-redux -S

### 1、如何使用redux？
一：在src/store/index.js中定义store, 伪代码如下：
-  安装redux：cnpm install redux -S
1. 创建store，怎么创建呢？ createStore(reducerFn)
2. 定义reducerFn: function reducerFn(state={}, action) { switch 语句 }
    * 参数：第一个：状态初始化数据 ;  第二个：是来自于视图组件的payload
    *  第一步：接受store给的信号（干什么、数据）
    *  第二步：数据处理
    *  第三步：把数据处理完，返回给store。 当stroe拿到新数据后页面就更新了
3. export default store
+ Reducer:

        是函数，并且是纯函数
        它是redux的store中发挥核心作用的工具，是真正处理数据的地方;是store中进行数据处理的唯一的地方
        创建store，必须要定义reducer
---
二：在App.js使用上下文引入store
- 安装react-redux：cnpm install react-redux -S
- import { Provider } from 'react-redux' ； 
- export default ()=>(<Provider store={store}></Provider>)  // Provider基于react上下文创建的
---
三：在组件中，使用store数据
- 有两种方式：一是使用connect()的写法，二是使用hooks写法：
1. 如果使用高阶函数connect()的方式：export default connect(fn1,fn2)(UI组件)
2. 如果使用hooks的方式，const msg = useSelector(store=>store.msg)   // 建议使用 hooks 写法
    * 第一种写法：使用 connect() + 函数式组件
    * 第二种写法：使用 connect() + 类组件
    * 第三种写法：使用 hoks + 函数式组件
> views/Home.js文件代码如下
```js
export default connect(mapStateToPorps,mapDispatchToProps)(props =>{ // 第一种写法
  return(  <div> <h1>{props.msg}</h1> </div> )
})

class Home extends React.Component{   // 第二种写法
  render(){
    return(  <div> <h1>{this.props.msg}</h1> </div>  )
  }
}
export default connect(mapStateToPorps,mapDispatchToProps)(Home)

export default props =>{  // 第三种写法  
  const msg =useSelector(store=>store.msg)
    return(  <div> <h1>{msg}</h1> </div> )
}
```
4. useDispatch() ： 派发，派发的是actions
```js
const dispatch =useDispatch
dispatch({type:'change',payload:'2011'})  // 这里接收的是对像
```

#### 2、actions生成器封装
+ 分模块、分写法：modules
+ 把学习模块单独拿出来到studyReducer.js模块里
+ 那就需要在根stroe中合并 , combineReducers({ }),
  * 那index.js需要把层级修改
  ```js
    import study from './mudules/studyReducer'
    const rootReducer = combineReducers({
      study,
    })
     const store = createStore(rootReducer)
  ```
+ 这个action.type常量，相当于字典索引，避免在团队协作时产生命名冲突 （开发规范）
+ actions 是 视图和Store之间的纽带，action和reducer是间接关系
+ action 是怎么从视图中抵达Store？ 是使用 dispath(action)
  * 视图要使用action生成器
+ 方法一：actions.js文件
```js
const CHANFE_MSG = 'CHANFE_MSG'

// action 生成器  (封装成复用)
function changeMeAction(payload){
    return{
        type:CHANFE_MSG,
        payload
    }
}

export {
    CHANFE_MSG,    
    changeMeAction
}
那就在对应的分模块地方使用可直接字典的变量：CHANFE_MSG
视图：导入语法：import { changeMeAction } from '@/store/actions'
      触发语法：changeMeAction('hello 2011')
```
+ 方法二： 
```js
actionTypes.js文件：
 //一次性全在这里抛出
const CHANFE_MSG = 'CHANFE_MSG'
export { CHANFE_MSG }   

// 对应的分模块地方使用字典
import type from '../actionType'
type.CHANFE_MSG   //使用时

action.js文件 
引入：import type from './actionTypes'   //封装就在这单独写个文件
function changeMeAction(payload){
    return{
        type:type.CHANFE_MSG,  //这里就得加type了
        payload
    }
}
导出：export default{changeMeAction}

// 在视图页面使用：
导入语法： import action from '@/store/action'
触发语法：action.changeMeAction('hello 2011')
```
---

#### 3、redux-thunk支持异步action
> 案例： 音乐列表
+ 把路由拿过来, 以下是书写音乐列表的顺序思路:
```html
  页面中要使用QQ音乐列表？数据从后端来，要状态管理工具来
1. 状态管理工具有这个QQ音乐列表？没有，我定义，怎么定义？  创建个store
   在reducer中定义完成，在根store中合并
2. 现在我要在页面中使用 音乐列表，怎么使用？useSelector()

已经知道QQ音乐数据来自后端，它必须经过store才能进入到组件
那QQ音乐数据，该怎么进入到store？

-  redux不支持异步数据
```

3. applyMiddleware() ,中间件，解决异步的action
    - 需配合第三方插件redux-thunk一起使用
        - 用于把一个异步action，转化成两个同步的action
        - 即，让 dispatch({}) 支持 dispatch(dispatch=>dispatch({})) 语法
        - 比如我们要把后端异步数据放进Store，在组件中先发送一次空的action，通知调接口
        - 调接口成功后，再把后端真实数据 dispatch() 到Store
> store/index.js
```js
import { applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
const store = createStore(rootReducer,applyMddleware(thunk))
```
> action.js
```js
import { fetchQqMusic } from '@/utils/api'  // 把api里的fetchQqMusic导入进来

function musicListAction(params) {
  return function(dispatch) {   // 这个dispatch是个形参，进行过二次封装的
    fetchQqMusic(params).then(res=>{
      console.log('-----', res)
      // 这才是真正地把后端数据，发送到store中
      dispatch({
        type: type.AJAX_MUSIC_LIST,
        payload: res.song.list  // 音乐列表
      })
    })
  }
}


在页面中使用调接口： Home.js
import React, { useEffect } from 'react'   //  useEffect副作用
useEffect(()=>{
    const str = 'ct=24&qqmusic_ver=1298&new_json=1&remoteplace=txt.yqq.song&searchid=61453023483879617&t=0&aggr=1&cr=1&catZhida=1&lossless=0&flag_qc=0&p=1&n=10&w=%E5%BC%A0%E6%9D%B0&g_tk_new_20200303=921856724&g_tk=921856724&loginUin=448914712&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0'
    const params = {}
    str.split('&').map(ele=>{
      let arr = ele.split('=')
      params[arr[0]] = arr[1]
    })
    params.w = decodeURI(params.w)
    dispatch(action.musicListAction(params))  // 触发调接口   // 这个是第一次发送个空的dispatch
    return undefined
  }, [])

react.config.js文件配置代理
  proxy: { 
    '/soso': {
      target: 'https://c.y.qq.com',
      changeOrigin: true
    }
  }, 

  页面music.js
  import type from '../actionTypes'
  export default (state=initState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.AJAX_MUSIC_LIST:
      newState.list = action.payload
      break
    default:
  }
  return newState
}
```
---
### 4、商品列表
+ 新增跳到详情用动态路由
+ Table  表格   
   * rowKey='_id' : 用于当初key
   * sorter: (a,b )=> a.price - b.price,  ：用于排序
+ Form   表单   ： 用于商品名称   
  * valuePropName 进行双向数据绑定，取值
  * onValuesChange	字段值更新时触发回调事件
+ Input  输入框  ： 用于商品描述
+ Sele ct选择器
+ InputNumber数字输入框
+ Upload上传
+ Switch开关
+ Grid 栅格系统

+ 查询：
  * Grid栅格
  * Button按钮
  * Select开关 / 用于做热销开关 / const { Option } = Select  // 用于热销布尔值的切换

+ 删除:
  * Modal对话框 : 确认对话框 confirm
    * Table  用于多删 ' / rowSelection
    * content:
    ```js
         content:<div>       //这个是react元素，可换行
                <div>你确定要删除 {ele} 吗？</div>
                <div>是吗？</div>
            </div>
    ```




#### moment时间框架
+ cnpm install moment -S
+ render: text=> <div>{moment(text).format('MM-DD HH:mm')}</div> : 格式化时间
+ moment('2020-03-29 2:22:35').valueOf()  : 这个转换的是到1978年0点0分的时间戳




```js
├── react.config.js        统一修改配置的记录地方
├── .eslintrc.json        关闭eslint规则
├──src
|  ├── App.js          根组件
|  ├── index.js        入口文件
|  ├── assets
|  |   ├── css
|  |       ├── common.scss     重置样式(把原本src下index.css内容拿过来)
|  ├── component
|  |   ├── layout           默认是UI组件,里面没什么具体业务逻辑,进行无状态组件封装
|  |   └── index.js
|  ├── views                页面目录
|  |   ├── home
|  |   |   ├── Home.js 
|  |   └── index.js
|  ├── store                
|  |   ├── index.js           根store
|  |   ├── mudules                    模块管理
|  |   |   ├── studyReducer.js        学习模块
|  |   |   └── musicReducer.js        音乐模块
|  |   ├── actions.js         模块化解决方案，把共同的提取出来 (actionTypes)
|  ├── utils
|  |   ├── axios.js
|  |   ├── api.js
```





# Git
## 初始化配置
```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
  - 把配置好的邮箱发给领导，让领导把你加入到项目组中。
  - 然后在GitLab中就可以看到领导给你的这个项目。

## 如何需要做初始提交（一般用不到）
```
git init
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/summer2020/xxxxxx.git
git push -u origin master
```

## 第一次拉取公司的代码
```
git clone https://gitee.com/summer2020/qf-minimap.git
git branch --list   在项目根目录中，查看所有分支
git branch xhf  创建自己的开发分支
git checkout xhf  切换到自己的分支
```
  - 然后你想干啥就干啥，写你的代码。

## 当我们想提交代码时
```
git add .
git commit -m '修复了bug'
git push origin xia
```

## 当需要把 abc 分支合并到 xia 分支时，怎么做？
```
git add .
git commit -m '准备合并分支'   每次checkout之前都要把当前分支中的代码提交到本地仓库，避免代码丢失
git checkout abc
git pull   把远程abc分支中的最新代码，更新到本地abc分支中
git checkout xia
git merge abc  把本地abc分支中的代码，合并到xia分支，从而我就拥有abc+xia最新代码
  合并分支时，可能会出现冲突。什么是冲突？是git不知道怎么做、希望争取你的意见。
  什么是冲突合并？实际上就是让你来人为决定使用abc代码，还是使用自己xia的代码？
  冲突合并完成后，可以提交代码、保存。
git add .
git commit -m '分支合并完成'
git push origin xia
```