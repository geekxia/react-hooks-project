import { Table, Space,Button,Modal } from 'antd'
import { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import action from '@/store/actions'
import img from '@/utils/img'
import './style.scss'
import moment from 'moment'
import fetchDelGood from '@/utils/api'
import { ExclamationCircleOutlined } from '@ant-design/icons';


  

export default props=>{
    let [page,setPage] = useState(1)
    let [size,setSize] = useState(2)
    let good = useSelector(store=>store.good.good)
    let data = good.list
    const dispatch = useDispatch()
    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          align:'center',
          render: (text,row) => (
              <div className='gl-good'>
                  <img src={img.imgBaseUrl+row.img} />
                  <a>{text}</a>
              </div>
          ),
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:'center'
        },
        {
            title: '品类',
            dataIndex: 'cate',
            key: 'cate',
            align:'center'
        },
        {
          title: '描述',
          dataIndex: 'desc',
          key: 'desc',
          align:'center'
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align:'center',
            render:text=>(<span>{text?'是':'否'}</span>)
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align:'center',
            render:text=>(<span>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</span>)
        },
        {
          title: '操作',
          key: 'action',
          align:'center',
          render: (text, record) => (
            <Space size="middle">
                <Button 
                    type="primary" 
                    size='small' 
                    style={{fontSize:'12px'}}
                >
                    编辑
                </Button>
                <Button 
                    type="primary" 
                    danger 
                    size='small' 
                    style={{fontSize:'12px'}}
                    onClick={()=>delGood(record)}
                >
                    删除
                </Button>
            </Space>
          ),
        },
      ]

      const delGood = row=>{

          console.log(row)
        //   fetchDelGood({id:row._id}).then(res=>{
        //       console.log(res)
        //   })
      }

      const confirm=row=> {
        Modal.confirm({
          title: '警告',
          icon: <ExclamationCircleOutlined />,
          content: `你确定要删除${row.name}吗?`,
          okText: '确认',
          cancelText: '取消',
          onOk:delGood(row)
        });
      }

    useEffect(()=>{
        dispatch(action.getGoodListAction({
            page,
            size
        }))
        return undefined
    },[page,size])

    return (
        <div className='qf-good-list'>
            <h1>商品列表</h1>
            <Table 
                columns={columns} 
                rowKey='_id' 
                dataSource={data} 
                pagination={{
                    total:good.total,
                    onChange:(page)=>setPage(page),
                    onShowSizeChange:(c,size)=>setSize(size),
                    pageSizeOptions:[2,5,10,15,20],
                    defaultPageSize:size,
                    defaultCurrent:page
                }}
            />
        </div>
    )
}