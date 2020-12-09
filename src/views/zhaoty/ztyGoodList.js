
import '@/assets/css/zhaoty/ztyGoodList.scss'
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  Table,
  Row,
  Col,
  Input,
  Button,
  Modal,
} from 'antd'
import SelectCate from './components/cateSelect'
import action from '@/store/actions'
import moment from 'moment'
import myImg from '@/utils/zhaoty/img'
import {delGood } from '@/utils/zhaoty/api'
export default props=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.ztyGood.goodData)
    const [filter,setFilter] = useState({
      page:1,
      size:2,
      text:'',
      cate:''
    })
    const [text,setText]=useState('')
    const [keys,setKeys]=useState([])
    const rowSelection = {
      onChange: key => {
        setKeys(key)
      }}
      const [selectionType, setSelectionType] = useState('checkbox')
   let params={
     page:filter.page,
     size:filter.size,
     text:filter.text,
     cate:filter.cate
   }
   const textChange=val=>{
     setText(val)
     if(!val){
       filter.text=''
       setFilter(JSON.parse(JSON.stringify(filter)))
     }
   }
   const toDel=row=>{
    Modal.confirm({
      title: '删除商品',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除这个商品吗',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        delGood({id:row._id}).then(()=>{
        setFilter(JSON.parse(JSON.stringify(filter)))
    })
      }
    });
   }
   const delGoods=()=>{
    Modal.confirm({
      title: '删除多个商品',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除这些商品吗',
      okText: '确认',
      cancelText: '取消',
      onOk(){
        let str = ''
        keys.map(ele=>{
          str+= ';'+ele
        })
        console.log(str)
        delGood({id:str}).then(()=>{
        setFilter(JSON.parse(JSON.stringify(filter)))
    })
      }
    });
   }
    useEffect(()=>{
        dispatch(action.ztyGetGoodList(params))
        return undefined
    },[filter])
    useEffect(()=>{
      dispatch(action.ztyGetGoodCates({}))
      return undefined
    },[])
    const filterChange=(key,val)=>{
      filter[key]=val
      setFilter(JSON.parse(JSON.stringify(filter)))
      console.log(filter)
    }
    const skipToUpdateGood=(row)=>{
      if(row){
        // console.log('编辑',row._id)
        props.history.push('/zhao/good/update/'+row._id)
      }else{
        console.log('新增')
        props.history.push('/zhao/good/update/0')
      }
      
    }
    const footer =()=>(
    <div>
      <Button type="primary" onClick={()=>delGoods()}>批量操作</Button>
    </div>
    )
      const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          render:(text,row,idx)=>{
            return (
              <div className='zgl-img'>
                <img src={myImg.baseUrl+row.img} alt="row.name" />
                <span>{text}</span>
              </div>
            )
          }
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
            title:'是否热销',
            dataIndex:'hot',
            key:'hot',
            render:text=><div>{text?'是':'否'}</div>
        },
        {
            title:'上架时间',
            dataIndex:'create_time',
            key:'create_time',
            render:text=>(
              <div>
                <div style={{marginBottom:'10px'}}>{moment(text).format('YYYY年MM月DD日' )}</div>
                <div>{moment(text).format('HH时mm分ss秒' )}</div>
              </div>
            )
        },
        {
          title:'操作',
          dataIndex:'op',
          key:'op',
          render:(text,row)=>(
            <div>
               <Button type="primary" size='small' 
               style={{marginRight:'10px'}}
               onClick={()=>skipToUpdateGood(row)}
               >编辑</Button>
                <Button size='small' 
                onClick={()=>toDel(row)}>删除</Button>
            </div>
          )
        }
      ];
    return (
        <div className='zty-good-list'>
            <h1>这是商品列表</h1>
            <Row align='middle'>
              <Col span={1} align='center' al>
              名称
              </Col>
              <Col span={4}>
                <Input 
                placeholder='输入商品名称' 
                allowClear
                value={text}
                onChange={(e)=>textChange(e.target.value)}
                onPressEnter={e=>filterChange('text',e.target.value)}
                />
              </Col>
              <Col offset={1} span={1} align='center'>
              品类
              </Col>
              <Col span={4}>
                <SelectCate 
                allowClear 
                onChange={cate=>filterChange('cate',cate)}
                />
              </Col>
              <Col offset={2} span={4}>
                <Button type="primary" onClick={()=>skipToUpdateGood()}>添加商品</Button>
              </Col>
            </Row>
            <Table 
            dataSource={goodData.list} 
            columns={columns} 
            rowKey='_id'
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            footer={() =>footer()}
            pagination={{
            total: goodData.total,
            defaultPageSize: filter.size,
            pageSizeOptions: [2,3,5,10,15,20],
            showSizeChanger:true,
            onChange:(page)=>filterChange('page',page),
            onShowSizeChange:(current,size)=>filterChange('size',size)
          }}
            />
        </div>
    )
}