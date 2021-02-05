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
  Upload,
  Switch,
  InputNumber
} from 'antd';

import{
    QfUploadIcon
} from '@/components'

import img from '@/utils/img'
import { fetchGoodAdd } from '@/utils/api'
import { QuestionCircleOutlined } from '@ant-design/icons';

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

export default props => {
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    let [imageUrl, setImageUrl] = useState('')
  
    // 获取Form的实例
    const [form] = Form.useForm()
  
    // 图片上传成功
    const imgSuccess = e => {
      console.log('图片上传成功', e)
      if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
        setImageUrl(e.fileList[0].response.data.url)
      }
    }
  
    // 表单提交
    const onFinish = values => {
      values.img = imageUrl
      console.log('values 提交接口', values)
      fetchGoodAdd(values).then(()=>{
        // 跳转到列表页
        props.history.replace('/good/list')
      })
    }

  

  return (

<div> 
    <h1>商品新增</h1>     
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
          {
           required: true,
            message: '商品名称必填',
          },
          {
           max: 10,message:'商品名称不超过10个字'
          },
          {
            min: 2, message: '商品名称不能少于两个字'
          }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          {
            required: true,
            message: '商品描述必填',
          },
          {
              max: 30 , message: '商品描述不能超过10个字'
          },
          {
              min: 5, message: '商品描述不能少于5个字'
          }
        ]}

      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="price"
        label="商品价格"
        rules={[
          {
            required: true,
            message: '商品价格必填',
          },
        ]}
      >
   <InputNumber min={0} />
      </Form.Item>

      <Form.Item
          name="cate"
          label="选择品类"
          rules={[
            { required: true, message: '商品描述是必填!' }
          ]}
        >
          <Select
            style={{ width: 200 }}
            placeholder="选择一个品类"
          >
            <Option key='1' value="jack">Jack</Option>
            <Option key='2' value="lucy">Lucy</Option>
            <Option key='3' value="tom">Tom</Option>
          </Select>
        </Form.Item>

      <Form.Item
       
        label="商品图片"
        rules={[
          {  required: true, message: '商品图片是必填' },
        ]}
      >

       <Upload
          name="file"
          action={img.uploadUrl}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          onChange={imgSuccess}
       >
           {
               imageUrl ? 
               <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
               : <QfUploadIcon />
           }

       </Upload>
  
      </Form.Item>

      <Form.Item
        name="hot"
        label="是否热销"
        valuePropName="checked"
        >
            <Switch />

      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
</div>
  );
};