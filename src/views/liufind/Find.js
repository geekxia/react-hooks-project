import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'

const layout = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset:5,
    span: 16,
  },
};

const onFinish = (values) => {
  console.log("表单值",values);
};

const Find =()=>{
  
  return (
    <div>
      <h1>测试find</h1>
      <Form {...layout}  onFinish={onFinish}>
        <Form.Item
          label="商品名称"
          name="商品名称"
          rules={[
          {
              required: true,
              message: 'Please input your storename!',
          },
          ]}
        >
          <Input />   
        </Form.Item>  
        <Form.Item {...tailLayout}>
          <Button  type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Find