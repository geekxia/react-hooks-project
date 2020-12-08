import {
    Table, 
    Tag, 
    Space ,
    Button,
    Row,
    Col ,
    Pagination
} from 'antd'

//引入hooks的 dispatch 方法
import { useDispatch ,useSelector} from 'react-redux'
//用hook的生命周期
import { useEffect } from 'react'
//引入action
import actions from '@/store/actions'

import img from '@/utils/img';
import './style.scss'

import moment from 'moment'

export default props =>{

    const dispatch = useDispatch()
    //拿到数据里面的数据
    const goodData = useSelector(store => store.good.goodData)

    useEffect(() => {
        let params = {
            size:2
        }
        //触发掉接口，页面 dispatch
        dispatch(actions.getGoodList(params))

        return undefined
      }, []);

    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            align:'center',
            render: (text, record, index) =>{
                return(
                    <div className='gl-good'>
                        <img src={img.imgBase+record.img} alt=""/>
                        <a>{text}</a>
                    </div>
                )
            } ,
        },
        {
            title: '价格',
            dataIndex: 'price',
            align:'center',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
        render:price=><div>{'￥'+price}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            align:'center',
            key: 'hot',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            align:'center',
            key: 'desc',
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            align:'center',
            key: 'create_time',
            render:text =><div>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</div>
            },
        {
            title: '操作',
            key: 'tags',
            align:'center',
            dataIndex: 'tags',
            render: () => (
                <>
                    <a href="">删除</a>
                    <a href="">编辑</a>
                </>
            ),
        },
        
    ];
    
   
    const GoToAddPage = (e)=>{
        console.log('点击按钮',props)
        props.history.push('/ylq/homepage/goodlist/newaddpage')

    }

    return(
        <div className="lq-good-list">
            <h1>ylq 商品列表页面</h1>
            <div>
            {/* 新增按钮 */}
            <div>
                <Row>
                    <Col  offset={22}>
                        <Button 
                            type="primary"
                            size="small"
                            onClick={(e)=>GoToAddPage(e)}
                        >新增</Button>
                    </Col>
                </Row>
            </div>
            {/* 表格 */}
           <div style={{margin:'20px 0'}}>
           <Table 
                rowKey="_id" 
                columns={columns} 
                dataSource={goodData.list}
                Pagination ={{
                    total:goodData.total,
                    defaultCurrent:1
                }} 
           />
           </div>
            </div>

        </div>
    )
}