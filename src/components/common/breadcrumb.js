import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter, useLocation, Link } from 'react-router-dom'
import routes from '@/views'

const breadcrumbNameMap = {}
const renderBreadcrumbNameMap = (routes) => {
    routes.forEach((item, index) => {
        if (item.children) {
            breadcrumbNameMap[item.path] = item.text
            renderBreadcrumbNameMap(item.children)
        } else {
            breadcrumbNameMap[item.path] = item.text
        }
    })
}

renderBreadcrumbNameMap(routes)


const BreadcrumbList = withRouter((props) => {
    // console.log(breadcrumbNameMap)
    console.log(useLocation(), props.location)
    const location = useLocation()

    const pathSnippets = location.pathname.split('/').filter(i => i);
    console.log(pathSnippets)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
        console.log(url)
        return (
            <Breadcrumb.Item key={url} style={{ lineHeight: '30px' }}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        )
    })
    const breadcrumbItems = [
        <Breadcrumb.Item key='/' style={{ lineHeight: '30px' }}>
            <Link to='/home'>首页</Link>
        </Breadcrumb.Item>
    ].concat(extraBreadcrumbItems)
    return (
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    )
})

export default BreadcrumbList