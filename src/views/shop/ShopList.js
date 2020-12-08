import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { useDispatch,useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import CateSelect from './components/CateSelect'
import style from './style.scss'
import { AudioOutlined } from '@ant-design/icons'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { 
    Table, 
    Tag, 
    Space,
    Button ,
    Row,
    Col,
    Input
} from 'antd';
import api from '../../utils/api'
const { Search } = Input;

export default props =>{

  const dispatch = useDispatch()
  const shopData = useSelector(store=>store.shop.shopData)
  const cates = useSelector(store=>store.shop.cates)
  //跳转到商品新增页面
  const history = useHistory()
  const skipToAdd = ()=>{
      history.push('/shop/addList')
  } 
  let [page,setPage] = useState(1)
  let [size,setSize] = useState(5)
  let [text,setText] = useState('')
  // let [filter,setFilter] = useState({
  //   page:1,
  //   size:5,
  //   text:''
  // })

  const onSearch = value =>{
    console.log(value)
    setText(value)
  }
  //   if(!val) {
  //     filter.text = ''
  //     setFilter(JSON.parse(JSON.stringify(filter)))
  //   }
  // }

  // const filterChange=(key,val)=>{
  //   filter[key] = val
  //   if(key!=='page') filter.page=1
  //   setFilter(JSON.parse(JSON.stringify(filter)))

  // }

  const handleDel = row =>{
  const ele = <span style={{color:'red'}}>{row.name}</span>
  confirm({
    title:'警告',
    icon:<ExclamationCircleOutlined />,
    content:<div>你确定要删除吗{ele}吗?</div>,
    okText:'确定',
    cancelText:'取消'
  })
  }

  useEffect(()=>{
    let params = {
     page,
     size,
     text
    }
    dispatch(action.getShopList(params))
    return undefined
  },[page,size,text])


    const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
          render: (text,row,idx) => {
            return(
              <div className='zgf-shop'>
                <img src={img.imgBase+row.img} alt={row.name} />
                <a>{text}</a>
              </div>
            )
          }
        },
        {
          title: '品类',
          dataIndex: 'cate',
          key: 'cate',
          render:cate=>{
            const idx = cates.findIndex(ele=>ele.cate===cate)
            return <span>{idx>=0?cates[idx].cate_zh:''}</span>
          }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.price - b.price,
          render:text=><div>{'￥'+text}</div>
        },
        {
          title: '是否热销',
          key: 'hot',
          dataIndex: 'hot',
        render: text => <div>{text?'是':'否'}</div>
        },
        {
          title: '上架时间',
          key: 'create_time',
          dataIndex:'create_time',
          render: text=>{
            return(
              <div>
                <div>{moment(text).format('YYYY年MM月DD日')}</div>
                <div>{moment(text).format('hh:mm:ss')}</div>
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex: 'tags',
          render: ()=>{
            return(
              <div>
                <a onClick={()=>handleDel(row)}>删除</a>/
                <a href=''>编辑</a>
              </div>
            )
          }
        },
      ]

    return(
        <div className='shop-list'>
            <div>
                <h1>商品列表</h1>
                <Row>
                  <Col span={6}>
                    <Search 
                      placeholder="商品搜索" 
                      onSearch={onSearch} 
                      style={{ width: 200 }}
                    />

                  </Col>

                  <Col span={6}>
                    <CateSelect 
                       
                    />
                  </Col>

                  <Col span={4}>
                    <Button type="primary" onClick={skipToAdd}>新增</Button>
                  </Col>

                </Row>
            </div>
            <div className='zgf-shop-list'>
                {<Table 
                  rowKey = '_id'
                  columns={columns} 
                  dataSource={shopData.list}
                  pagination={{
                    current:page,
                    defaultPageSize:size,
                    total:shopData.total,
                    onChange:page=>setPage(page),
                    onShowSizeChange:(page,size)=>setSize(size),
                    pageSizeOption:[2,5,10,15,20]
                  }}
                  />}
            </div>
        </div>
    )
}