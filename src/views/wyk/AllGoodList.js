import { Table, Tag, Space } from 'antd';
import {useDispatch, useSelector} from 'react-redux'

export default props =>{
  const dispatch = useDispatch
  const goodData = useSelector(store=>store.good.goodData)


    const columns = [
        {
          title: '商品',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
          align:'center'
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
          key: 'desc',
          align:'center'
        },
        {
          title: '价格',
          dataIndex: 'price',
          key: 'price',
          align:'center'
        },
        {
            title: '是否热销',
            dataIndex: 'hot',
            key: 'hot',
            align:'center'
        },
        {
            title: '上架时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align:'center'
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            align:'center',
            render:()=>{
                <>
                <a href=''>编辑</a>
                <a href=''>删除</a>
                </>
            }
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];

    return (
        <div>
            <h1>商品列表页面</h1>
            <Table 
              style={{margin:'25px 0'}}
              columns={columns} 
              dataSource={data} 
            />
        </div>
    )
}