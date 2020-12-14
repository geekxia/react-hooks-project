// 封装品类选择组件

import { Select } from 'antd'
import action from '@/store/actions'  // 需要在生命周期触发
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Option } =Select

export default props=>{
    const dispatch=useDispatch()
    const cates=useSelector(store=>store.good.cates)
    useEffect(()=>{
        dispatch(action.getCatesAction())
        return undefined
    },[])
    return(
        <div>
            <Select
                style={{ width: 200 }}
                placeholder="选择一个品类"
                onChange={(val)=>props.onChange && props.onChange(val)} 
                // 封装品类删除x按钮，父组件传了就有，没传就没有
                allowClear={props.allowClear}
            >
                {
                    props.hasAll && <Option key='0' value=''>全部</Option>
                }
                {
                    cates.map(ele=>(
                        <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
                    )) 
                }
            </Select>
        </div>
    )
}

// onChange={(val)=>props.onChange(val)} : 把自己变化的结果回传给父组件