import {
    Form,
    Select,
    InputNumber,
    Switch,
    Input,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
} from 'antd';

import { useState } from 'react'

import { TtUploadIcon } from '@/components'

import { fetchGoodOrEdit } from '@/utils/api'

import img from '@/utils/img';

export default props=>{

    const { Option } = Select;
    const { TextArea } = Input;

    const [imageUrl, setImageUrl] = useState('')


    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 6 },
    };  

    const onFinish = values => {
        values.img = imageUrl
        console.log('提交成功 ', values);
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/ttgood')
        })
    };

    const imgSuccess = e => {
        console.log('图片上传成功', e);
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    
    return (
        <div>
            <h1>商品新增</h1>
            <Form
                name="validate_other"
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    ['input-number']: 3
                }}
            >
                <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[
                        { required: true, message: '商品名称是必填'},
                        { max: 20, message: '商品名称不能超过20个字'},
                        { min: 2, message: '商品名称不能少于两个字'}
                    ]}    
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                        { required: true, message: '商品描述是必填'},
                        { max: 50, message: '商品名称不能超过50个字'},
                        { min: 2, message: '商品名称不能少于两个字'}
                    ]}    
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item 
                    label="商品价格" 
                    name="price" 
                    rules={[
                        { required: true, message: '商品价格是必填'}
                    ]}
                >
                    <InputNumber min={0} />
                    {/* <span className="ant-form-text"> 元</span> */}
                </Form.Item>

                <Form.Item 
                    label="商品数量" 
                    name="input-number"
                    rules={[
                        { required: true, message: '商品价格是必填'}
                    ]}
                >
                    <InputNumber min={1} max={100000} />
                    {/* <span className="ant-form-text">件</span> */}
                </Form.Item>

                <Form.Item
                    name="cate"
                    label="选择品类"
                    rules={[{ required: true, message: '商品描述是必填!' }]}
                >
                    <Select placeholder="选择一个品类">
                        <Option value="服装用品">服装用品</Option>
                        <Option value="数码用品">数码用品</Option>
                        <Option value="美妆用品">美妆用品</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="hot" label="是否热销" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item 
                    label="商品图片"
                    rules={[
                        {required: true, message: '商品图片是必填!'}
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
                            : <TtUploadIcon />
                        }
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    )
}