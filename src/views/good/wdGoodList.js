import { Table, Tag, Space,Button, Switch  } from 'antd';
import img from '@/utils/img'
import moment from 'moment'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import {goodlistAction} from '@/store/actions'
export default props=>{
    const columns = [
        {
        title: '商品',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        render: (text,row,idx)=>{
            return (
                <div>
                    <img src={img.imgBase+row.img} alt={row.name} />
                    <a>{text}</a>
                </div>
            )
        },
        },
        {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align: 'center',
        },
        {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center',
        sorter: (a, b) => a.price - b.price,
        render:text=><div>{'$'+text}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
            render: text=> <div>{text?'是':'否'}</div>
        },
        {
        title: '上架时间',
        dataIndex:'create_time',
        key: 'create_time',
        align: 'center',
        render: text=>{
            return(
                <>
                    <div>
                        {moment(text).format('YYYY年MM月DD日')}
                    </div>
                </>
            )
        }
        },
        {
            title:'操作',
            key:'tags',
            align: 'center',
            dataIndex:'tags',
            render:()=>{
                <>
                    <Button type="primary">增加商品</Button>
                    <Button type="primary">删除商品</Button>
                </>
            }
        }
    ];
    const dispatch = useDispatch()
    const goodData = useSelector(store=>store.good.goodData)
    let [page,setPage]=useState(1)
    let [size,setSize]=useState(2)
    useEffect(()=>{
        let params={
            size,
            page
        }
        console.log('params',params)
        dispatch(goodlistAction(params))
        return undefined
    })
    return(
        <div>
            <h1>商品列表</h1>
            
            <div style={{margin:'20px 0'}}>
                <Table columns={columns}  
                dataSource={goodData.list}/>
            </div>
            
        </div>
    )
} 