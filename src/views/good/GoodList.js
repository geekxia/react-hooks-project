import {
  Table, 
  Space,
  Button,
  Modal,
  Input,
  Row, 
  Col,
  Select
} from 'antd'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import { fetchDelGood } from '@/utils/api'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CatesSelect from './components/CatesSelect'

const { Option } = Select


  

export default props=>{
    let str=''
    let [text,setText] = useState('')
    let [filter, setFilter] = useState({
      page:1,
      size:3,
      name:'',
      cate:'',
      hot:''
    })
    let good = useSelector(store=>store.good.good)
    let cates = useSelector(store=>store.good.cates)
    let data = good.list
    const dispatch = useDispatch()
    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          className:'qf-table-row',
          render: (text,row) => (
              <div className='gl-good'>
                  <img src={img.imgBaseUrl+row.img} />
                  <a>{text}</a>
              </div>
          ),
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:'center',
          className:'qf-table-row',
          sorter: (a, b) => a.price - b.price,
          render:text=>(<span>{'￥'+text}</span>)
        },
        {
            title: '品类',
            dataIndex: 'cate',
            key: 'cate',
            align:'center',
            className:'qf-table-row',
            render:text=>{
              const item = cates.find(ele=>ele.cate===text)
              return (<span>{ item && item.cate_zh}</span>)
            }
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
          className:'qf-table-row',
          align:'center',
          render:text=>(<div style={{width:'150px',margin:'0 auto'}}>{text}</div>)
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            className:'qf-table-row',
            align:'center',
            render:text=>(<span>{text?'是':'否'}</span>)
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            className:'qf-table-row',
            align:'center',
            render:text=>(<div>
              <span>{moment(text).format('YYYY-MM-DD')}</span>
              <br/>
              <span>{moment(text).format('HH:mm:ss')}</span>
            </div>)
        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          className:'qf-table-row',
          render: (text, record) => (
            <Space size="middle">
                <Button 
                    type="primary" 
                    size='small' 
                    style={{fontSize:'12px'}}
                    onClick={()=>skipToAdd(record)}
                >
                    编辑
                </Button>
                <Button 
                    type="primary" 
                    danger 
                    size='small' 
                    style={{fontSize:'12px'}}
                    onClick={()=>confirm(record)}
                >
                    删除
                </Button>
            </Space>
          ),
        },
      ]

      const delGood = id=>{
          // console.log(row)
          fetchDelGood({id}).then(res=>{
            dispatch(action.getGoodListAction(filter))
          })
      }

      const confirm=row=> {
        Modal.confirm({
          title: '警告',
          icon: <ExclamationCircleOutlined />,
          content: <div>你确定要删除 <span style={{color:'red'}}>{row.name}</span> 吗?</div>,
          okText: '确认',
          cancelText: '取消',
          onOk:()=>delGood(row._id)
        });
      }

      const confirmArr = ()=>{
        if(str){
          Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: <div>你确定要删除这些商品吗?</div>,
            okText: '确认',
            cancelText: '取消',
            onOk:()=>delGood(str)
          });
        }else{
          Modal.warning({
            title: '提示',
            content: '你还没有选择商品哦！',
            okText: '知道了'
          });
        }
        
      }

      const skipToAdd = row=>{
        dispatch(action.clearGoodDetail())
        row ? props.history.push('/good/add/'+row._id):props.history.push('/good/add/0')
        
      }

      const filterChange = (key,val)=>{
        filter[key] = val
        if(key!=='page') filter.page=1
        filter = JSON.parse(JSON.stringify(filter))
        setFilter(filter)
      }

      const inputChange = e=>{
        // console.log(e.target.value)
        if(!e.target.value){
          filter.text = ''
          filter = JSON.parse(JSON.stringify(filter))
          setFilter(filter)
        }
        setText(e.target.value)
      }

      const delManyGood = id=>{
        str = ''
        id.map(ele=>{
          str+=(';'+ele)
        })
      }
      

    useEffect(()=>{
        dispatch(action.getGoodListAction(filter))
        return undefined
    },[filter])

    return (
        <div className='qf-good-list'>
            <h1>商品列表</h1>
            <div className='qf-good-filter'>
              <Row align='middle' style={{fontSize:'12px'}}>

                <Col span={2}>
                  <span className='filter-label'>商品名称 : </span>
                </Col>

                <Col span={5}>
                  <Input 
                    placeholder="名称搜索" 
                    size='default' 
                    value = {text}
                    onChange = {e=>inputChange(e)}
                    allowClear
                    onPressEnter = {e=>filterChange('text',text)}
                  />
                </Col>

                <Col span={3}>
                  <span className='filter-label'>商品类别 : </span>
                </Col>

                <Col span={4}>
                  <CatesSelect allCate onChange={e=>filterChange('cate',e)} value={filter.cate}/>
                </Col>

                <Col span={3}>
                  <span className='filter-label'>商品状态 : </span>
                </Col>

                <Col span={4}>
                  <Select
                    style={{ fontSize:'12px',width: 150 }}
                    placeholder="选择状态"
                    optionFilterProp="children"
                    onChange={e=>filterChange('hot',e)}
                    size='small'
                  >
                    <Option value="">全部</Option>
                    <Option value={true}>热销商品</Option>
                    <Option value={false}>非热销商品</Option>
                  </Select>
                </Col>

                <Col span={2} offset={1}>
                  <Button 
                    type="primary" 
                    size='small'
                    onClick = {()=>skipToAdd()}
                  >
                    添加
                  </Button>
                </Col>

              </Row>
            </div>
            


            <Table 
                columns={columns} 
                rowKey='_id' 
                dataSource={data} 
                pagination={{
                  total:good.total,
                  onChange:(page)=>filterChange('page',page),
                  onShowSizeChange:(c,size)=>filterChange('size',size),
                  pageSizeOptions:[3,5,10,15,20],
                  defaultPageSize:filter.size,
                  current:filter.page
              }}
                size='middle'
                rowSelection={{
                  onChange:(id)=>delManyGood(id)
                }}
                footer={()=>(
                <Button 
                  type="primary" 
                  danger 
                  size='small' 
                  style={{fontSize:'12px'}} 
                  onClick={()=>confirmArr()}
                >
                  批量删除
                </Button>
                )}
            />
        </div>
    )
}