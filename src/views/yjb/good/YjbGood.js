import { Table } from 'antd'
import {useDispatch,useSelector}from 'react-redux'
import {useEffect,useState}from 'react'
import img from '@/utils/img'
import moment from 'moment'
import action from '@/store/actions'
import './style.scss'

const YjbGood = (props)=>{
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    console.log('商品data',goodData)
    let [page, setPage] = useState(1)
    let [size, setSize] = useState(2)
  
    useEffect(()=>{
      let params = {
        size,
        page
      }
      dispatch(action.getGoodList(params))
      return undefined
    }, [page, size])
  

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key:'name',
            align: 'center',
            render:(text,row,idx)=>{
                return(
                    <div className="jb-good">
                        <img src={img.imgBase+row.img} alt={row.name}/>
                        <a>{text}</a>
                    </div>
                )
            }
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
            key:"desc",
            align: 'center',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key:"price",
            align: 'center',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price - b.price,
            render: price=> <div>{'￥'+price}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
            render:text=><div>{text?'是':'否'}</div>
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
            render:text=>{
                return(
                    <div>
                        <div>{moment(text).format('YYYY年MM月DD日')}</div>
                        <div>{moment(text).format('HH:mm:ss')}</div>
                    </div>
                )
            }
        },
        {
            title: '操作',
            key: 'tags',
            align: 'center',
            dataIndex: 'tags',
            render:()=>(
                <div>
                    <a href="">删除</a>
                    <a href="">编辑</a>
                </div>
            )
        }
      ];
      
      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return (
        <div className="YJB-GoodList">
            <h1>商品列表</h1>
            <Table
             rowKey='_id'
             columns={columns}
             dataSource={goodData.list}
             onChange={onChange} 
             pagination={{
                total: goodData.total,
                defaultPageSize: size,
                onChange: page=>setPage(page),
                onShowSizeChange: (page, size)=>setSize(size),
                pageSizeOptions: [2,5,10,15,20]
              }}
            />
        </div>
    )
}

export default YjbGood