import { Table, Tag, Space,Row, Col,Button,Input,Modal ,Select   } from 'antd'
const { confirm } = Modal;
import React , {useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import action from "@/store/actions"
import {fetchGoodDel} from "@/utils/api"
import imgurl from "@/utils/img"
import moment from "moment"
import CateSelect from "../common/CateSelect"
import "./style.scss"
import { ExclamationCircleOutlined } from '@ant-design/icons';
export default props => {
  let catelist=useSelector(store=>store.good.arr)
  let [text,settext]=useState("")
  let [key,setkey]=useState([])
  //初始发送值获取商品列表
  let [params,setparams]=useState(
    {page:1,
    size:2,
    cate:"",
    text:"",
    hot:""
    }
  )
  let goodlist=useSelector(store=>store.good.list)
   let dispatch =  useDispatch()
//封装发送方法需要生复制
  const setfen=(key,value)=>{
    params[key]=value
    // if(key=="cate"&&value=="") params.page=1
    if(key!="page") params.page=1
    setparams(JSON.parse(JSON.stringify(params)))
  }    
  //搜索接口需要深复制
  const ud=e=>{
    settext(e)
      params.text = e
      setparams(JSON.parse(JSON.stringify(params)))
      if(e=""){
        params.text = ""
       setparams(JSON.parse(JSON.stringify(params)))
      }
  }
  //根据set改变试图改变
   useEffect(()=>{
    dispatch(action.Goodlist(params))
    return undefined
   },[params]) 

//删除操作
   const del=row=>{
    confirm({
      title: '警告',
      icon: <ExclamationCircleOutlined />,
      content: '删除？',
      okText: '是',
      okType: 'danger',
      cancelText: '不',
      onOk() {
        fetchGoodDel({id:row._id}).then(
          setparams(JSON.parse(JSON.stringify(params)))
        )
      },
      onCancel() {
        console.log(row);
      },
    });


   }
//批量删除
const mulDelete=()=>{
  confirm({
    title: '警告',
    icon: <ExclamationCircleOutlined />,
    content: '删除？',
    okText: '是',
    okType: 'danger',
    cancelText: '不',
    onOk() {
      let id=""
      id= ";"+ key.join(";")
      fetchGoodDel({id}).then(()=>{
        setparams(JSON.parse(JSON.stringify(params)))
      })
        },
    onCancel() {
      console.log(row);
    },
  });
}
//编辑新增
const edit=row=>{
  dispatch(action.goodclear())
  props.history.push("/good/update/"+(row._id?row._id:0))
}
  //列属性
  const columns = [
    {
      title: '商品',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: (text, record, index) =>{
       return <div className="gl-good ">
                <img src={imgurl.imgBase+record.img} />
                <p>{record.name}</p>
             </div>
      }
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      key: 'address',
      align: 'center',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key:"price",
      align: 'center',
      sorter: (a, b) => a.price - b.price,
      render:text=>{
        return <div>${text}</div>
      }
    },
    {
      title:"品类",
      dataIndex: 'cate',
      key:"cate",
      align: 'center',
      //需要在状态管理处获取索引
      render:(text,row,i)=>{
        let carr=catelist.filter(res=>res.cate==text)
        let ii=1
        catelist.map((res,i)=>{
          if(res.cate==carr[0].cate){
            return ii=i
          }
        })
      return <div> {catelist? catelist[ii].cate_zh:""}</div>
      }
      // const idx = catelist.findIndex(ele=>ele.cate===text)
      //   return <span>{idx>=0?catelist[idx].cate_zh:''}</span>
      // }
    },
    {
      title: '是否热销',
      dataIndex: 'hot',
      key: 'hot',
      align: 'center',
      render: text => <p>{text?"是":"否"}</p>,
    },
    {
      title: '上架时间',
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      render:(text)=>{
        return <div>
            <div>{moment(text).format('YYYY年MM月DD日')}</div>
            <div>{moment(text).format('hh:mm:ss')}</div>
        </div>
      }
    },
    {
      title: '操作',
      key: 'tags',
      align: 'center',
      dataIndex: 'tags',
      render: (text,row,i) => (
        <>
          <a  onClick={()=>del(row)} >删除</a>
          <a   onClick={()=>edit(row)}  >编辑</a>
        </>
      )
    }
  ]

//视图
  return (
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <div style={{margin:"20px 0"}}>
      <Row align='middle'>
          <Col span={2}>
            <span className='filter-label'>名称搜索:</span>
          </Col>
          <Col span={6}>
            <Input
            onChange={e=>ud(e.target.value)}
            value={text}
            allowClear
            onPressEnter={e=>setfen('text', e.target.value)}
            placeholder="搜索" />
          </Col>
          <Col span={2}>
            <span className='filter-label'>品类:</span>
          </Col>
          <Col span={6}>
            <CateSelect jj  onChange={cate=>setfen("cate",cate)}/>
          </Col>
          <Col offset={1} span={4}>
            <Select
              onChange={val=>setfen('hot', val)}
              style={{width: '100px'}}
              allowClear
              defaultValue=''
            >
              <Option key='1' value=''>全部</Option>
              <Option key='2' value={true}>是</Option>
              <Option key='3' value={false}>否</Option>
            </Select>
          </Col>

          <Col offset={1} span={2} style={{textAlign: 'right'}}>
            <Button
              size='small'
              type="primary"
              onClick={()=>edit(0)}
            >
              新增
            </Button>
          </Col>
        </Row>

      </div>
      {/* 表格 */}
      <div style={{margin: '20px 0'}}>
        <Table 
        pagination={{
          current:params.page,
          total: goodlist.total,
          defaultPageSize: params.size,
          onChange: page=>setfen("page",page),
          onShowSizeChange:(text,size)=> setfen("size",size),
          pageSizeOptions: [2,5,10,15,20],
          showSizeChanger:true,
          showQuickJumper:true
        }}
        rowSelection={{
          type:"checkbox ",
          onChange:a=>setkey(a)
        }}
        rowKey='_id'
        columns={columns} 
        dataSource={goodlist.list}
        footer={()=>{
          return <Button onClick={()=>mulDelete()} type='danger'>批量删除</Button>
        }}
        size='small'
        />

      </div>
    </div>
  )
}
