import { Select } from 'antd'

import action from '@/store/actions'

import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

const { Option } = Select 

export default props => {
    const cateList = useSelector(store=>store.ttGood.cateList)

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(action.cateListAction())
        return undefined
    },[])

    return (
        <div className='tt-goodcate'>
            <Select 
                style={{width: 200}} 
                value={props.value }
                placeholder="选择一个品类" 
                onChange={val=>props.onChange && props.onChange(val)}
                allowClear={props.allowClear}
            >
                {
                    props.hasAll && <Option key='0' value=''>全部</Option>
                }
                {
                    cateList.map(ele=>(
                        <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
                    ))
                }
            </Select>
        </div>
    )
}