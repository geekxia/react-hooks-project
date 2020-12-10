import action from "@/store/actions"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { Select } from 'antd';
const { Option } = Select

export default props => {
    const cates = useSelector(store => store.Qgood.cates)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(action.getCatesAction())
        return undefined
    }, [])
    return (
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="你还有选择吗"
            value={props.value}
            onChange={val => props.onChange && props.onChange(val)}
            allowClear={props.allowClear}
        >
            {
                props.hasAll && <Option key="0" value="">全部</Option>
            }
            {
                cates.map(ele => (
                    <Option key={ele._id} value={ele.cate} >{ele.cate_zh}</Option>
                ))
            }
        </Select>
    )
}