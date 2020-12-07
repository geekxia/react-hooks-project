import React from 'react'

import routes from '@/views'
import { NavLink } from 'react-router-dom'

import { Menu } from 'antd'
const { SubMenu } = Menu

// console.log('routes', routes)

export default props=>{

  // 用于生成菜单

  const createNavLink = ()=>{
    // exact=true，当url和NavLink.to 完全相等时才高亮
    // exact=flase，当url和NavLink.to 相似就高亮
    var res = []
    function commponent (arr) {
      return arr.map(ele=> {
        if(ele.children) {
          // console.log(ele.children)
          return (
            <SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
              { commponent (ele.children)}
            </SubMenu>
          )
        }
        else {
          return ( 
            <Menu.Item key={ele.id}>
              <NavLink
                to={ele.path}
                exact={ele.exact}
              >
                {ele.text}
              </NavLink>
            </Menu.Item>
          )
        }
      })
    }
    // 1.
    // return routes.map(ele=>(
    //   <SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
    //     {commponent(ele.children)}
    //   </SubMenu>
    // ))
    // 2.
    return commponent(routes)
  }

  return (
    <div className='qf-sider'>

    <Menu
      mode="inline"
      theme="dark"
    >
      { createNavLink()}
    </Menu>
    </div>
  )
}
