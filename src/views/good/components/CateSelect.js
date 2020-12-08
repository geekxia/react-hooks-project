import {Select} from 'antd'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'
const {Option}=Select

export default props=>{
    const dispatch=useDispatch()
    const cates=useSelector(store=>store.good.cates)
    console.log('catesss',cates);
    useEffect(()=>{
        dispatch(action.goodCatesAction())
        return undefined
    },[])
    return(

        <div>
            <Select 
                
                placeholder="选择品类"
                onChange={val=>props.onChange && props.onChange(val)}
                
            >
                {/* {
                    props.hasAll && <Option key='0' value=''>全部</Option>
                } */}
                {
                    cates.map(ele=>(
                    <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
                    ))
                }
                
             </Select>
        </div>
    )
}