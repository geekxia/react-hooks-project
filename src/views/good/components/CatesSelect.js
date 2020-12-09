import action from '@/store/actions'
import {
    Select
} from 'antd'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

const { Option } = Select

export default props=>{
    const dispatch = useDispatch()
    const cates = useSelector(store=>store.good.cates)

    useEffect(()=>{
        dispatch(action.getGoodCatesAction())
        return undefined
    },[])


    return(
        <Select
            style={{ width: 200 }}
            placeholder="选择一个品类"
            optionFilterProp="children"
            size = 'small'
            style={{fontSize:'12px',width:'200px'}}
            value={props.value?props.value:''}
            onChange={e=>props.onChange?props.onChange(e):''}
        >
            {
                props.allCate && <Option value='' key='0'>全部</Option>
            }
            {
                cates.length && cates.map(ele=>(
                    <Option value={ele.cate} key={ele._id}>{ele.cate_zh}</Option>
                ))
            }
        </Select>
    )
}