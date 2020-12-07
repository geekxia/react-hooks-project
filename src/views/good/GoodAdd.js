import React, { useState } from 'react';
import UploadButton from '@/components/uploadButton'
import img from '@/utils/img'
import api from '@/utils/api'
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
  Upload,
  message,
  Switch
} from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;



const formItemLayout = {
  labelCol: {
    sm: { span: 3 },
  },
  wrapperCol: {
    sm: { span: 9 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

export default props=>{
        let [loading,setLoading] = useState(false)
        let [imageUrl,setImageUrl] = useState('')
        const [form] = Form.useForm();
      
        const onFinish = values => {
            values.img = imageUrl
        //   console.log('Received values of form: ', values);
          api.fetchAddGood(values).then(res=>{
            props.history.replace('/good/list')
          })
        };

        const uploadChange = (e)=>{
            // console.log(e)
            if(e.fileList[0].response && e.fileList[0].response.data){
                setImageUrl(e.fileList[0].response.data.url)
            }
        }


    return (
        <div>
            <h1>添加商品</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="good"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[
                    { required: true, message: '请输入商品名称' },
                    { min:2, message:'商品名称不能少于两个字！' },
                    { max:10, message:'商品名称不能超过10个字' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cate"
                    label='商品类别'
                    rules={[
                        { required:true, message:'请选择商品类别！'}
                    ]}
                >
                    <Select
                        style={{ width: 200 }}
                        placeholder="选择一个品类"
                        optionFilterProp="children"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name='price'
                    label='商品价格'
                    rules={[
                        { required:true, message:'请输入商品价格！' }
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label='商品描述'
                    rules={[
                        { required:true, message:'请输入商品描述！'},
                        { min:10, message:'商品名称不能少于10个字！' },
                        { max:30, message:'商品名称不能超过30个字' }
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label='商品图片'
                    rules={[
                        { required:true}
                    ]}
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={img.imgUploadUrl}
                        onChange = {uploadChange}
                    >
                        {
                            imageUrl ? 
                            <img src={img.imgBaseUrl+imageUrl} alt="avatar" style={{ width: '100%' }} />
                            : <UploadButton loading={loading}/>
                         }
                    </Upload>
                </Form.Item>

                <Form.Item
                    name='hot'
                    label='是否热销'
                    valuePropName='checked'
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
    )
}