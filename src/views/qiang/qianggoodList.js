import { Table, Button, Row, Col, Input, Select, Modal, Checkbox, Divider, } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import action from "@/store/actions"
import img from "@/utils/img"
import CateSelect from "./component/cateselect"
import moment from "moment"
import { fetchGoodDel } from "@/utils/api"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import api from '../../utils/api';
const { confirm } = Modal;
const { Option } = Select

export default props => {
    const dispatch = useDispatch()
    let [text, setText] = useState('')

    let [keys, setKeys] = useState([])


    let [filter, setFilter] = useState({
        size: 5,
        page: 1,
        text: "",
        hot: ""
    })
    const content = (
        <div>
            <p>Content</p>
            <p>Content</p>
        </div>
    );
    const filterChange = (key, val) => {
        filter[key] = val
        if (key != "page") filter.page = 1
        setFilter(JSON.parse(JSON.stringify(filter)))

    }
    const textChange = val => {
        setText(val)
        if (!val) {
            filter.text = ""
            setFilter(JSON.parse(JSON.stringify(filter)))
        }
    }
    const handDel = val => {
        confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined />,
            content: <div>你确定,真的,<br />一定要删除吗?</div>,
            okText: "确定",
            cancelText: "取消",
            onOk() {


                fetchGoodDel({ id: val._id }).then(() => {
                    setFilter(JSON.parse(JSON.stringify(filter)))
                })
            },
            onCancel() {
            },
        });


    }

    const mulDelete = () => {
        let id = ''
        keys.map(ele => id += (";" + ele))
        api.fetchGoodDel({ id }).then(() => {
            setFilter(JSON.parse(JSON.stringify(filter)))

        })
    }

    const skipDetail = (val) => {
        dispatch(action.clearGoodDetal())
        props.history.push('/qianggood/update/' + (val ? val : "0"))

    }

    useEffect(() => {
        dispatch(action.getQGoodListAction(filter))
        return undefined
    }, [filter])
    const goods = useSelector(store => store.Qgood.QGoodData)
    const cates = useSelector(store => store.Qgood.cates)
    const columns = [
        {
            title: '商品',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (text, row, idx) => {
                return (
                    <div className='gl-good'>
                        <img src={img.imgBase + row.img} style={{ display: "block", width: "80px", margin: "0 auto" }} />
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
            render: text => <div style={{ width: "200px" }}>{text}</div>
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
            title: '商品品类',
            dataIndex: 'cate',
            key: 'cate',
            align: 'center',
            render: cate => {
                const idx = cates.findIndex(ele => ele.cate === cate)
                return <span>{idx > -1 ? cates[idx].cate_zh : ""}</span>
            }
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
                return (
                    <>
                        <div>{moment(text).format("YYYY年MM月DD日")}</div>
                        <div>{moment(text).format("hh:mm:ss")}</div>
                    </>
                )
            }
        },
        {
            title: '操作',
            key: 'tags',
            align: 'center',
            dataIndex: 'tags',
            render: (text, row) => (
                <>
                    <a onClick={() => handDel(row)}>删除</a>
                &nbsp; &nbsp;
                    <a onClick={() => skipDetail(row._id)}>编辑</a>
                </>
            )
        }
    ]

    return (
        <div style={{ minWidth: "1000px" }}>
            <h1>商品管理模块</h1>
            <div style={{ margin: "20px 0" }}>
                <Row align="middle">
                    <Col span={2} >
                        <span style={{ marginLeft: "20px" }} >名称搜索:</span>
                    </Col>
                    <Col span={4}>
                        <Input
                            allowClear
                            placeholder="搜索"
                            value={text}
                            onChange={e => textChange(e.target.value)}
                            onPressEnter={(e) => filterChange('text', e.target.value)}
                        />
                    </Col>
                    <Col span={2} >
                        <span style={{ marginLeft: "20px" }} >品类筛选:</span>
                    </Col>
                    <Col span={4}>
                        <CateSelect
                            hasAll
                            onChange={cate => filterChange("cate", cate)}
                            allowClear
                        />
                    </Col>
                    <Col offset={1} span={2} >
                        <span style={{ marginLeft: "20px" }} >热度筛选:</span>
                    </Col>
                    <Col span={4}>
                        < Select
                            style={{ width: '100px' }}
                            onChange={val => filterChange("hot", val)}
                        >
                            <Option key="1" value="">全部</Option>
                            <Option key="2" value={true}>是</Option>
                            <Option key="3" value={false}>否</Option>
                        </Select>
                    </Col>
                    <Col offset={3} span={2} >
                        <Button onClick={() => skipDetail()}>新增</Button>
                    </Col>
                </Row>
            </div>

            <div style={{ margin: "20px 0" }}>
                <Table
                    rowKey='_id'
                    columns={columns}
                    dataSource={goods.list}
                    pagination={{
                        current: filter.page,
                        defaultPageSize: filter.size,
                        total: goods.total,
                        onChange: page => filterChange("page", page),
                        onShowSizeChange: (page, size) => filterChange("size", size),
                        pageSizeOptions: [2, 5, 10, 20],
                        showSizeChanger: true

                    }}
                    rowSelection={{
                        type: 'checkbox',
                        onChange: keys => setKeys(keys)
                    }}
                    footer={() => <Button type='danger' onClick={() => mulDelete()}>批量删除</Button>}
                />
            </div>
        </div>
    )
}