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
    Select,
    Button ,
    Row,
    Col,
    Input,
    Modal
} from 'antd';
import api from '../../utils/api'


const { Search } = Input
const { confirm } = Modal

export default props =>{

  const dispatch = useDispatch()
  const shopData = useSelector(store=>store.shop.shopData)
  const cates = useSelector(store=>store.shop.cates)

  //跳转到商品新增页面、编辑页
  const history = useHistory()
  const skipToAdd = (row)=>{
    // 先清空状态管理中的shopInfo
    // dispatch(action.clearShopDteail)
    // 在跳转到详情页
      props.history.push('/shop/addList/'+(row?row._id:0))
  } 
 
  let [keys,setKeys] = useState([])

  let [filter,setFilter] = useState({
    page:1,
    size:5,
    text:'',
    hot:''
  })

  // const textChange = val =>{
  //   setText(val)
  //   if(!val){
  //     filter.text=''
  //     setFilter(JSON.parse(JSON.stringify(filter)))
  //   }
  // }

  const onSearch = value =>{
    console.log(value)
    filterChange('text',value)
  }

  const filterChange=(key,val)=>{
    filter[key] = val
    if(key!=='page') filter.page=1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter',filter)
  }

  const handleDel = row =>{
  const ele = <span style={{color:'red'}}>{row.name}</span>
  console.log('ele',ele)
  confirm({
    title:'警告',
    icon:<ExclamationCircleOutlined />,
    content:<div>你确定要删除吗{ele}吗?</div>,
    okText:'确定',
    cancelText:'取消',
    onOk(){
      api.fetchShopDel({id:row._id}).then(()=>{
        setFilter(JSON.parse(JSON.stringify(filter)))
      })
    }
  })
  }


  //批量删除
  const mulDelete = ()=>{
    let id = ''
    keys.map(ele=>id+=(';'+ele))
    // 向后端传递由id组成的字符串，不能传数组
    api.fetchShopDel({id}).then(()=>{
      setFilter(JSON.parse(JSON.stringify(filter)))
    })
  }

  useEffect(()=>{
    dispatch(action.getShopList(filter))
    return undefined
  },[filter])


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
          render: (text,row)=>{
            return(
              <div>
                <a onClick={()=>handleDel(row)}>删除</a>/
                <a onClick={()=>skipToAdd(row)}>编辑</a>
              </div>
            )
          }
        }
      ]

    return(
        <div className='shop-list'>
            <div>
                <h1>商品列表</h1>
                <Row>
                  <Col span={6}>
                    <Search 
                      placeholder="商品搜索" 
                      // value={text}
                      // onChange={e=>textChange(e.target.value)}
                      onSearch={onSearch} 
                      style={{ width: 200 }}
                    />

                  </Col>

                  <Col span={6}>
                    <CateSelect 
                       onChange={cate=>filterChange('cate',cate)}
                       hasAll
                       allowClaer
                    />
                  </Col>

                  <Col span={6}>
                    <Select
                        style={{ width: '100px' }}
                        placeholder="状态搜索"
                        onChange={hot=>filterChange('hot',hot)}
                        defaultValue=''
                    >
                        
                          <Option key='1' value='' >全部</Option>
                          <Option key='2' value={true} >是</Option>
                          <Option key='3' value={false} >否</Option>
                        
                    </Select>
                  </Col>

                  <Col span={4} offset={2} style={{textAlign:'right'}}>
                    <Button type="primary" onClick={()=>skipToAdd()}>新增</Button>
                  </Col>

                </Row>
            </div>
            <div className='zgf-shop-list'>
                {<Table 
                  rowKey = '_id'
                  columns={columns} 
                  dataSource={shopData.list}
                  pagination={{
                    current:filter.page,
                    defaultPageSize:filter.size,
                    total:shopData.total,
                    onChange:page=>filterChange('page',page),
                    onShowSizeChange:(page,size)=>filterChange('size',size),
                    pageSizeOption:[2,5,10,15,20]
                  }}
                  rowSelection={{
                    type: 'checkbox',
                    onChange:keys=>setKeys(keys)
                  }}
                  footer={()=><Button size='small' type="danger" onClick={()=>mulDelete()}  >批量删除 </Button>}
                />}
            </div>
        </div>
    )
}