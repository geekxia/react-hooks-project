import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

// redux-thunk   redux-saga
import thunk from 'redux-thunk'
// 用于把一个异步action，转化成两个同步的action
// 即，让 dispatch({}) 支持 dispatch(dispatch=>dispatch({})) 语法
// 比如我们要把后端异步数据放进Store，在组件中先发送一次空的action，通知调接口
// 调接口成功后，再把后端真实数据 dispatch() 到Store

import study from './modules/study'
import music from './modules/music'
import good from './modules/good'


export default createStore(combineReducers({
  study,
  music,
  good
}), applyMiddleware(thunk))

// 如何使用redux？

// 一、在src/store/index.js中定义store, 伪代码如下：

// cnpm install redux -S
// 1、创建store，怎么创建呢？ createStore(reducerFn)
// 2、定义reducerFn， function reducerFn(state={}, action) { switch 语句 }
// 3、export default store

// 二、在App.js使用上下文引入store

// cnpm install react-redux -S
// import { Provider } from 'react-redux'
// export default ()=>(<Provider store={store}></Provider>)

// 三、在组件中，使用store数据

// 有两种方式：一是使用connect()的写法，二是使用hooks写法：
// 1、如果使用connect()的方式：export default connect(fn1, fn2)(Home)
// 2、如果使用hooks的方式，const msg = useSelector(store=>store.msg)
// 建议使用 hooks 写法


// 面试：三三原则

// 第1个"三"：
// createStore(combineReducers({aReducer, bReducer}), [initState], applyMiddleware(saga))
// createStore，是创建store，要求必须有reducer传入
// combineReducers，是用于把一个大的reducer，切分成多个子reducer
// applyMiddleware，用于扩展redux的功能，比如调接口时，支持把异步action转化成同步的action

// 第2个“三”：
// Store，是Redux存储数据的中心，它可以接收dispatch过来的action，把action分配给reducer进行处理，当Store中的数据发生变化时，页面视图自动更新。
// Reducer,是函数，还是纯函数，它用于处理Store分配给自己的任务、处理数据、返回新Store。
// Action，是视图和Store的纽带，它是被dispatch(action)发送到Store中的，action的固定格式是{type,payload}

// 第3个“三”：
// 即，Store的三个特点
// Store是只读的，不能直接修改，建议使用深复制的方式生成新Store，再修改。
// Store是单一数据源
// Store，只能使用纯函数来修改
