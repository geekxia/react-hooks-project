import React, { useState } from 'react'
import { Form, Row, Col, Input, Button, Select, } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Tabs, Breadcrumb } from 'antd'
import Table from '@/components/common/Table'
const { Option } = Select
export default prosp => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm()
  const [fillters, setFillters] = useState({})
  const inputInit = [
    {name: "商品名称",des: 'name'},
    {name: "品类", des: 'cate'},
    {name: "价格", des: 'price'},
    {name: "描述", des: 'desc'},
    {name: "时间", des: 'create_time'}
  ]
  const getFields = () => {
    const count = expand ? 4 : 2
    const children = []
    for (let i = 0; i < count; i++) {
      // children.push(
      // <Col span={8} key={i}>
      //   <Form.Item
      //     name={`${inputInit[i].name}`}
      //     label={`${inputInit[i].name}`}
      //     rules={[
      //       {
      //         required: true,
      //         message: 'Input something!',
      //       },
      //     ]}
      //   >
      //     <Input size='large' placeholder="placeholder" />
      //   </Form.Item>
      // </Col>
      
      i!==2 ? children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${inputInit[i].des}`}
            label={`${inputInit[i].name}`}
          >
            <Input size='large' placeholder="placeholder" />
          </Form.Item>
        </Col>
      )
      : children.push(
        <Col span={8} key={i}>
          <Form.Item
              name='hot'
              label='是否热销'
            >
              <Select style={{width: '200px'}}>
                <Option value=''>全部</Option>
                <Option value='true'>是</Option>
                <Option value='false'>否</Option>
              </Select>
          </Form.Item>
        </Col>
      )
    }
    return children;
  }
  const onFinish = values => {
    if (!values.cate) values.cate = ''
    setFillters(values)
    
  }
  return (
    <div className='searchTab'>
      <div className='searchTab-header'>
        <h3>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>searchTab</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        </h3>
        <h1 style={{ fontWeight:600, fontSize: 26 }}>查询表格</h1>
      </div>
      <div className='searchTab-main'>
        <div className='searchTab-main-search'>
          <Form
          form={form}
          name="advanced_search"
          className="ant-advanced-search-form"
          onFinish={onFinish}
          style={{backgroundColor: 'white'}}
          >
            <Row key='1' gutter={24}>{getFields()}</Row>
            <Row key='2' className={!expand && 'row2'}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  size='large'
                  style={{ margin: '0 8px' }}
                  onClick={() => {
                    console.log(1)
                    form.resetFields();
                  }}
                >
                  Clear
                </Button>
                <Button size='large' type="primary" htmlType="submit">
                  Search
                </Button>
                <a
                  style={{ fontSize: 12,marginRight: 10 }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                </a>
              </Col>
            </Row>
          </Form>
        </div>
        <div className='searchTab-main-table'>
            <Table fillters={ fillters }/>
        </div>
      </div>
    </div>
  )
}