import React from 'react'

// import {fetchCates} from '@/utils/api.js'
import {useEffect,useState} from 'react'

import {Select} from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import action from '@/store/actions.js'
const {Option} = Select

// 定义CateSelects这个组件
const CateSelects=(props)=>{
  const dispatch =useDispatch()
  const cates = useSelector(store=>store.good.cates)
  // console.log("状态管理品类",cates)
  console.log("cateselects",props)
  // useEffect(()=>{
  //   fetchCates().then(res=>{
  //     console.log("品类",res)
  //   })
  //   return undefined
  // },[])

  useEffect(()=>{
    dispatch(action.getCatesAction())
    return undefined
  }, [])
  // let [value,setValue]= useState('')
  // function selectCate(e){
  //   console.log("=======",e)
  // }
  return(
    <div className="qf-cateselect">
      <Select
        style={{ width: 200 }}
        placeholder="选择一个品类"
        // onChange={(e)=>selectCate(e)}
        onChange={val=>props.onChange && props.onChange(val)}
      >
        {
          cates.map(ele=>(
            <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
          ))
        }
        
      </Select>
    </div>
  )
}

export default CateSelects