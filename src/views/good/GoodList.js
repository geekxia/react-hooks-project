import React, { useState,useEffect } from 'react';
import { Table,Row,Col,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import action from '@/store/actions'
import api from '@/utils/api'

export default props=>{

  const dispatch = useDispatch()
  //拿数据，这样还不行，要触发的
  const goodArr=useSelector(store=>store.good.goodArr)
  console.log("看一下数据",goodArr)
  const columns = [
    {
      title: '商品名称',
      key:"name",
      dataIndex: 'name',
      render: (text,row,idx)=>{
        return(
          <div>
            <a>{text}</a>
          </div>
        )
      }
    },
    {
      title: '品类',
      key:"cate",
      dataIndex: 'cate',
    },
    {
      title: '描述',
      key:"desc",
      dataIndex: 'desc',
      render:(text,row,idx)=>{
        return(
          <div>
            <a>{text}</a>
          </div>
        )
      }
    },
    {
      title: '价格',
      key:"price",
      dataIndex: 'price',
      render: (text,row,idx)=>{
        return(
          <div>
            <a>{"￥"+text}</a>
          </div>
        )
      }
    },
    {
      title: '是否热销',
      key:"hot",
      dataIndex: 'hot',
      render: (text,row,idx)=>{
        return(
          <div>
            <a>{text}</a>
          </div>
        )
      }
    },
  ];

  let [text, setText] = useState('')
  let [keys, setKeys] = useState([])

  // 便于筛选
  let [filter, setFilter] = useState({
    size: 2,
    page: 1,
    text: '',
    hot: ''
  })
  //当这些值改变的时候自动调用接口？
  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  }, [filter])

  const filterChange = (key, val) => {
    filter[key] = val
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter', filter)
  }
  const textChange = val => {
    console.log('value text', val)
    setText(val)
    if(!val) {
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }
  //行是否可选
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   }};

    // const [selectionType, setSelectionType] = useState('checkbox');
    // return (
    //   <div>
    //     {/* <Radio.Group
    //       value={selectionType}
    //     >
    //     </Radio.Group>
    //     <Divider /> */}
  
    //     <Table
    //     // 勾选状态的
    //       // rowSelection={{
    //       //   type: selectionType,
    //       //   ...rowSelection,
    //       // }}
    //       rowKey='_id'
    //       columns={columns}
    //       // dataSource={goodArr}
    //     />
    //   </div>
    // );
    

    // return (
    //   <div className='qf-good-list'>
    //     <h1>商品列表</h1>
    //     <div style={{margin: '25px 0'}}>
    //       {/*第一行*/}
    //       <Row align='middle'>
    //         <Col span={2}>
    //           <span className='filter-label'>搜索:</span>
    //         </Col>
    //         <Col span={4}>
    //           <Input
    //             value={text}
    //             onChange={e=>textChange(e.target.value)}
    //             placeholder="搜索"
    //             allowClear
    //             onPressEnter={e=>filterChange('text', e.target.value)}
    //           />
    //         </Col>
    //         <Col span={2}>
    //           <span className='filter-label'>品类:</span>
    //         </Col>
    //         <Col span={6}>
    //           <CateSelect
    //             hasAll
    //             onChange={cate=>filterChange('cate', cate)}
    //             allowClear
    //           />
    //         </Col>
    //         <Col span={2}>
    //           <span className='filter-label'>状态:</span>
    //         </Col>
    //         <Col span={4}>
    //           <Select
    //             onChange={val=>filterChange('hot', val)}
    //             style={{width: '100px'}}
    //             allowClear
    //             defaultValue=''
    //           >
    //             <Option key='1' value=''>全部</Option>
    //             <Option key='2' value={true}>是</Option>
    //             <Option key='3' value={false}>否</Option>
    //           </Select>
    //         </Col>
    //         <Col offset={2} span={2} style={{textAlign: 'right'}}>
    //           <Button
    //             size='small'
    //             type="primary"
    //             onClick={()=>props.history.push('/good/update/0')}
    //           >
    //             新增
    //           </Button>
    //         </Col>
    //       </Row>
    //     </div>
    //     <div style={{margin: '20px 0'}}>
    //       {/*current 要受控起来*/}
    //       <Table
    //         rowKey='_id'
    //         columns={columns}
    //         dataSource={goodData.list}
    //         pagination={{
    //           current: filter.page,
    //           total: goodData.total,
    //           defaultPageSize: filter.size,
    //           onChange: page=>filterChange('page', page),
    //           onShowSizeChange: (page, size)=>filterChange('size', size),
    //           pageSizeOptions: [2,5,10,15,20]
    //         }}
    //         rowSelection={{
    //           type: 'checkbox',
    //           onChange: keys=>setKeys(keys)
    //         }}
    //         footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
    //         size='small'
    //       />
    //     </div>
    //   </div>
    // )
}
