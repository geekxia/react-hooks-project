import { Table, Tag, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import action from "@/store/actions"
import img from "@/utils/img"



export default props => {


    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getQGoodListAction({
            size,
            page
        }))
        return undefined
    }, [page, size])
    const goods = useSelector(store => store.Qgood.QGoodData)
    console.log("打印一下goods", goods);


    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (text, row, idx) => {
                return (
                    <div className='gl-good'>
                        <img src={img.imgBase + row.img} style={{ display: "block", width: "80px" }} />
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
            render: text => <div>{'￥' + text}</div>
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align: 'center',
            render: text => <div>{text ? '是' : '否'}</div>
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: 'center',
            render: text => {
                return (<div>{text}</div>)
            }
        },
        {
            title: '操作',
            key: 'tags',
            align: 'center',
            dataIndex: 'tags',
            render: () => (
                <>
                    <a href="">删除</a>
                &nbsp; &nbsp;
                    <a href="">编辑</a>
                </>
            )
        }
    ]

    return (
        <div>
            <h1>商品管理模块</h1>

            <div style={{ margin: "20px 0" }}>
                <Table
                    rowKey='_id'
                    columns={columns}
                    dataSource={goods.list}
                    pagination={{
                        total: goods.total,
                        onChange: page => setPage(page),
                        onShowSizeChange: (page, size) => setSize(size),
                        pageSizeOptions: [2, 5, 10, 20]

                    }}
                />
            </div>
        </div>
    )
}