import React from 'react'
import {
  Form, 
  Input, 
  InputNumber, 
  Row, 
  Col ,
  Button,
  Switch,
  DatePicker,
  Upload,
  Rate
} from 'antd'
import {
  UploadOutlined
}from '@ant-design/icons'
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 8,
  },
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

export default props =>{
  const onFinish = (values) => {
    console.log(values);
  };
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return(
    <div className='zz-happyYue'>
      <h1><b>个人资料</b></h1>
      <h3>用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</h3>
      <br/><hr/>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="姓名"
          hasFeedback
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="给目标起个名字"/>
        </Form.Item>
        <Form.Item 
          name={['user', 'phone']} 
          label="联系电话"
          hasFeedback
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Input placeholder="给ta留个电话"/>
        </Form.Item>
        <Form.Item
          name={['user', 'email']}
          label="邮箱"
          hasFeedback
          rules={[
            {
              type: 'email',
              required: true,
            },
          ]}
        >
          <Input placeholder="传个信也不错"/>
        </Form.Item>
        <Form.Item name={['user', 'datebirth']} label="出生日期">
          <DatePicker />
        </Form.Item>
        <Form.Item name={['user', 'website']} label="家庭地址">
          <Input placeholder="上楼喝杯咖啡？"/>
        </Form.Item>
        <Form.Item name={['user', 'introduction']} label="个人介绍">
          <Input.TextArea placeholder="你好，认识一下！"/>
        </Form.Item>
        <Form.Item
          name="upload"
          label="上传照片"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo"  listType="picture">
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="是否公开">
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" size="middle">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}