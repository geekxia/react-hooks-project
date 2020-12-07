import React, { useState } from 'react'
import { Form, Row, Col, Input, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Tabs, Breadcrumb } from 'antd'
import Table from '@/components/common/Table'
export default prosp => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm()
  const inputInit = [
    {name: "规则名称"},
    {name: "描述"},
    {name: "服务调用次数"},
    {name: "状态"},
    {name: "上次调度时间"}
  ]
  const getFields = () => {
    const count = expand ? 5 : 2
    const children = []
    for (let i = 0; i < count; i++) {

      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${inputInit[i].name}`}
            label={`${inputInit[i].name}`}
            rules={[
              {
                required: true,
                message: 'Input something!',
              },
            ]}
          >
            <Input size='large' placeholder="placeholder" />
          </Form.Item>
        </Col>
      )
    }
    return children;
  }
  const onFinish = values => {
    console.log('Received values of form: ', values);
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
            <Row gutter={24}>{getFields()}</Row>
            <Row className={!expand && 'row2'}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  size='large'
                  style={{ margin: '0 8px' }}
                  onClick={() => {
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
          <Table/>
        </div>
      </div>
    </div>
  )
}