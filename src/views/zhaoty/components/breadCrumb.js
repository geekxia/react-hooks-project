import React from 'react'
import { Breadcrumb } from 'antd';
import { useHistory } from "react-router-dom"

const ztyBreadCrumb = props=>{
    let history = useHistory()
    console.log('我是面包屑,我有高阶组件的信息',history.location.pathname)
    return (
        <div className='zty-bread-crumb'>
            <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Application Center</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}
export default ztyBreadCrumb