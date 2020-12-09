import React, { useState,useEffect } from 'react';
import { Table,Pagination} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import action from '@/store/actions'
import api from '@/utils/api'
import moment from 'moment'
import "./style.scss"
import img from "@/utils/img"
export default props=>{

  const dispatch = useDispatch()
  //拿数据，这样还不行，要触发的
  const goodArr=useSelector(store=>store.good.goodArr)
  console.log("看一下数据",goodArr)
  const columns = [
    {
      title: '商品名称',
      key:"name",
      dataIndex: 'name',
      align:"center",
      render: (text,row,idx)=>{
        return(
          <div className="name">
            <img src={img.imgBase+row.img} alt={row.name} className="img" />
            <div>{text}</div>
          </div>
        )
      }
    },
    {
      title: '品类',
      align:"center",
      key:"cate",
      dataIndex: 'cate',
      render:(cate,roe,idx)=>{
        return(
          <div className="cate">
            <span>{cate}</span>
          </div>
        )
      }
    },
    {
      title: '描述',
      align:"center",
      key:"desc",
      dataIndex: 'desc',
      render:(desc,row,idx)=>{
        return(
          <div className="desc">
            <span>{desc}</span>
          </div>
        )
      }
    },
    {
      title: '价格',
      align:"center",
      key:"price",
      dataIndex: 'price',
      render: (price,row,idx)=>{
        return(
          <div className="price">
            <span>{"￥"+price}</span>
          </div>
        )
      }
    },
    //这里对应字段是dataIndex的字段？？hot是个布尔值
    //好像text就是对应显示的文字
    {
      title: '是否热销',
      align:"center",
      key:"hot",
      dataIndex: 'hot',
      render: (hot,row,idx)=>{
        return(
          <div className="hot">
            <span>{hot?"热销":"非热销"}</span>
          </div>
        )
      }
    },
    //这里格式化时间要用到moment第三方库
    {
      title: '上架时间',
      align:"center",
      key:"create_time",
      dataIndex: 'create_time',
      render: (create_time,row,idx)=>{
        return(
          <div className="create_time">
            <span>{moment(create_time).format("YYYY:MM:DD hh:mm:ss")}</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      align:"center",
      key:"do",
      dataIndex: 'dosome',
      render: (dosome,row,idx)=>{
        return(
          <div className="dosome">
           
          </div>
        )
      }
    },
  ];


  let [text, setText] = useState('')
  let [keys, setKeys] = useState([])

  // 便于筛选
  let [filter, setFilter] = useState({
    //一页多少个数据size
    size: 3,
    //第几页
    page: 1,
    //商品名字？？
    text: '',
    //是否热销
    hot: ''
  })
  //当这些值改变的时候自动调用接口
  useEffect(()=>{
    dispatch(action.getGoodList(filter))
    return undefined
  }, [filter])

  //变化的时候要注意的，当变化的不是页数的时候，要将页数置为1
  //然后深复制一下，再进行接口调用
  const filterChange = (key, val) => {
    filter[key] = val
    if(key!=='page') filter.page = 1
    setFilter(JSON.parse(JSON.stringify(filter)))
    console.log('filter', filter)
  }

  //改名字的注意
  //当名称改变的时候，不会重新变化页数，但是会调用接口更新信息
  const textChange = val => {
    console.log('value text', val)
    setText(val)
    if(!val) {
      filter.text = ''
      setFilter(JSON.parse(JSON.stringify(filter)))
    }
  }

  //行是否可选
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }};

    const [selectionType, setSelectionType] = useState('checkbox');

    return (
      <div>
        <Table
          // 勾选状态的
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          rowKey='_id'
          columns={columns}
          dataSource={goodArr.list}
          // pagination="hidden"
        />
         {/* 分页的配置项 */}
         <Pagination
            //总数据条数
            total={goodArr.total}
            // 要加这个字段才会高亮，才能显示对应的页面
            current={filter.page}
            //一个方法，不用在意
            showTotal={total => `Total ${total} items`}
            //一页几条
            defaultPageSize={filter.size}
            //初始的当前第几页
            defaultCurrent={filter.page}
            onChange={page=>filterChange("page",page)}
          />
      </div>
    );
}
