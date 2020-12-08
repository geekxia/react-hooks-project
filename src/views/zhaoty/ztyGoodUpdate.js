

import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip, 
  Select,
  Button,
  AutoComplete,
  InputNumber,
  Upload,
  Switch
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import myImg from '@/utils/zhaoty/img'
import {goodUpdate} from '@/utils/zhaoty/api'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

console.log('myImg',myImg)
export default props => {
  const [form] = Form.useForm();
  const [imageUrl,setImageUrl]=useState('')
  const onFinish = values => {
    values.img  = imageUrl
    console.log('Received values of form: ', values);
    goodUpdate(values).then(
      props.history.replace('/zhao/good/list')
    )

  };
  const { loading } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const imgSuccess=(e)=>{
      if(e.file && e.file.response && e.file.response.data){
          setImageUrl(e.file.response.data.url)
      }
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="商品名称"
        rules={[ 
            { required: true,message: '商品名称是必填的'},
            {max:10 , message:'不得超过10字符'},
            {min: 2 , message:'不得少于2字符'}
        ]}
      >
        <Input placeholder='输入商品名称'/>
      </Form.Item>
      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          { required: true,message: '商品描述是必填的'},
          {max:30 , message:'不得超过30字符'},
          {min: 6 , message:'不得少于6字符'}
        ]}
      >
        <TextArea rows={4} placeholder='输入商品描述' />
      </Form.Item>
      <Form.Item 
        name='price'
        label='商品价格'
      >
      <InputNumber min={0}  />
      </Form.Item>

      <Form.Item 
        name='cate'
        label='选择品类'
      >
        <Select
            style={{ width: 200 }}
            placeholder="选择品类"
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>
      <Form.Item
       label='商品图片'
      >
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={myImg.uploadUrl}
        onChange={imgSuccess}
      >
        {imageUrl ? <img src={myImg.baseUrl+imageUrl} 
        alt="avatar" 
        style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      </Form.Item>
      <Form.Item
        name='hot'
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
  );
};

















// export default props=>{
//     return (
//         <div>
//             <h1>这是商品更新页</h1>
//         </div>
//     )
// }