import React, { useState } from 'react'

import {
    Form,
    Input,
    Select,
    Button,
    AutoComplete,
    InputNumber,
    Upload, 
    Switch
} from 'antd';

import {fetchGoodOrEdit} from '@/utils/api'

import {
    QfUploadIcon
} from '@/components'

import img from '@/utils/img'

const { TextArea } = Input
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
    labelCol: {
        sm: { span: 4 },
    },
    wrapperCol: {
        sm: { span: 12 },
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

export default props =>{
    const residences = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ];

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    let [imageUrl,setImageUrl] = useState('')

    const [form] = Form.useForm()

    // 表单提交
    const onFinish = values =>{
        // console.log('values',values)
        fetchGoodOrEdit(values).then(()=>{
            console.log('添加成功',values)
            // 跳转到列表页
            // props.history.replace('/wyk/AllGoodList')
        })
    }

    // 图片上传
    const imgSuccess = e=>{
        console.log('图片上传成功',e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    return (
        <div>
            <h1>新增表单</h1>
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
                    {required: true,message: '请输入商品名称！'},
                    {min:2,message:'商品名称不能少于两个字'},
                    {max:10,message:'商品名称不能超过十个字'}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                    {required: true,message: '请输入商品描述！'},
                    {min:10,message:'商品描述不能少于十个字'},
                    {max:30,message:'商品名称不能超过三十个字'}
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[
                    {required: true,message: '请输入商品价格！'}
                    ]}
                >
                    <InputNumber min={0}/>
                </Form.Item>

                <Form.Item
                    name="cate"
                    label="商品品类"
                    rules={[
                    // {required: true,message: '请输入选择商品品类！'},
                    ]}
                >
                    <Select
                        style={{ width: 200 }}
                        placeholder="请选择商品品类"
                    >
                        <Option key='1' value="jack">Jack</Option>
                        <Option key='2' value="lucy">Lucy</Option>
                        <Option key='3' value="tom">Tom</Option>
                    </Select>,
                </Form.Item>

                <Form.Item
                    label="商品图片"
                    rules={[
                    {required: true,message: '请上传商品图片！'}
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
                        {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <QfUploadIcon/>}
                    </Upload>
                </Form.Item>
                
                <Form.Item
                    name="hot"
                    value='是否热销'
                    valuePropName='checked'
                >
                    <Switch />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    提交商品
                    </Button>
                </Form.Item>
                </Form>
        </div>
    )
}