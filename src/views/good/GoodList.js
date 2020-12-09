import { Table, Input, Space ,Row ,Col ,Select, Button,Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import action from '@/store/actions';
import {useEffect,useState} from 'react';
import img from '@/utils/img';
import './style.scss';
import api from '@/utils/api';
import moment from 'moment';
import CateSelect from './components/CateSelect';

const { confirm } = Modal;
const { Option } = Select;

export default props=>{
  const dispatch = useDispatch();
  const goodData = useSelector(store=>store.good.goodData)
  let [text,setText] = useState('')
  let [filter,setFilter] = useState({
    size:2,
    page:1,
    text:'',
    hot:'',
  })
let [keys,setKeys] = useState([])
  // 删除操作
  const handelDel = row=>{
    const ele = <span style={{color: 'red'}}>{row.name}</span>
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: <div>你确定要删除 {ele} 吗</div>,
      okText:'确定',
      cancelText:'取消',
      onOk() {
        api.fetchGoodDel({id:row._id}).then(()=>{
          setFilter(JSON.parse(JSON.stringify(filter)))
        })
      },
      onCancel() {
      },
    });
  }

  // 批量删除
  const mulDelete = ()=>{
    console.log('多选keys',keys);
    let id = '';
    keys.map(ele=>id+=ele+';')
    // 向后端传递由 id 组成的字符串，不能传数组
    console.log('多选ids',id);
    api.fetchGoodDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }
  const textChange = val=>{
    console.log('value text',val)
    setText(val)
    if(!val){
      filter.text = '';
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  const filterChange = (key,val) => {
    filter[key] = val;
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter', filter)
  }
  const skipToEdit = row=>{
    console.log('eidt------props',props,row._id)
    dispatch(action.clearGoodDetail())
    props.history.push('/good/updata/'+(row?row._id:0))
    
  }
  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  },[filter])

  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text, row,idx)=> {
        //row为该行所有数据
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
      textWrap: 'word-break',
      ellipsis: true,
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
      render: (text, row) => {
        return <Space size="middle">
          <a onClick={()=>skipToEdit(row)}>编辑</a>
          <a onClick={()=>handelDel(row)} style={{color:'red'}}>删除</a>
        </Space>
      },
    },
  ];
  return (
    <div className='al-good-list'>
      <h1>商品列表</h1>
      <div>
      <Row align='middle'>
        <Col span={2}>
          <span className='filter-label'>名称搜索:</span>
        </Col>
        <Col span={6}>
          <Input 
            placeholder='搜索'
            value={text}
            allowClear
            onPressEnter={e=>filterChange('text',e.target.value)}
            onChange={e=>textChange(e.target.value)}
          />
        </Col>
        <Col span={2}>
          <span className='filter-label'>品类:</span>
        </Col>
        <Col span={6}>
          <CateSelect 
            hasAll
            onChange={cate=>filterChange('cate',cate)}
            allowClear
          />
        </Col>
        <Col span={4}>
          <Select 
            defaultValue="" 
            style={{ width: 120 }}
            allowClear
            onChange={val=>filterChange('hot',val)}
          >
            <Option key='1' value="">全部</Option>
            <Option key='2' value={true}>是</Option>
            <Option key='3' value={false}>否</Option>
          </Select>
        </Col>
        <Col offset={2} span={2} style={{textAlign: 'right'}}>
          <Button 
            type="primary"
            size='small'
            onClick={()=>props.history.push('/good/updata/0')}
          >新增</Button>
        </Col>
      </Row>
      </div>
      <div style={{margin:'20px 0'}}>
        <Table 
          rowSelection={{
            type:'checkbox',
            onChange:keys=>setKeys(keys)
          }}
          rowKey='_id'
          columns={columns} 
          footer={()=><Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
          dataSource={goodData.list} 
          pagination={{
            current:filter.page,
            total:goodData.total,
            pageSizeOptions: [2,5,10,15,20],
            onChange: page=>filterChange('page',page),
            defaultPageSize: filter.size,
            onShowSizeChange: (page, size)=>filterChange('size',size)
          }}
        />
      </div>
  </div>
  )
}