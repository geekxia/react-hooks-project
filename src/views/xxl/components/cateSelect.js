import React,{useState,useEffect} from "react"
import {Select} from "antd"
const { Option } = Select
import { useSelector,useDispatch } from "react-redux"
import action from '@/store/actions'

export default props=>{
    let cates =  useSelector(store=>store.xxlgetshop.cates)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(action.xxlgetcates({}))
        return undefined
    },[])
    console.log("品类",cates)
    return (
        <div>
            <Select 
                style={{ width: 200 }} 
                placeholder="选择一个品类"
                onChange={val=>props.onChange && props.onChange(val)}
                allowClear={props.allowClear}
            >
                {
                    props.hasAll && <Option key='0' value=''>全部</Option>
                }
                {
                    cates.map(ele=>(
                        <Option 
                            value={ele.cate} 
                            key={ele._id}
                        >
                            {ele.cate_zh}
                        </Option>
                    ))
                }
            </Select>
        </div>
    )
}