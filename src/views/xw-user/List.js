
import { Table, Tag, Space } from 'antd';
import img from '@/utils/img'
import moment from 'moment'
import {useSelector,useDispatch}from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import '@/assets/css/goodlist.scss'

export default props=>{
  const dispatch=useDispatch()
  const goodData=useSelector(store=>store.good.goodData)
  let[page,setPage]=useState(1)
  let[size,setSize]=useState(2)

  useEffect(()=>{
    let params={
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[page,size])


  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      render: (text,row,idx)=>{
        return(
          <div className="gl-good">
            <img src={img.imgBase+row.img} alt={row.name}/>
            <a>{text}</a>
          </div>
        )
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      sorter:(a,b)=>a.price-b.price,
      render:text=><div>{text+'元'}</div>
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key:'desc',
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot',
      render: text=><div>{text?'是':'否'}</div>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: text=>{
        return(
          <>
            <div>{moment(text).format('YYYY-MM-DD')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'tags',
      key: 'tags',
      render:()=>(
        <>
          <button>删除</button>
          <button>编辑</button>
        </>
      )
    }
  ];
  

  return(
    <div className="qf-good-list">
      <Table 
      rowKry="_id"
      columns={columns} 
      dataSource={goodData.list} 
      pagination={{
        total:goodData.total,
        defaultPageSize:size,
        onChange:page=>setPage(page),
        onShowSizeChange:(page,size)=>setSize(size),
        pageSizeOptions:[2,5,10,20]
      }}
      />
      
    </div>
  )
}