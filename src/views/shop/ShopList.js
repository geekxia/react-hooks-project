import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useDispatch,useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'

import { 
    Table, 
    Tag, 
    Space,
    Button 
} from 'antd';

export default props =>{
  const dispatch = useDispatch()
  const shopData = useSelector(store=>store.shop.shopData)

  let [page,setPage] = useState(1)
  let [size,setSize] = useState(2)

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.getShopList(params))
    return undefined
  },[page,size])

    //跳转到商品新增页面
    const history = useHistory()
    const skipToAdd = ()=>{
        history.push('/shop/addList')
    }


    const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          render: (text,row,idx) => {
            return(
              <div className='zgf-shop'>
                <img src={img.imgBase+row.img} alt={row.name} />
                <a>{text}</a>
              </div>
            )
          }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          render:text=><div>{'￥'+text}</div>
        },
        {
          title: '是否热销',
          key: 'hot',
          dataIndex: 'hot',
        render: text => <div>{text?'是':'否'}</div>
        },
        {
          title: '上架时间',
          key: 'create_time',
          dataIndex:'create_time',
          render: text=>{
            return(
              <div>
                <div>{moment(text).format('YYYY年MM月DD日')}</div>
                <div>{moment(text).format('hh:mm:ss')}</div>
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex: 'tags',
          render: ()=>{
            <>
              <a href=''>删除</a>
              <a href=''>编辑</a>
            </>
          }
        },
      ]

    return(
        <div>
            <div className='zgf-shop-list'>
                <h1>商品列表</h1>
                <span><Button type="primary" onClick={skipToAdd}>新增</Button></span>
            </div>
            <div>
                {<Table 
                  rowKey = '_id'
                  columns={columns} 
                  dataSource={shopData.list}
                  
                  />}
            </div>
        </div>
    )
}