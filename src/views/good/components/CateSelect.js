import { Select } from 'antd'
import action from '@/store/actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const { Option } = Select

export default props => {
  const dispatch = useDispatch()
  const cates = useSelector(store=>store.good.cates)
  useEffect(()=>{
    dispatch(action.getCatesAction())
    return undefined
  }, [])
  return (
    <div className='qf-cate-select'>
      <Select
        style={{ width: 200 }}
        placeholder="选择一个品类"
        onChange={val=>props.onChange && props.onChange(val)}
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
