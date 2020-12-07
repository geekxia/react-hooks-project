import { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Upload, message,
  Switch 
} from 'antd';

import { QuestionCircleOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
   
    sm: { span: 4 },
  },
  wrapperCol: {
   
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

function onChange(value) {
  // console.log('changed', value);
}


export default props=>{
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  //获取from的实例
  const [form] = Form.useForm();

  //表单的提交
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };


  return(
    <div>
      <h1>
       商品新增
      </h1>
      <Form
      style={{margin:'25px 0'}}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
        name="name"
        label="商品名称"
        rules={[
          { required: true,message:'商品名称必填！'},
          {max:10,message:'商品名称不能超过10个字'},
          {min:2,message:'商品名称不能少于两个字'}
        ]}
      >
       <Input/>
      </Form.Item>

      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          { required: true,message:'商品描述必填！'},
          {max:20,message:'商品描述不能超过20个字'},
          {min:10,message:'商品名称不能少于10个字'}
        ]}
      >
       <TextArea rows={4}/>
      </Form.Item>

      <Form.Item
        name="cate"
        label="选择品类"
        rules={[
          {required:true,message:'商品品类是必填！'}
        ]}
      >

        <Select  style={{ width: 120 }} allowClear>
         <Option value="lucy">Lucy</Option>
         <Option value="jack">jack</Option>
         <Option value="lily">lily</Option>
        </Select>
      </Form.Item>

      <Form.Item
      name="price"
      label="商品价格">
        <InputNumber min={0}   onChange={onChange} />
         
      </Form.Item>

      <Form.Item
       
      >

      </Form.Item>
      
      <Form.Item
       name="hot" 
       label='是否热销'
       valuePropName='checked'
      >
        <Switch  />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>  
      </Form> 
    </div>
   
  )
}