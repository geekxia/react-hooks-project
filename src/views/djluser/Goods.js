
import { Table, Tag, Space } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import action from '@/store/actions'
import img from '@/utils/img'
import  './style.scss'



export default props=>{


  const dispatch = useDispatch()
  const goodData = useSelector(store=>store.good.goodData)

  let [page,setPage] = useState(1)
  let [size,setSize] = useState(2) 

  useEffect(()=>{
    let params = {
      size,
      page
    }
    dispatch(action.getGoodList(params))
    return undefined
  },[])


  const columns = [
    {
      title: '名称处',
      dataIndex: 'name',
      key: 'name',
      render: (text,row,idx)=>{
        return(
          <div className='djgood-img'>
            <img src={img.imgBaseUrl+row.img} alt={row.name}/>
            <a>{text}</a>
          </div>
        )
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
      render:text=><div>{'￥'+text}</div>
    },
    {
      title: '是否热销',
      key: 'hot',
      dataIndex: 'hot',
      render:text=><div>{text?'是':'否'}</div>
    
    },
    {
      title: '上架时间',
      key: 'create_time',
      dataIndex:'create_time',
      render: text=><div>{text}</div>
    },
    {
      title:'操作',
      key:'tags',
      dataIndex:'tags',
      render:()=>(
        <>
          <a>删除</a>
          <a>编辑</a>
        </>
      )
    }
  ];
  
  

  return(
    <div className='dj-goodlist'>
      <h1>商品列表</h1>
      <Table 
        columns={columns} 
        rowKey='_id'
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