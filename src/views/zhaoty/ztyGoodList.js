// import '@/assets/css/zhaoty/ztyGetGoodList.scss'
import '@/assets/css/zhaoty/ztyGoodList.scss'
// import '../../assets/css/zhaoty/ztyGoodList'

import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Table} from 'antd'
import action from '@/store/actions'
import moment from 'moment'
import myImg from '@/utils/zhaoty/img'

export default props=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.ztyGood.goodData)
   let params={}
    useEffect(()=>{
        dispatch(action.ztyGetGoodList(params))
        return undefined
    },[])
    useEffect(()=>{
      console.log('goodData',goodData)
      return undefined
    },[])
      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          render:(text,row,idx)=>{
            return (
              <div className='zgl-img'>
                <img src={myImg.baseUrl+row.img} alt="row.name" />
                <span>{text}</span>
              </div>
            )
          }
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
            render:text=><div>{text?'是':'否'}</div>
        },
        {
            title:'上架时间',
            dataIndex:'create_time',
            key:'create_time',
            render:text=><div>{moment(text).format('YYYY MM DD')}</div>
        }
      ];
    return (
        <div className='zty-good-list'>
            <h1>这是商品列表</h1>
            <Table 
            dataSource={goodData.list} 
            columns={columns} 
            rowKey='_id'
            />
        </div>
    )
}