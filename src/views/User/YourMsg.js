
import React from 'react'

// 个人信息设置 
import { Form, Input, InputNumber, Button } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const YourMsg = () => {
  const onFinish = values => {
    console.log(values);
  };

  return (
      <div className='qf-msg'>
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'name']} label="名字" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'age']} label="年龄" rules={[{ type: 'number', min: 0, max: 99 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name={['user', 'website']} label="电话号码">
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'introduction']} label="个人简介">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" href={'#/detail'}>
          提交看轮播图
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default YourMsg