
import { Table, Tag, Space} from 'antd';
import {useSelector,useDispatch} from 'react-redux'
import {useEffect,useState} from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import './styleG.scss'
export default props=>{
    const goodData=useSelector(store=>store.good.goodData)

    console.log('------------',goodData);
    const dispatch=useDispatch()
    let  [page,setPage]=useState(1)
    let  [size,setSize]=useState(2)
    useEffect(()=>{
      let params={
        size,
        page
      }
      dispatch(action.goodListAction(params))
      return undefined
    },[size,page])

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
          render: () => (
            <>
              <a href="">编辑</a>
              <a href="">删除</a>
            </>
          )
        },
    ];
      


    return (
      <div className='qf-good-list'>
        <Table
          rowKey='_id'
          columns={columns}
          dataSource={goodData.list}
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