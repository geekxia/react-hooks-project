import {useState} from 'react';
import img from '@/utils/img';
import api from '@/utils/api';
import { 
  Form, 
  Input, 
  InputNumber, 
  Button,Select,
  Switch,
  Upload, 
  message
} from 'antd';
import { 
  LoadingOutlined, 
  PlusOutlined 
} from '@ant-design/icons';
import { configConsumerProps } from 'antd/lib/config-provider';

const { Option } = Select;

const layout = {
  labelCol: {
    sm:{
      span: 4,
    }
  },
  wrapperCol: {
    sm:{
      span: 10,
    }
  },
};

const validateMessages = {
  required: '${label}是必填',
};

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default props=>{
  const [imageUrl,setImageUrl] = useState('')
  const [loading,setLoading] = useState('')
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  //图片上传成功
  const imgSuccess = e=>{
    console.log('图片上传成功', e);
    if(e && e.fileList && e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }
  // 表单提交
  const onFinish = (values) => {
    values.imgUrl = imageUrl; 
    console.log('values 提交接口',values);
    api.fetchGoodOrEdit(values).then((res)=>{
      // 跳转到列表页
      console.log('add表单提交',res,props);
      props.history.replace('/good/list')
    })
  };
  // 获取Form的实例
  const [form] = Form.useForm()

  return(
    <div className='al-good-add'>
      <h1>商品新增</h1>
      <Form 
        {...layout} 
        form = {form}
        name="nest-messages" 
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item
          name='name'
          label="商品名称"
          rules={[
            {required: true,},
            {max:10,message:'商品名称不能超过10个字'},
            { min: 2, message: '商品名称不能少于两个字' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='商品图片'
          rules={[
            {required:true}
          ]}
        >
          <Upload
            action={img.uploadUrl}
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={imgSuccess}
          >
            {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item 
          name='desc' 
          label="商品描述"
          rules={[
            {required: true},
            {max:100,message:'商品描述不能超过100个字'},
            { min: 10, message: '商品描述不能少于10个字' }
          ]}
        >
          <Input.TextArea rows={4}/>
        </Form.Item>

        <Form.Item
          name='price'
          label="价格"
          rules={[
            {
              required:true
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item
          name='cate'
          label='选择品类'
          rules={[
            {required:true}
          ]}
        >
          <Select placeholder="选择一个品类" style={{ width: 200 }}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name='hot'
          label="是否热销"
          valuePropName='checked'
        >
          <Switch/>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
    </Form>
    </div>
  )
}