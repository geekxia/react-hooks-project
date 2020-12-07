import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Table} from 'antd'
import action from '@/store/actions'
export default props=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.ztyGood.goodData)
   let params={}
    useEffect(()=>{
        dispatch(action.ztyGetGoodList(params))
        return undefined
    },[])
      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
            title:'是否热销',
            dataIndex:'hot',
            key:'hot',
            render:text=><div>text?是:否</div>
        },
        {
            title:'上架时间',
            dataIndex:'create_time',
            key:'create_time'
        }
      ];
    return (
        <div>
            <h1>这是商品列表</h1>
            <Table dataSource={goodData.list} columns={columns} />
        </div>
    )
}