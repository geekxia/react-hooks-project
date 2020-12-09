//引入组件
import action from "@/store/actions"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    Select
} from "antd"
const { Option } = Select

const whsSelect = (props)=>{
    const cates = useSelector(store=>store.good.cates)
    const dispatch = useDispatch()
    //无状态组件生命周期
    useEffect(()=>{
        //掉接口
        dispatch(action.getCatesAction())
        return undefined
    },[])

    return(
        <div className="HH-whsSelect">
            <Select
                style={{ width: props.cate ? 140 : 200}}
                placeholder="请选择商品品类"
                value={props.value} //只跟编辑状态有关
                onChange={value=>props.onChange && props.onChange(value)}
                allowClear={props.allowClear}
                defaultValue={ props.category}
            >   
                {
                   props.category && <Option  value="">全部品类</Option>
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

export default whsSelect