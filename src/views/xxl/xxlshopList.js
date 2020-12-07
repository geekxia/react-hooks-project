import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import action from '@/store/actions'
import { Table } from 'antd';
import img from "@/utils/img"
import "@/assets/xxl/xxlgood.scss"
import moment from 'moment'
import { Image } from 'antd';

export default props=>{
    let shopDate =  useSelector(store=>(store.xxlgetshop.shopDate))
    const dispatch = useDispatch()
    let [size,setSize] = useState(2)
    let [page,setPage] = useState(1)
    const shopChange = (e,val,id)=>{
        e.preventDefault();
        if(val==="editing"){
            console.log("编辑")
            console.log(id)
        }if(val==="del"){
            console.log("删除")
            console.log(id)
        }   
    }
    useEffect(()=>{
        let params = {
            page,
            size
        }
        dispatch(action.xxlGetShop(params))
        return undefined
    },[page,size])
    console.log("后端返回数据",shopDate)
    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key:"name",
          align:"center",
          render:(text,record,index)=>{
              //text当前行值
              //record当前行数据
              //index当前行索引
              return (
                  <div className="xxl-good">
                       <Image
                        width={80}
                        src={img.imgBase+record.img}
                        />
                      {/* <img src={img.imgBase+record.img} alt="0"/> */}
                      <a href="#">{text}</a>
                  </div>
              )
          }
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key:"desc",
          align:"center",
        },
        {
          title: '价格',
          dataIndex: 'price',
          key:"price",
          align:"center",
          sorter: (a, b) => a.price - b.price,
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key:"hot",
            align:"center",
            sorter: (a, b) => a.hot - b.hot,
            render:(text,record,index)=>{
                //text当前行值
                //record当前行数据
                //index当前行索引
                return (
                    <div>
                        {record.hot ? <span>是</span>:<span>否</span>}
                    </div>

                )
            }

        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key:"create_time",
            align:"center",
            sorter: (a, b) => a.create_time - b.create_time,
            render:(text,record,index)=>{
                //text当前行值
                //record当前行数据
                //index当前行索引
                return (
                    <>
                        <div>{moment(text).format("YYMM-DD:HH")}</div>
                    </>

                )
            }
        },{
            title: '操作',
            dataIndex: 'tags',
            key:"tags",
            align:"center",
            render:(text,record,index)=>(
                <>
                    <a href="" onClick={(e)=>shopChange(e,"del",record._id)}>删除</a>
                    <a href="" onClick={(e)=>shopChange(e,"editing",record._id)}>编辑</a>
                </>
            )
        },
    ];
    return (
        <div>
            <Table 
                rowKey="_id"
                columns={columns} 
                dataSource={shopDate.list} 
                size="middle" 
                pagination={{
                    total:shopDate.total,
                    defaultPageSize:size,
                    pageSizeOptions:[2,5,10,15,20],
                    onChange:page =>setPage(page),
                    onShowSizeChange:(page,size) =>setSize(size)
                }}
            />
        </div>
    )
}