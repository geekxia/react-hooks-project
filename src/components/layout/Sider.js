import React from 'react'

import routes from '@/views'
import { NavLink } from 'react-router-dom'

import { Menu } from 'antd'
// import imgLogo  from '@/utils/img.js'
import imgLogo  from '@/assets/img/logo.jpg'
const { SubMenu } = Menu

console.log('routes', routes)
console.log('imgLogo',imgLogo.imgLogo)

export default props=>{

  // 用于生成菜单
  const createNavLink = ()=>{
    // exact=true，当url和NavLink.to 完全相等时才高亮
    // exact=flase，当url和NavLink.to 相似就高亮
    return routes.map(ele=>(
      <SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
        {
          ele.children && ele.children.map(ele=>(
            <Menu.Item key={ele.id}>
              <NavLink
                to={ele.path}
                exact={!ele.notExact}
              >
                {ele.text}
              </NavLink>
            </Menu.Item>
          ))
        }
      </SubMenu>
    ))
  }

  const logo = ()=>{
    return (
      <img src={imgLogo} alt=""/>
    )
  }

  return (
    <div className='qf-sider'>
      <div className='qf-logo'>
        {logo()}
      </div>
      <Menu
        mode="inline"
        theme="dark"
      >
        { createNavLink()}
      </Menu>
    </div>
  )
}
