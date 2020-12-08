import React from 'react'

import routes from '@/views'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
export default props=>{

  // 生成路由匹配规则，当url和Route.path匹配成功，显示当前配对成功的Route.component
  // 凡是被 Route 组件直接包裹的React组件中，其props上都路由相关的API
  const createRoutes = ()=>{
    let res = []
    // 这是递归方法
    const recursionRoute = arr => {
      
      arr.map(ele=>{
        if(ele.children && ele.children.length > 0) {
          recursionRoute(ele.children)
          return undefined
        }
        else {
          res.push(
            <Route
              key={ele.id}
              path={ele.path}
              component={ele.component}
              exact = {ele.exact}
            />
          )
        } 
        return undefined
      })
    }
    routes.map(ele=>{
      if(ele.children) {
        // 调用递归方法，生成 Route 数组
        recursionRoute(ele.children)
      }
      return undefined
    })
    return res
  }

  return (
    <div className='qf-main'>
      {/*
        作用：用于把 Route数组组件包裹起来，当Url变化时从上到下进行匹配，匹配成功即终止
        当Route数组被包裹起来，建议给 Route都加上exact属性。
        在生成 Route 数组时，其外层不能包裹任何其实HTML节点，它的直接父组件只能是 Switch
      */}
      <Switch>
        { createRoutes() }
        <Redirect from='/*' to='/' />
      </Switch>
    </div>
  )
}
