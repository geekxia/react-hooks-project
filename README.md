## npm i create-react-app -g
```
使用脚手架创建 create-react-app ***
yarn eject 初始化脚手架，让隐藏配置文件暴露
```
## redux + react-redux  大项目中经常用到
```
import { Provider } from 'react-redux'
通过在APP.js中引入store组件和Provider包括视图注入store
import {useSelector,useDispatch} from "react-redux"
状态管理在界面通过Dispatch方法发送到store
store通过combineReducers合并多个模块
在这之前需要封装action,actiontype，所有后端数据都要经过action的方法
方法格式一般是
function 方法名语义化(params){
    return function(dispatch){
        接口名(params).then(res=>{
            dispatch({
                type: type.类型名,
                payload: res
              })
        })
    }
}
在传入store后根据模块分类，根据type储存数据，在页面发出请求payload后通过action储存在store模块中，
所以可以通过在页面调用useSELectore方法获取stroe的数据用compentDidmount渲染在页面
这样就完成了数据缓存，只要不关闭页面和不改变值就一致存在，不需要重复调接口

```

## react-router-dom 
在slider布局上通过引入Navlink




