import React from 'react'
import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table

const dataSource = [
  {
    key: '100',
    name: '胡歌',
    age: 32,
    address: '南山区湖底公园1号',
    tags: ['男神']
  },
  {
    key: '200',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    tags: ['男神'],
  },
  {
    key: '300',
    name: '彭于晏',
    age: 25,
    address: '宝安区湖底公园1号',
    tags: ['男神'],
  },
  {
    key: '400',
    name: '周杰伦',
    age: 35,
    address: '福田区湖底公园1号',
    tags: ['男神'],
  },
]
for (let i = 0; i < 36; i++) {
  dataSource.push({
    key: i,
    name: `胡歌 ${i}`,
    age: 32,
    address: `南山区湖底公园 ${i}号`,
    tags: ['男神']
  });
}

export default props=>{
  return(
    <div className = 'zz-happyJian'>
        <h1><b>用户信息表格</b></h1>
        <hr/>
        <Table 
          dataSource={dataSource} 
          bordered="true" 
          scroll={{ x: 1300 }}
          
        >
          <Column title="姓名" dataIndex="name" key="name" />
          <Column title="年龄" dataIndex="age" key="age" />
          <Column title="住址" dataIndex="address" key="address" />
          <Column
            title="标签"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
          <Column
            title="操作"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a>邀请{record.name}</a>
                <a>删除</a>
              </Space>
            )}
          />,
        </Table>
    </div>
  )
}

            