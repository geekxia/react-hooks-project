import React from 'react'
import { Form, 
        Input, 
        InputNumber, 
        Button ,
        Select
  } from 'antd';




const layout = {

  labelCol: {
    span: 4,offset: 2
  },
  wrapperCol: {
    span:12,offset: 2
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

const { Option } = Select;


export default props=>{

  const onFinish = (values) => {
    console.log(values);
  };
  return(
    <div>
      <h1>个人信息</h1>
      <hr/>
      <h3>基本设置</h3>

      <Form 
      {...layout}
      layout="vertical"
      name="nest-messages" 
      onFinish={onFinish} 
      validateMessages={validateMessages}>
    
      <Form.Item
        name={['user', 'email']}
        label="邮箱"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['user', 'name']}
        label="昵称"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={['user', 'introduction']} label="个人简介">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={['user', 'country']} label="国家/地区">
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue='中国'
        >
          <Option value="中国">中国</Option>
          <Option value="美国">美国</Option>
          <Option value="日本">日本</Option>
        </Select>
      </Form.Item>

      <Form.Item name={['user', 'city']} label="所在省市">
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue='浙江省'
        >
          <Option value="浙江省">浙江省</Option>
          <Option value="江西省">江西省</Option>
          <Option value="广东省">广东省</Option>
        </Select>
        <Select
          showSearch
          style={{ width: 200 }}
          defaultValue='杭州市'
        >
          <Option value="杭州市">杭州市</Option>
          <Option value="赣州市">赣州市</Option>
          <Option value="深圳市">深圳市</Option>
        </Select>
      </Form.Item>

      <Form.Item name={['user', 'address']} label="街道地址">
        <Input value='西湖区工专路 77 号' />
      </Form.Item>

      <Form.Item name={['user', 'phone']} label="联系电话">
        <Input value='0752'  style={{ width: 100}}/>
        <Input value='123456'  style={{ width: 200 }}/>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}