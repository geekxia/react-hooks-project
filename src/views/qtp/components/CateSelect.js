import { Select } from 'antd'

import action from '@/store/actions'

import { useEffect } from 'react'

import { useDispatch,useSelector } from 'react-redux'

const { Option } = Select

export default props=>{
    const dispatch = useDispatch()
    const cates = useSelector(store=>store.qtp.cates)

    useEffect(()=>{
        dispatch(action.getCatesAction())
        return undefined
    },[])


    return (
        <div className='qtp-cate-select'>
            <Select  
            defaultValue="选择品类" 
            style={{ width: 120 }}
            onChange={val=>props.onChange && props.onChange(val)}
            allowClear={props.allowClear}
            >
                {
                   props.hasAll && <Option key='0'>全部</Option> 
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