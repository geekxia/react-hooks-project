import { Table, Tag, Space,Radio, Divider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

export default props => {
  
  const [selectionType, setSelectionType] = useState('checkbox')

  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)

  let [page, setPage] = useState(1)
  let [size, setSize] = useState(5)

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  }, [page, size])

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
      title: '商品描述',
      dataIndex: 'desc',
      key: 'desc',
      align: 'center',
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
      title: '商品类型',
      dataIndex: 'cate',
      key: 'cate',
      sorter: (a, b) => a.cate.length - b.cate.length,
      align: 'center'
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
      <h1><b>商品列表</b></h1>
      <hr/>
      <div>
        查询条件
      </div>
      <div style={{margin: '20px 0'}}>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            total: goodData.total,
            defaultPageSize: size,
            onChange: page=>setPage(page),
            onShowSizeChange: (page, size)=>setSize(size),
            pageSizeOptions: [2,5,10,15,20]
          }}
          
        />
      </div>
    </div>
  )
}
