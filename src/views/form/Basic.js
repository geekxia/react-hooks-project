import React from 'react'
import { 
  Form, 
  Input,
  Button,
  DatePicker
} from 'antd'

export default props => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  }
  const onFinish = values => {
    console.log('Success:', values);
  }
  const { RangePicker } = DatePicker
  return (
    <div>
      <h1>基础表单</h1>
      <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: false, message: '请输入标题！' }]}
        >
          <Input placeholder="请输入标题！"/>
        </Form.Item>

        <Form.Item label="起止日期">
          <RangePicker placeholder={["起止","结束"]}/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}