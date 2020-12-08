
import { useEffect,useState }  from "react"
import { useDispatch,useSelector } from "react-redux";
import action from "@/store/actions";
import { Table, Tag, Space,Button } from 'antd';
import img from '@/utils/img'
import moment from 'moment'
import "./sty.scss"

export default props=>{ 

  const dispatch=useDispatch()

  const goodData =useSelector(store=>store.good.goodData)
  
  let [page,setPage]=useState(1)
  let [size,setSize]=useState(5)

  // 生命周期
  useEffect(()=>{
    let params={ 
      size:5,
      page
    }
    dispatch(action.getGoodList({params}))
    return undefined
  },[page,size])

    const columns = [
        { 
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          align:"center",
          render: (text,row,idx) => {
            return(
              <div className="gl-good"> 
                <img src={img.imgBase+row.img} alt={row.name} />
                <a>{text}</a>
              </div>
            )
          },
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:"center",
          sorter: (a, b) => a.price - b.price,
          render: text=> <div>{'￥'+text}</div>
        },
        {
          title: '商品介绍',
          dataIndex: 'desc',
          key: 'desc',
          align:"center",
          
        },
        { 
          title: '上架时间',
          key: 'create_time',
          dataIndex: 'create_time',
          align:"center",
          
          render: text => {
            return (
              <>
                <div>{moment(text).format('YYYY年MM月DD日')}</div> 
                <div>{moment(text).format('hh:mm:ss')}</div>
              </>
            );
          }
        },
        {
          title: '操作',
          key: 'tags',
          align:"center",
          render: () => (
            < >
              <a href="">删除</a>
              <a href="">编辑</a>
            </>
          ),
        },
      ];


    return(
        <div className="">
            <h1>商品列表</h1>
            <hr/>
            <Button onClick={()=> props.history.replace("/goodlist/updata")}>新增</Button>

            <div style={{margin: '20px 0'}}>
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

        </div>
    )
}




