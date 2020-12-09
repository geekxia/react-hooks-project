import React,{ useState,useEffect } from 'react'

import {
    Select
} from "antd"

import {useSelector,useDispatch} from "react-redux"

import actions from '@/store/actions'
const { Option } = Select;


export default props=>{
    const dispatch = useDispatch()
    // const [value,setValue]=useState('')
    const cates = useSelector(store=>store.good.cates)
    useEffect(()=>{
        dispatch(actions.catesAction())
        return undefined
    },[])
    return (
        <Select 
            style={{width:props.hasAll?'150px':'300px'}}
            allowClear
            onChange={(e)=>props.onChange(e)}
            defaultValue=""
            value={props.value}
        >
            {
                props.hasAll?<Option key='0' value=''>全部</Option>:''
            }
            {   
                cates.map(ele=>(
                    <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
                ))
            }
        </Select>
    )
}