
import { Select } from 'antd';
const { Option } = Select;
import action from '@/store/actions'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'



export default props=>{

  const dispatch = useDispatch()
  const list = useSelector(store=>store.cate.list)
  useEffect(()=>{
    dispatch(action.goodShawnCateAction())
    return undefined
  },[])
  return(
    <div>
      <Select 
        placeholder='请选择一个品类' 
        style={{ width: 150 }} 
        value={props.value || ''}
        onChange={val=>props.onChange(val)}
        allowClear={props.allowClear}
      >
        {
          props.hasAll && <Option key='0' value=''>全部</Option>
        }
        {
          list.map(ele=>(
            <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
          ))
        }
      </Select>
    </div>
  )
}