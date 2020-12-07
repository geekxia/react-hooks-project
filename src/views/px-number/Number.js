import React,{useEffect} from "react"

// import { NavLink } from 'react-router-dom'

import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";


import { Breadcrumb } from 'antd';

import routes from '@/views'


import {
    useSelector,
    useDispatch
} from 'react-redux'

import action from "@/store/actions"

export default props =>{
    const list = useSelector(store=>store.number.list)
    let hash = document.location.hash.slice(1)
    console.log(list);
    console.log(hash);
    const FirstMenu = routes.filter(ele=>{
        return ele.children.some(ele=>{
            return ele.path===hash
        })
    })
    console.log('一级菜单',FirstMenu);

    useEffect(()=>{
        console.log('router-history',history)
        return undefined
    },[])
    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href='/'>
                    <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {FirstMenu[0].text}
                </Breadcrumb.Item>
                <Breadcrumb.Item href={hash}>
                    {FirstMenu[0].children[0].text}
                </Breadcrumb.Item>
            </Breadcrumb>
            <hr/>
            <h1>号码归属地</h1>
            <hr/>
            {
                list.map(ele=>(
                    <div key={ele.id}>
                        <span>{ele.number}</span>
                        <span>---</span>
                        <span>{ele.adress}</span>
                    </div>
                ))
            }
        </div>
    )
}