import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, useLocation, Link } from 'react-router-dom'
import menus from './../../router/menus'

const breadcrumbNameMap={}
const renderBreadcrumbNameMap=(menus)=>{
    menus.forEach((item,index)=>{
        if (item.children) {
            breadcrumbNameMap[item.path] = item.title
            renderBreadcrumbNameMap(item.children)
          } else {
            breadcrumbNameMap[item.path] = item.title
          }
    })
}

renderBreadcrumbNameMap(menus)
console.log(breadcrumbNameMap)

const BreadcrumbCom = withRouter((props) => {
    // console.log(useLocation(), props.location)
    const location = useLocation()
    
    const pathSnippets = location.pathname.split('/').filter(i => i);// /bannermanager/list
    // console.log(pathSnippets) // ["bannermanager", "list"]
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key = { url } style={{lineHeight:'64px'}}>
          <Link to={ url }>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      )
    })
    const breadcrumbItems = [
      <Breadcrumb.Item key = '/' style={{lineHeight:'64px'}}>
        <Link to='/home'>首页</Link>
      </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
    return (
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    )
  })

export default BreadcrumbCom
