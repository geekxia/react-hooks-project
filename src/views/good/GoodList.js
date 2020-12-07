
import { Table, Tag, Space,Pagination  } from 'antd';

import {useSelector,useDispatch} from 'react-redux'

import {useEffect,useState} from 'react'

import action from '../../store/actions'

import img from '../../utils/img'

import moment from 'moment'
import { formatCountdown } from 'antd/lib/statistic/utils';

export default props =>{

 let [page,setPage]= useState(1)
 let [size,setSize]= useState(2)

 const dispatch = useDispatch()

  const goodData = useSelector(store=>store.good.goodData)

 useEffect(()=>{
    let params = {size,page,}
    dispatch(action.getGoodList(params))
   return undefined
 },[page,size])
    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          render: (text,row,idx) => {
            return (
              <div >
                 <img style={{width:'50px',height:'50px',display:'block',margin:'0 auto'}} src={img.imgBase+row.img} alt={row.name}/>
                  <a>{text}</a>
              </div>
            )
        },
      },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:'center',
          sorter: (a, b) => a.price - b.price,
          render:text=> <div>{'$'+text}</div>
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
          align:'center',
        },
        {
          title: '是否热销',
          dataIndex: 'hot',
          key: 'hot',
          align:'center',
          render:text=> <div>{text?'是':'否'}</div>
        },
        {
          title: '上架时间',
          dataIndex: 'create_time',
          key: 'create_time',
          align:'center',
          render:text=> {
            return (
              <div>
                 <div>{moment(text).format('YYYY-MM-DD')}</div>
                 <div>{moment(text).format('HH:mm:ss')}</div>
                 <div>{moment(text).format('MM月 dddd')}</div>
               
              </div>
            )
          }
        },
        {
          title: '操作',
          key: 'tags',
          dataIndex: 'tags',
          align:'center',
          render: () => (
            <>
               <a href=''>编辑</a>
               <a href=''>删除</a>
            </>
          ),
        },
       
      ];
      
     
      
    return (
        <div className='qf-good-list'>
            <h1>商品列表</h1>
            <div>
                 查询条件
            </div>
            <div style={{magin:'20px'}}>
                <Table 
                pagination={{
                  total:goodData.total,
                  defaultPageSize:size,
                  onChange:page=>{setPage(page)},
                  onShowSizeChange:(page,size)=>{setSize(size)},
                  pageSizeOptions:[2,5,10,15,20]
                }}
                columns={columns} 
                dataSource={goodData.list} 
                rowKey='_id'/>
            </div>
        </div>
    )
}