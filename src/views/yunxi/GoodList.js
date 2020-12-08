import { 
  Table, 
  Tag, 
  Space,
  Row,
  Col,
  Input,
  Button
 } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions' 
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './components/CoogSelect'

export default props => {
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)

  let [page,setPage] =useState(1)
  let [size,setSize] =useState(2)

  useEffect(()=>{
    let params={
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[page]) //page变化重新调接口

  const columns = [
      {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        align:'center',
        render: (text,row,idx) => { // render相相当于vue中的插槽
          return(
            <div className='gl-good'>
              <img src={img.imgBase+row.img} alt={row.name}/>
              <a>{text}</a>
            </div>
          )
        },
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'name',
        align:'center'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        sorter: (a,b )=> a.price - b.price,  //实现排序
        render: text=> <div>{'￥'+ text}</div>
      },
      {
        title: '是否热销',
        dataIndex: 'hot',
        key: 'hot',
        align:'center',
        render: text=> <div>{text? '是' : '否'}</div>
      },
      {
        title: '上架时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align:'center',
        render: text=> {
          return(
            <> 
              <div>{moment(text).format('YYYY年MM月DD日')}</div>
              <div>{moment(text).format('HH:mm')}</div>
            </>
          )
        }
      },
      {
        title: '操作',
        dataIndex: 'tags',
        key: 'tags',
        align:'center',
        render:() => (
          <>
            <a href="">删除</a>
            <a href="">编辑</a>
          </>
        ),
      },
  ];
  return(
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <hr />
      <div style={{margin:'25px 0'}} className='qf-filter'>
       <Row align='middle'>
        <Col span={2}>
          <span className='qf-label'>名称搜索:</span>
        </Col>
        <Col span={4}>
          <Input placeholder="搜索 . . ." />
        </Col>
        <Col span={2}>
          <span className='qf-label'>品类筛选:</span>
        </Col>
        <Col span={6}> 
          <CateSelect hasAll/>
        </Col>
        <Col offset={8} span={2} style={{textAlign:'right'}}>
          <Button 
          size='small' 
          type="primary"
          onClick={()=>props.history.push('/aore/0')}
          >
            新增
          </Button>
        </Col> 
      </Row>
      </div>
      {/* 表单 */}
      <div style={{margin: '20px 0'}}>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            showSizeChanger:true,
            total: goodData.total,
            defaultPageSize: size,
            onChange: page=>setPage(page), //page页码变化
            onShowSizeChange: (page, size)=>setSize(size), //如切换10页就给它显示10页
            pageSizeOptions: [2,4,6,8,10]
          }}
        />
      </div>
    </div>
  )
}




