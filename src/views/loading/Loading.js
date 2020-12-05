import React from 'react'
import { Spin, Space } from 'antd';
import action from '@/store/actions'
import {
    useSelector,
    useDispatch
} from 'react-redux'
export default props=>{
    const dispatch = useDispatch()
    let loading=useSelector(store=>store.study.loading)
 
    return (
        <div>
            <button onClick={()=>dispatch(action.fanLoading(true))}>set Loading</button>
            <button onClick={()=>dispatch(action.fanLoading(false))}>hide Loading</button>
            <Spin tip="Loading..." spinning={loading}>
                <h1>加载</h1>
                
                <input type="text" />                
            </Spin>
        </div>
    )
}