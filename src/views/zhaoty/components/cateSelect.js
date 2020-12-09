import {Select} from 'antd'
const {Option} = Select
import {useDispatch,useSelector}from 'react-redux'
import {useEffect}from 'react'
import action from '@/store/actions'
export default props=>{
    const dispatch = useDispatch()
    const cateArr = useSelector(store=>store.ztyGood.cateArr)
    useEffect(()=>{
        dispatch(action.ztyGetGoodCates({}))
        return undefined
    },[])
    return (
        <div>
        <Select style={{ width: '120px' }}
        allowClear={props.allowClear} 
        onChange={(val)=>props.onChange(val)}
        >
            
        {
            cateArr.map(ele=>{
                return <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
            })
        }
        </Select >
        </div>
    )
        
}