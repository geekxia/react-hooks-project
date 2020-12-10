import {Select} from 'antd'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import {cateslistAction} from '@/store/actions'
const { Option } = Select
export default props=>{
    const dispatch =useDispatch()
    const cates=useSelector(store=>store.good.cates)
    useEffect(()=>{
        dispatch(cateslistAction())
        return undefined
    },[])
    return(
        <div>
            <Select 
            placeholder='选择品类'
            allowClear={props.allowClear}
            value={props.value||''}
            style={{ width: 160 }}
            onChange={val=>props.onChange && props.onChange(val)}>
                {
                    props.hasAll && <Option value='' key='0'>全部</Option>
                }
                {
                    cates.map(ele=>(
                    <Option value={ele.cate} key={ele.id}>{ele.cate_zh}</Option>
                    ))
                }
            </Select>
        </div>
    )
}