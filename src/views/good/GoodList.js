import { Table, Tag, Space } from 'antd'
import React , {useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import action from "@/store/actions"
import imgurl from "@/utils/img"
import moment from "moment"
import "./style.scss"
export default props => {
  let [size,setsize]=useState(2)
  let [page,setpage]=useState(1)
  let goodlist=useSelector(store=>store.good.list)
   let dispatch =  useDispatch()
   useEffect(()=>{
     let params={
      size,
      page
     }
    dispatch(action.Goodlist(params))
    return undefined
   },[size,page]) 
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record, index) =>{
       return <div className="gl-good ">
                <img src={imgurl.imgBase+record.img} />
                <p>{record.name}</p>
             </div>
      }
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'address',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key:"price",
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render:text=>{
        return <div>${text}</div>
      }
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text => <p>{text?"是":"否"}</p>,
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render:(text)=>{
        return <div>
            <div>{moment(text).format('YYYY年MM月DD日')}</div>
            <div>{moment(text).format('hh:mm:ss')}</div>
        </div>
      }
    },
    {
      title: '操作',
      key: 'tags',
      align: 'center',
      dataIndex: 'tags',
      render: () => (
        <>
          <a href="">删除</a>
          <a href="">编辑</a>
        </>
      )
    }
  ]


  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div>
        查询条件
      </div>
      <div style={{margin: '20px 0'}}>
        <Table 
        pagination={{
          total: goodlist.total,
          defaultPageSize: size,
          onChange: page=>setpage(page),
          onShowSizeChange: (page, size)=>setsize(size),
          pageSizeOptions: [2,5,10,15,20]
        }}
        rowKey='_id'
        columns={columns} 
        dataSource={goodlist.list} />


      </div>
    </div>
  )
}
