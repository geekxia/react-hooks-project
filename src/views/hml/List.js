import { Table, Tag, Space, Select } from 'antd'
import {useDispatch,useSelector} from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import moment from 'moment'
import img from '@/utils/img'
import api from '@/utils/api'
const {Option}=Select

import './style.scss' 

export default props => {
const cates = useSelector(store=>store.good.cates)
const dispatch=useDispatch()
const goodData=useSelector(store=>store.good.goodData)

let [filter] = useState({
  size: 2,
  // page: 1,
  // text: '',
  // hot: ''
})

useEffect(()=>{
  dispatch(action.getGoodList(filter))
  return undefined
}, [filter])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text,row,idx) => {
        return (
          <div className='gl-good'>
            <img src={img.imgBase+row.img} alt={row.name} />
            <a>{text}</a>
          </div>
        )
      },
    },
    {
      title: '品类',
      dataIndex: 'cate',
      key: 'cate',
      align: 'center',
      render: cate=>{
        const idx = cates.findIndex(ele=>ele.cate===cate)
        return <span>{idx>=0?cates[idx].cate_zh:''}</span>
      }
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
      render: text=><div className='table-desc'>{text}</div>
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render: text=> <div>{'￥'+text}</div>
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text=> <div>{text?'是':'否'}</div>
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render: text=> {
        return(
          <>
            <div>{moment(text).format('YYYY年MM月DD日')}</div>
            <div>{moment(text).format('hh:mm:ss')}</div>
          </>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
         <button>删除</button>
         <a href='/#/hml/add'><button >编辑</button></a>
        </Space>
      ),
    },
  ]

  
  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div>
        查询条件
      </div>
      <div style={{float:'right'}} className='add'>
      <a href='/#/hml/add'><button >增加</button></a>
      </div>
      <div style={{margin: '20px 0'}}>
        <Table rowKey='_id'
         columns={columns} 
         dataSource={goodData.list} 
       
        
        />
      </div>
      
    </div>
  )
}
