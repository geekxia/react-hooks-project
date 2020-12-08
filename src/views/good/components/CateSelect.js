import {Select} from 'antd';
import action from '@/store/actions';
import {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
const {Option} = Select;

export default props =>{
  const dispatch = useDispatch();
  const cates = useSelector(store=>store.good.cates)
  useEffect(()=>{
    dispatch(action.getCatesAction())
    return undefined
  },[])
  return(
    <Select 
      placeholder="选择一个品类" 
      style={{ width: 200 }}
      onChange={val=>props.onChange && props.onChange(val)}
    >
      {
        props.hasAll && <Option key='0' value=''>全部</Option>
      }
      {
        cates.map(ele=>(
          <Option value={ele.cate} key={ele._id}>{ele.cate_zh}</Option>
        ))
      }
    </Select>
  )
}