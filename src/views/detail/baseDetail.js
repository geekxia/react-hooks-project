import { Table ,Row, Col,Input ,Select } from 'antd';
import { useEffect,useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import action from '@/store/actions'
import moment from 'moment'
import img from '@/utils/img'
import './detail.scss'
import CreateSelect from "@/views/components/createSelect"
import api from '../../utils/api';
const { Option } = Select



function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

const BaseDetail=props=>{
    const dispatch=useDispatch()
    const list=useSelector(store=>store.detail.goodData.list)
    const total=useSelector(store=>store.detail.goodData.total)

    const [page,setPage]=useState(1)
    const [text,setText]=useState("")
    const [cate,setCate]=useState([])
    const [size,setSize]=useState(2)
    const [hot,setHot]=useState('')
    const handdel=(row)=>{
      api.fetchGoodDel({id:row._id}).then(res=>{
        console.log(res)
        setPage(JSON.parse(JSON.stringify(page)))
      })
    }
    const textChange = val => {
      console.log('value text', val)
      setText(val)
      // if(!val) {
      //   filter.text = ''
      //   setFilter(JSON.parse(JSON.stringify(filter)))
      // }
    }
    const cateChange=(val)=>{
      console.log('value text', val)
      setCate(val)

    }
    const SelectChange=(val)=>{
      setHot(val)
    }
    useEffect(()=>{
        let params={
            size,
            page,
            text,
            cate,
            hot
        }
        dispatch(action.detailList(params))
        return undefined
    },[page,size,text,cate,hot])
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render:(text,row,idx)=> {
            return(
                <div className="f-img">
                    <img src={img.imgBase+row.img} alt={row.name}/>
                    <span>{text}</span>
                </div>
            )
        }
      },
      {
        title: '描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        sorter: {
          compare: (a, b) => a.price - b.price,
        },
      },
      {
        title: '是否热销',
        dataIndex: 'hot',
        render:text=> text? "是":"否"
      },
      {
        title: '上架时间',
        dataIndex: 'create_time',
        key:"create_time",
        render:text => moment(text).format('YYYY-MM-DD')
      },
      {
        title: '操作',
        key: 'tags',
        align: 'center',
        dataIndex: 'tags',
        render: (text,row) => (
          <div className="f-del">
            <a onClick={()=>handdel(row)}>删除</a>
            <a >编辑</a>
          </div>
        )
      }
    ];
    
    return(
        <div className="f-top">
            <div>
                <p className="f-bd">首页/详情页/基础详情页</p>
            </div>
            <div className="f-col">
            <Row>
              <Col span={2}>
                <span>
                    搜索
                </span>
              </Col>
              <Col span={4}>
                   <Input 
                        placeholder="搜索"
                        size="small" 
                        value={text}
                        allowClear
                        onChange={e=>textChange(e.target.value)}
                        />
              </Col>
              <Col span={2}>
                <span>
                   品类
                </span>
              </Col>
              <Col span={4}>
                  <CreateSelect 
                  has
                  onChange={(val)=>cateChange(val)}
                  />
              </Col>
              <Col>
                  <span>是否热销</span>
              </Col>
              <Col>
                  <Select
                  onChange={(val)=>SelectChange(val)}
                  >
                    <Option value="">全部</Option>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                  </Select>
              </Col>
            </Row>
            </div>
            <div className="f-table">
                <Table 
                columns={columns}
                dataSource={list}
                rowKey='_id'
                onChange={onChange} 
                pagination={{
                    total:total,
                    defaultPageSize: size,
                    onChange: page=>setPage(page),
                    onShowSizeChange: (page, size)=>setSize(size),
                    pageSizeOptions: [1,2]
                  }}
                />
            </div>
        </div>
    )
}
export default BaseDetail