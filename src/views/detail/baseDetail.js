import { Table } from 'antd';
import { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import action from '@/store/actions'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
    sorter: {
      compare: (a, b) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: 'English Score',
    dataIndex: 'english',
    sorter: {
      compare: (a, b) => a.english - b.english,
      multiple: 1,
    },
  },
];



function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

const BaseDetail=props=>{
    const dispatch=useDispatch()
    const list=useSelector(store=>store.detail.list)
    // console.log(list)
    useEffect(()=>{
        dispatch(action.detailList())
        return undefined
    },[])
    return(
        <div className="f-top">
            <div>
                <p className="f-bd">首页/详情页/基础详情页</p>
            </div>
            <div>
                <Table columns={columns} dataSource={list} onChange={onChange} />
            </div>
        </div>
    )
}
export default BaseDetail