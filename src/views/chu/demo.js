import { Table, Tag, Space } from 'antd'

export default props => {

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
      render: text=> <div>{text+'00'}</div>
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
  ]

  const data = [
    {
      key: '1',
      name: 'Li Xin',
      age: 2,
      address: 'Nasdasdasdawdwdawd',
      tags: ['shhh'],
    }  
  ]

  return (
    <div className='list' style={{background:'blue'}}>
      <div>
        <h1>李鑫列表假的</h1>
      </div>
      <div style={{margin: '50px 0',background:'green'}}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}
