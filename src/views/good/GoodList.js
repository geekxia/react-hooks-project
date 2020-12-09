
import { Table, Tag, Space,Row,Col,Input,Button,Switch,Select,Modal} from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './styleG.scss'
import CaseSelect from '@/views/good/components/CateSelect'
let {Option}=Select
export default props=>{
    const goodData=useSelector(store=>store.good.goodData)

    // console.log('------------',goodData);
    const dispatch=useDispatch()
    // let  [page,setPage]=useState(1)
    // let  [size,setSize]=useState(2)
    let [text,setText]=useState('')
    let [filter,setFilter]=useState({
        page:1,
        size:2,
        text:'',
        hot:''
    })
    

    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    const textChange=val=>{
      console.log('e',val);
      setText(val)
      if(!val){
        text=''
        setText(JSON.parse(JSON.stringify(text)))
      }

    }
    const filterChange=(key,val)=>{
      filter[key]=val
      // console.log(val);
      if(key!=='page') filter.page=1
      setFilter(JSON.parse(JSON.stringify(filter)))
        
    }

    //新增
    const skipToEdit=(row)=>{
      
      props.history.replace('/detail/'+(row?row._id:0))
    }

    //删除
    const handleDel=()=>{

    }

    useEffect(()=>{
      dispatch(action.goodListAction(filter))
      return undefined
    },[filter])

    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          align: 'center',
          render: (text,row,idx)=>{
            return(
              <div className="gl-good">
                <img src={img.imgBaseUrl+row.img} />
                <a>{text}</a>
              </div>
            )
          }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
          align: 'center',
          render:text=><div>{text}</div>
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align: 'center',
          render:text=><div>{"￥"+text}</div>
        },
        {
          title: '是否热销',
          key: 'hot',
          dataIndex: 'hot',
          align: 'center',
          render:text=><div>{text?"是":"否"}</div>
        },
        {
          title: '上架时间',
          key: 'create_time',
          align: 'center',
          dataIndex: 'create_time',
          render: text => (
            <>
              {text}
            </>
          ),
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex:'tags',
          align: 'center',
          render: (text,row) => (
            <>
              <a onClick={()=>skipToEdit(row)}>编辑</a>
              <a onClick={()=>handleDel()}>删除</a>
            </>
          )
        },
    ];
      


    return (
      <div className='qf-good-list'>
        <Row 
          justify="start"
          align="middle"
          
        >
          
          <Col span={2}>
            <span className='filter-label'>搜索:</span>
          </Col>
          
          <Col span={4}>
            <Input 
              placeholder="名称搜索"
              value={text}
              onChange={e=>textChange(e.target.value)}
              allowClear
              onPressEnter={e=>filterChange('text',e.target.value)}
              />
          </Col>


          <Col span={3}>
            <span className='filter-label'>品类:</span>
          </Col>
          <Col span={4}>
            <CaseSelect
              hasAll
              onChange={cate=>filterChange('cate',cate)}
            />
          </Col>

          <Col span={3}>
            <span className='filter-label'>状态:</span>
          </Col>
          <Select
              onChange={val=>filterChange('hot',val)}
              style={{width:'100px'}}
              defaultValue=''
              allowClear
          >
            <Option>全部</Option>
            <Option>是</Option>
            <Option>否</Option>
          </Select>

          <Col span={4} style={{textAlign:"right"}}>
            <Button 
              type="primary" 
              onClick={()=>skipToEdit()}
              >新增</Button>
          </Col>
        </Row>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
          pagination={{
            total: goodData.total,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page',page),
            onShowSizeChange: (page, size)=>filterChange('size',size),
            pageSizeOptions: [2,5,10,15,20],
            showSizeChanger:true
          }}
        />
        
      </div>
    )
}