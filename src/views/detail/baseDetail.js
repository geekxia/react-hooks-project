import { Table  } from 'antd';
import { useEffect,useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import action from '@/store/actions'
import moment from 'moment'
import img from '@/utils/img'
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
    render: () => (
      <>
        <a href="">删除</a>
        <a href="">编辑</a>
      </>
    )
  }
];



function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

const BaseDetail=props=>{
    const dispatch=useDispatch()
    const list=useSelector(store=>store.detail.goodData.list)
    const total=useSelector(store=>store.detail.goodData.total)
    const [page,setPage]=useState(1)
    const [size,setSize]=useState(2)
    useEffect(()=>{
        let params={
            size,
            page
        }
        dispatch(action.detailList(params))
        return undefined
    },[page,size])
    return(
        <div className="f-top">
            <div>
                <p className="f-bd">首页/详情页/基础详情页</p>
            </div>
            <div>
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
                    pageSizeOptions: [2,5,10,15,20]
                  }}
                />
            </div>
        </div>
    )
}
export default BaseDetail