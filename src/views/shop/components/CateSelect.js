import { Select } from 'antd'
import action from '@/store/actions'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'

export default props=>{
    const dispatch = useDispatch()
    const cates = useSelector(store=>store.shop.cates)
    // console.log(typeof(cates))
    useEffect(()=>{
        dispatch(action.getCateList())
        return undefined
    },[])

    return(
        <div>
            <Select
                style={{ width: 200 }}
                placeholder="选择一个品类"
                onChange={val=>props.onChange && props.onChange(val)}
                allowClear={props.allowClear}
            >
                {
                    props.hasAll &&  <Option key='0' value='' >
                     全部
                    </Option>
                }
                {
                   cates.map(ele=>(
                    <Option key={ele.id} value={ele.cate}>
                        {ele.cate_zh}
                    </Option>
                   ))
                }
            </Select>
        </div>
    )
}