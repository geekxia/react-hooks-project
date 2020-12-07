import { Table, Tag, Space } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import action from '@/store/actions';
import {useEffect,useState} from 'react';
import img from '@/utils/img';
import './style.scss';
import moment from 'moment';
const columns = [
  {
    title: '商品',
    dataIndex: 'name',
    key: 'name',
    align:'center',
    render: (text, row,idx)=> {
      console.log('table-row',row)//row为该行所有数据
      return (
        <div className='gl-good'>
          <img src={img.imgBase+row.img} alt={row.name}/>
          <a>{text}</a>
        </div>
      )
    }
  },
  {
    title: '商品描述',
    dataIndex: 'desc',
    key: 'desc',
    align:'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align:'center',
    sorter:(a,b) => a.price - b.price,
    render:text=><div>{'￥'+text}</div>
  },
  {
    title: '是否热销',
    key: 'tags',
    dataIndex: 'hot',
    align:'center',
    render: text=> <div>{text?'是':'否'}</div>
  },
  {
    title: '上架时间',
    key: 'create_time',
    dataIndex: 'create_time',
    align:'center',
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
    dataIndex: 'tags',
    align: 'center',
    key:'tags',
    render: (text, record) => {
      return <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>
    },
  },
];

export default props=>{
  const dispatch = useDispatch();
  const goodData = useSelector(store=>store.good.goodData)
  let [page, setPage] = useState(1)
  let [size, setSize] = useState(2)

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[size,page])
  return (
    <div className='al-good-list'>
      <h1>商品列表</h1>
      <div>
        查询条件
      </div>
      <div style={{margin:'20px 0'}}>
        <Table 
          rowKey='_id'
          columns={columns} 
          dataSource={goodData.list} 
          pagination={{
            total:goodData.total,
            pageSizeOptions: [2,5,10,15,20],
            onChange: page=>setPage(page),
            defaultPageSize: size,
            onShowSizeChange: (page, size)=>setSize(size)
          }}
        />
      </div>
  </div>
  )
}