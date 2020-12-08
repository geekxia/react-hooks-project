import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Upload, 
  message,
  InputNumber,
  Switch
} from 'antd';

import{
    UploadIcon
} from '@/components'

import CateSelect from './components/CateSelect'
import img from '@/utils/img'
import { fetchShopOrEdit } from '@/utils/api'

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

export default props =>{
    let [imageUrl,setImageUrl] = useState('')
        //获取Form的实例
    const [form] = Form.useForm();

    // 表单提交的信息
    const onFinish = values => {
        values.img = imageUrl
        console.log('Received values of form: ', values)
        fetchShopOrEdit(values).then(()=>{
            //跳转到列表页
            props.history.replace('/shop/list')
        })
    }

    const imgSuccess = e =>{
        console.log('图片上传成功',e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

    return( 
        <div>
            <div>
                <h1>商品新增</h1>
                <span>字段</span>
            </div>
            <div>
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
                            { required: true, message: '请输入商品描述!' }
                        ]}
                        >
                        {/* 凡是被Form.Item包裹的表单组件，相当于都给表单传递了一个onChange事件 */}
                         <CateSelect />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            { required: true, message: '请输入商品价格!',}
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="商品图片"
                        rules={[
                        { required: true,message: '请上传图片!' }
                        ]}
                    >
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={img.uploadUrl}
                            onChange={imgSuccess}
                        >
                            {
                                imageUrl ? 
                                <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                                : <UploadIcon />
                            }
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name="hot"
                        label="热销产品"
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
        </div>
    )
  
}