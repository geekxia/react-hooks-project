import React, { useEffect, useState } from 'react'

import { Table, Tag, Space, Image, Input  } from 'antd';

const { Search } = Input;

import {
    useSelector,
    useDispatch
} from 'react-redux'

import action from '@/store/actions'


export default props => {
    const foodList = useSelector(store=>store.food.foodList)
    const foodName = useSelector(store=>store.food.foodName)

    let [size,setSize] = useState(4)
    let [page,setPage] = useState(1)

    console.log(foodList);
    const dispatch = useDispatch()
    useEffect(()=>{
        const str = 'keyword=白菜&num=10&appkey=dcb2540a5b61d78593586680adff558d'
        const params = {}
        str.split('&').map(ele=>{
            let arr = ele.split('=')
            params[arr[0]] = arr[1]
        })
        params.num = 20
        params.keyword = foodName
        console.log(params);
        dispatch(action.foodListAction(params))
        return undefined
    },[foodName])

    const onSearch = value => dispatch(action.foodNameAction(value))

    const columns = [
        {
          title: '图片',
          dataIndex: 'pic',
          key: 'pic',
          width: '150px',
          render: pic=>{
            return <Image width={100} src={pic} />
          }
        },
        {
            title: '美食名称',
            dataIndex: 'name',
            key: 'name',
            width: '150px'
        },
        {
          title: '特色',
          dataIndex: 'tag',
          key: 'tag',
          width: '250px'
        },
        {
          title: '用餐人数',
          dataIndex: 'peoplenum',
          key: 'peoplenum',
          width: '150px'
        },
        {
          title: '烹饪时间',
          dataIndex: 'cookingtime',
          key: 'cookingtime',
          width: '150px'
        }
    ]
    

    return (
        <div className="tt-food"> 
            <div className="tt-searchName">
                <span className='tt-foodText'>请输入菜谱关键字：</span>
                <Search
                    placeholder="紫菜蛋花汤"
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 200, margin: '0 10px' }}
                />
            </div>       
            <div className="tt-foodTable">
                <Table 
                    dataSource={foodList} 
                    columns={columns} 
                    rowKey={record => record.id} 
                    pagination={{ 
                        showSizeChanger: true,
                        defaultCurrent: page,
                        pageSizeOptions: [2,4,5,10],
                        defaultPageSize: size,
                        // onChange: page=>setPage(page),
                        onShowSizeChange: (page,size)=>(setSize(size))
                    }}
                />
            </div>
        </div>
    )
}