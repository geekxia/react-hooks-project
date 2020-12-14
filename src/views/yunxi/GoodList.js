import { 
  Table, 
  Tag, 
  Space,
  Row,
  Col,
  Input,
  Button,
  Select,
  Modal
 } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import action from '@/store/actions' 
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import CateSelect from './components/CoogSelect'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '@/utils/api'
// import { render } from 'less';
const { Option } = Select  // 用于热销布尔值的切换
const { confirm } = Modal;  // 把confirm解构出来

export default props => {
  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)
  const cates = useSelector(store=>store.good.cates)


  let [text,setText] =useState('')
  let [keys,setKeys] = useState([])

  let [filter,setFilter] = useState({   // 初始值
    size:2,
    page:1,
    text:'',
    hot:''
  })

  const textChange=val=>{
    console.log('vule text',val);
    setText(val)  // 其他情况不用调接口
    if(!val){
      filter.text=''    // text重置为空
      setFilter(JSON.parse(JSON.stringify(filter)))  // 当它等于空时刷新
    } 
  }

  const filterChange = (key,val)=>{
    filter[key]=val
    if(key!=='page') filter.page=1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter',filter);
}

// 删除操作  （其实可以封装放在props上）  
const handleDel = row => {
  const ele = <span style={{color: 'red'}}>{row.name}</span>
  confirm({
    title: '警告',
    icon: <ExclamationCircleOutlined />,
    content: <div>你确定要删除 {ele} 吗？</div>,  //这个是react元素
    okText: '确定',
    cancelText: '取消',  //封装删除api
    onOk() {  //确定删除  调接口删除
      api.fetchGoodDel({id:row._id}).then(()=>{
        setFilter(JSON.parse(JSON.stringify(filter))) //删除后，刷新列表
      })
    }
  })
}

const mulDelete = () =>{
  // 调接口
  let id=''
  keys.map(ele=>id+=(';'+ ele))
  console.log('批量删除 id' , id);
  api.fetchGoodDel({id}).then(()=>{
    setFilter(JSON.parse(JSON.stringify(filter))) //删除后，刷新列表
  })
}

  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  },[filter]) //page变化重新调接口

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
        title: '品类',
        dataIndex: 'cate',
        key: 'cate',
        align: 'center',
        render: cate=>{
          // 显示对应的品类
          const idx = cates.findIndex(ele=>ele.cate===cate)
          // 为了考虑程序的健壮，当没有的品类时，就不会报错，把它设置为空
          return <span>{idx>=0?cates[idx].cate_zh:''}</span>
        }
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
        render:(text,row) => (
          <div className='table-btn'>
            <a onClick={()=>handleDel(row)}>删除</a>
            <a href="">编辑</a>
          </div>
        ),
      },
  ];
  return(
    <div className='qf-good-list'>
      <h1>商品列表</h1>
      <hr />

      {/* 第一行 */}
      <div style={{margin:'25px 0'}} className='qf-filter'>
       <Row align='middle'>
        <Col span={2}>
          <span className='qf-label'>名称搜索:</span>
        </Col>
        <Col span={4}>
          <Input 
            value={text}  
            allowClear // 删除按钮，点击清空输入框的内容
            // 搜索时模糊查询
            onChange={e=>textChange(e.target.value)}
            placeholder="搜索 . . ."
            onPressEnter={e=>filterChange('text',e.target.value)}
          />
        </Col>
        <Col span={2}>
          <span className='qf-label'>品类:</span>
        </Col>
        <Col span={5}> 
        {/* 当点击对应的品类会重新调用接口，刷新数据 */}
          <CateSelect 
            hasAll   //传了就会显示有全部的品类选项 
            onChange={cate=>filterChange('cate',cate)} 
            // 这个方法封装了，手动传了就有，没传就没有
            allowClear 
            />
        </Col>

        <Col span={1}>
          <span className='qf-label'>状态:</span>
        </Col>
        <Col span={2}>
         <Select 
            onChange={val=>filterChange('hot',val)}
            style={{width:'100px'}}
            allowClear
            defaultValue='' // 给个默认的初始值
         >
           <Option key='1' value={''}>全部</Option>
           <Option key='2' value={true}>是</Option>
           <Option key='3' value={false}>否</Option>
         </Select>
        </Col>

        <Col  span={2} style={{textAlign:'right'}}>
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
            current:filter.page, //输入搜索指定商品时，点亮当前页为1，显示商品
            showSizeChanger:true,   // 开启设置默认不是50页
            total: goodData.total,
            defaultPageSize: filter.size,
            onChange: page=>filterChange('page',page), //page页码变化
            onShowSizeChange: (page, size)=>filterChange('size',size), //如切换10页就给它显示10页
            pageSizeOptions: [2,4,6,8,10]
          }}
          // 多批删除
          rowSelection={{
            type: 'checkbox',
            onChange: keys=>setKeys(keys)
          }}
          footer={() => <Button size='small' onClick={()=>mulDelete()} type='danger'>批量删除</Button>}
          size='small'
        />
      </div>
    </div>
  )
}




