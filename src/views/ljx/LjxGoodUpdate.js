import React, { useState } from 'react';

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
    Switch
} from 'antd';


// import CateSelect from './components/CateSelect'
// import GoodUpload from './components/GoodUpload'
import { LjxUploadIcon } from '@/components'
import img from '@/utils/img'
import { fetchGoodOrEdit } from '@/utils/api'
import { QuestionCircleOutlined } from '@ant-design/icons';


const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;


const formItemLayout = {
    labelCol: {
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        sm: {
            span: 16,
        },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        sm: {
            span: 16,
            offset: 4,
        },
    },
}

export default props => {
    const [form] = Form.useForm();
    // 表单提交
    const onFinish = values => {
        values.img = imageUrl
        console.log('values', values)
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/ljxgood')
        })
    };
        
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    let [imageUrl,setImageUrl] = useState('')
    // 图片上传成功
    const imgSuccess = e => {
        console.log('图片上传成功',e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    return(
        <div>
            <h1>商品新增</h1>
            <div>
                <Form
                    style={{margin:'50px 0'}} 
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
                            { required: true,message: '老铁别忘了商品名称!'},
                            { max:10, message:'名字简单点好吗？'},
                            { min:2, message:'就一个字你是真扣啊'}
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            { required: true,message: '老铁别忘了商品描述!'},
                            { max:30, message:'话这么多干嘛劝你30个字以内'},
                            { min:10, message:'少于10个字描述个锤子'}
                        ]}
                    >
                        <TextArea row={6} />
                    </Form.Item>


                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            { required: true,message: '老铁别忘了商品价格!'},
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>


                    <Form.Item
                        name='img'
                        label='商品图片'
                        rules={[
                            // { required: true, message: '爆照爆照!' }
                        ]}
                        >
                        <Upload
                            name="file"
                            action={ img.uploadUrl }
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={imgSuccess}
                            fileList={[]}
                        >
                            {
                            imageUrl ?
                            <img
                                src={img.imgBase+imageUrl}
                                alt="good"
                                style={{ width: '100%' }}
                            />
                            : <LjxUploadIcon />
                            }
                        </Upload>
                    </Form.Item>


                    <Form.Item
                        name="cate"
                        label="选择品类"
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
        </div>
    )
}