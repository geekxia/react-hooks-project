import { Select } from 'antd';
import {useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import action from '@/store/actions'
const { Option } = Select;

export default props =>{
    const dispatch = useDispatch()
    const cates = useSelector(store=>store.good.cates)

    useEffect(()=>{
        dispatch(action.getCatesAction())
        return undefined
    },[])
    return(
        <div className='qf-cate-select'>
             <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择一个品类"
                onChange={val=>props.onChange && props.onChange(val)}
                allowClear={props.allowClear}                       
            >
                {
                    cates.map(ele=>(
                    <Option 
                    key={ele._id}
                    value={ele.cate}
                    >
                    {ele.cate_zh}
                    </Option>
                    ))
                }
                
                
            </Select>
        </div>
    )
}
