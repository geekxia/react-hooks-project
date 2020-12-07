import { 
     Table,
     Tag, 
     Space,
     Button,
     Tooltip,
    } from 'antd';
import {
    PlusOutlined
    } from '@ant-design/icons'
    
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
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


const InfoList =(props)=>{
    return(
        <div className='llf-good-list'>
            <h1>李兰菲的商品列表</h1>
            <Tooltip title="AddOrEdit">
              <Button 
               type="primary" 
               shape="circle" 
               icon={<PlusOutlined />} 
               href="http://localhost:9000/#/llfAddOrEdit" 
               style={{paddingTop:'8px'}}
               />
            </Tooltip>
            <div style={{margin:'25px 0'}}>
              <Table columns={columns} dataSource={data} />
            </div>
           
        </div>
    )
}
export default InfoList