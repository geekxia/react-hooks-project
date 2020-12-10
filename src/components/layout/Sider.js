import React from 'react'

import { logo } from '@/assets/img/index.js'

import routes from '@/views'
import { NavLink } from 'react-router-dom'

import { Menu } from 'antd'
const { SubMenu } = Menu


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

  return (
    <div className='qf-sider'>
      <div className="logo">
        <img src={logo} alt="1"/>
      </div>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
      >
        { createNavLink()}
      </Menu>
    </div>
  )
}
