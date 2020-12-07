import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload, 
  message
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    }
  }
}
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

let [loading,setLoading] = useState(false)
let [imgUrl,setImageUrl] = useState()

const uploadButton = (
    <div>
    {loading ? <LoadingOutlined /> : <PlusOutlined />}
    <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)

function onChange(value) {
  console.log(`selected ${value}`);
}

const RegistrationForm = () => {
    //获取Form的实例
  const [form] = Form.useForm();

  // 表单提交的信息
  const onFinish = values => {
    console.log('Received values of form: ', values);
  }


  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="商品名称"
        rules={[
          { required: true,message: '请输入商品名称!' },
          { max:10,message:'商品名称不能超过10个字符' },
          { min:2,message:'商品名称不能少于2个字符' }  
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          { required: true,message: '请输入商品描述!' },
          { max:30,message:'商品名称不能超过30个字符' },
          { min:10,message:'商品名称不能少于10个字符' }  
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="cate"
        label="选择品类"
        rules={[
          { required: true,message: '请选择商品品类!' }
        ]}
      >
        <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择一个品类"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>,
      </Form.Item>

      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          { required: true,message: '请输入商品描述!' },
          { max:30,message:'商品名称不能超过30个字符' },
          { min:10,message:'商品名称不能少于10个字符' }  
        ]}
      >
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
        >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  )
}
export default props =>{
   
    return(
        <div>
            <div>
                <h1>商品新增</h1>
                <span>字段</span>
            </div>
            <div>
               {<RegistrationForm />}
            </div>
        </div>
    )
  
}