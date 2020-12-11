import { Select } from 'antd'
import action from '@/store/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Option } = Select




export default props=>{
    const dispatch=useDispatch()
    const cates = useSelector(store=>store.good.cates)
    useEffect(()=>{
        dispatch(action.getCateList())
        console.log('======',cates)
      return undefined
    },[])
    return(
        <div className='llf-cateSelect'>
           <Select
            showSearch
            value={props.value || ''}
            style={{ width: 200 }}
            placeholder="选择品类"
            onChange={(value)=>props.onChange && props.onChange(value)}
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


  