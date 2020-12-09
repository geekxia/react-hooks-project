
//封装一个组件方便复用,因为数据要走redux所以用到useDispatch和useSelector
import { Select } from "antd"
import {useEffect} from "react"
import {useDispatch,useSelector} from 'react-redux'
import action from "@/store/actions"
const { Option } = Select

const createSelect=props=>{
    const cates=useSelector(store=>store.detail.cates)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(action.cateList())
        return undefined
    },[])
    return(
        <div>
             <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择品类 "
                    optionFilterProp="children"
                    onChange={(val)=>props.onChange && props.onChange(val)}
                    value={props.value}
                    >
                        {
                            props.has && <Option key="1" value="" >全部</Option>
                        }
                        {
                            cates.map(ele=>(
                                <Option key={ele._id} value={ele._id}>{ele.cate_zh}</Option>
                            ))
                        }
                        
                    </Select>
        </div>
    )
}
export default createSelect