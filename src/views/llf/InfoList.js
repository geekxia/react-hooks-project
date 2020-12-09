import { 
     Table,
     Tag, 
     Space,
     Button,
     Tooltip,
     Pagination ,
     Row, 
     Col,
     Input,
     Select,
     Modal,
    } from 'antd';

import { PlusOutlined,ExclamationCircleOutlined} from '@ant-design/icons'
import{ useSelector,useDispatch}from 'react-redux'
import{ useEffect,useState}from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './component/CateSelect'
import {fetchGoodDel } from '@/utils/api'

const { Option } = Select;
const { confirm } = Modal;

const InfoList =(props)=>{

  let [text,setText]=useState('')
  let [keys,setKeys]=useState('')
  let [alldata,setAllDate]=useState({
    size:3,
    page:1,
    text:"",
    cate:"",
    hot:""
  })
  const dispatch =useDispatch()
  const goodData =useSelector(store=>store.good.goodData)
  const cates=useSelector(store=>store.good.cates)
  //  console.log('goodDate---',goodData)


  //获取页面列表，触发action掉后端接口
  useEffect(()=>{
    dispatch(action.getGoodList(alldata))
    return undefined
  },[alldata])
  
  //关键字搜索
  const textChange=(val)=>{
    // console.log('搜索关键字',val)
    setText(val)
    if(!val){
      alldata.text=''
      setAllDate(JSON.parse(JSON.stringify(alldata)))
    }

  }
  //bug：如果不在第一页，其他页面选择品类筛选时页面会跑到其他页面去，就不会显示筛选结果
  //使page和cata有关系，可以把所有的参数封装，放在一个对象中
/*   const cateChange=(val)=>{
    console.log('.......品类更改',val)
    setCate(val)
  } */
  const alldataChange=(key,val)=>{
    alldata[key]=val
    if(key!='page') alldata.page=1
    setAllDate(JSON.parse(JSON.stringify(alldata)))
    console.log(alldata)
  }

  //删除
  const handel=row=>{
    const ele = <span style={{color: 'red'}}>{row.name}</span>
    console.log(row)
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
    content: <div>你确定要{ele}删除吗？</div>,
      onOk() {
        fetchGoodDel({id:row._id}).then(()=>{
          setAllDate(JSON.parse(JSON.stringify(alldata)))
        })
      },
    });
  }
  //批量删除
  const mulDelete=()=>{
    let id=''
    keys.map(ele=>{id +=(';'+ele)})
    fetchGoodDel({id}).then(()=>{
      setAllDate(JSON.parse(JSON.stringify(alldata)))
    })
  }

  //跳转到新增页、编辑页
const skipToEdit =row =>{
  props.history.push('/llfAddOrEdit/'+(row?row._id:0))
}
  
  
  //表格标题与表格内容
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align:'center',
      render: (text,row,index)=>{
        return(
          <div className="gl-good">
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
      align:'center',
    },
    {
      title: '商品类别',
      dataIndex: 'cate',
      key: 'cate',
      align:'center',
      render:cate=>{
        const index=cates.findIndex(ele=>ele.cate===cate)
        return <span>{index>=0?cates[index].cate_zh:0}</span>
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      align:'center',
      sorter: (a, b) => a.price - b.price,
    render:text=><div>{'￥'+text}</div>
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot',
      align:'center',
      render:text=>{
        return(
        <div>{text?"是":"否"}</div>
        )
      }
    },
    {
      title: '上架时间',
      key: 'create_time',
      dataIndex: 'create_time',
      align:'center',
      render :text=>{
        return (
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
      key: 'tags',
      align:'center',
      render:(text,row)=>(
        <div className='table-btn'>
         <span className="del" onClick={()=>handel(row)}>删除</span>
         <span onClick={()=>skipToEdit(row)}>编辑</span>
       </div>
      )
    },
  ];

    return(
        <div className='llf-good-list'>
            <h1>李兰菲的商品列表</h1>
            <div style={{margin: '20px 0'}}>
              <Row align='middle'>
                <Col span={2}><span className="list-lable">搜索</span></Col>
                <Col span={4}>
                <Input 
                  placeholder="请输入关键字" 
                  value={text}
                  onChange={e=>textChange(e.target.value)}
                  onPressEnter={e=> alldataChange('text',e.target.value)}
                  allowClear
                  />
                </Col>
                <Col span={2}><span className="list-lable">品类</span></Col>
                <Col span={6}>
                  <CateSelect
                    hasAll
                    allowClear
                    onChange={cate=>alldataChange('cate',cate)}
                    
                  />
                </Col>
                <Col span={4}><span className="list-lable">状态</span></Col>
                <Col span={4}>
                  <Select
                    showSearch
                    style={{ width: 100 }}
                    placeholder="全部"
                    allowClear={true}
                    onChange={hot=>alldataChange('hot',hot)}
                  >
                    <Option value="">全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
                </Col>
                <Col span={2}>
                  <Tooltip title="商品新增">
                  <Button 
                  type="primary" 
                  shape="circle" 
                  icon={<PlusOutlined />} 
                  onClick={()=>props.history.push('/llfAddOrEdit/0')}
                  style={{paddingTop:'8px'}}
                  />
                </Tooltip>
                </Col>
              </Row>
            </div>
            <div style={{margin:'25px 0'}}>
              <Table 
                rowKey='_id'
                size="small"
                columns={columns}
                dataSource={goodData.list}
                pagination={{
                  current:alldata.page,
                  showSizeChanger:true,
                  total:goodData.total,
                  pageSizeOptions:[2,5,10,15,20],
                  defaultPageSize:alldata.size,
                  onChange:page=>alldataChange('page',page),
                  onShowSizeChange: (page, size)=>alldataChange("size",size),
                  showQuickJumper:true
                }}
                rowSelection={{
                  type: 'checkbox',
                  onChange:keys=>setKeys(keys)
                }}
                footer={() =><Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
               />
            </div>
           
        </div>
    )
}
export default InfoList