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
      <div className='logo'>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430714945&di=531e09e60e7502f9c2619a04cca832dc&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%3B%2Fsign%3D45186d14d92a283443a636036b8ec8ea%2F2fdda3cc7cd98d1024a871382c3fb80e7bec90be.jpg" alt=""/>
      </div>
      <Menu
        mode="inline"
        theme="red"
      >
      { createNavLink()}
    </Menu>
    </div>
  )
}
