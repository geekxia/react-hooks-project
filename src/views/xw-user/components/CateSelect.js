import {
  Select
}from 'antd'

import action from "@/store/actions.js"
import { useEffect } from 'react'
import {useSelector,useDispatch}from 'react-redux'

const { Option } = Select;

export default props=>{
  const dispatch=useDispatch()
  const cates=useSelector(store=>store.good.cates)
  console.log('-------',cates)
  useEffect(()=>{
    dispatch(action.getCateList())
    return undefined
  },[])
  return(
    <div className="qf-cate-select">
      <Select 
      placeholder="选择一个品类"
      style={{ width: 120 }} 
      >
        {
          props.hasAll && <Option key="0" value="">全部</Option>
        }
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