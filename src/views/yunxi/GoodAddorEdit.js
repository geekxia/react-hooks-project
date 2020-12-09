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

import {
    QfUploadIcon
} from '@/components'

import img from '@/utils/img'
import { fetchGoodOrEdit } from '@/utils/api'
import CateSelect from './components/CoogSelect'

import { QuestionCircleOutlined } from '@ant-design/icons';
import FormItem from 'antd/lib/form/FormItem';
const { Option } = Select;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {  //框的
    labelCol: { //左边
        sm: {
          span:6,
        },
    },
    wrapperCol: {  //右边
        sm: {
          span: 12,
        },
    },
};
    const tailFormItemLayout = {  //按钮
    wrapperCol: {
        sm: {
            span: 16,
            offset: 6, //像右偏移
        },
    },
};

export default props=>{
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    let [imageUrl,setImageUrl] = useState('');

    const [form] = Form.useForm();  // 获取Form实例
    // 图片上传成功
    const imgSuccess = e =>{
        console.log('图片上传成功', e);
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    const onFinish = values => {  //表单提交
        values.img=imageUrl
        console.log('values 提交接口', values);
        // 图片发送的接口 ， 不需要走redux
        fetchGoodOrEdit(values).then(()=>{
            // 跳的列表列
            props.history.replace('/list')
        })
    }
    return(
        <div>
            <h1>商品新增</h1>
            <hr />
            <Form
                style={{margin:'30px 0'}}
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
                       { required: true, message: '商品名称必填!'},
                       { max:10, message:'商品名称不能超过10个字！'},
                       { min:2, message:'商品名称不能少于2个字！'},
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                       { required: true, message: '商品描述必填!'},
                       { max:30, message:'商品描述不能超过10个字！'},
                       { min:10, message:'商品描述不能少于2个字！'},
                    ]}
                >
                 <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[
                       { required: true, message: '商品价格必填!'},
                    ]}
                >
                 <InputNumber min={0}/>
                </Form.Item>

                <Form.Item
                    name="cate"
                    label="选择品类"
                    rules={[
                       { required: true, message: '商品描述必填!'},
                    ]}
                >
                    <CateSelect />
                </Form.Item>
                    
                <Form.Item
                    name='imgArr'
                    label='商品图片'
                    rules={[ 
                        { required: true, message: '商品图片必填!'},
                     ]}
                >
                    <Upload
                        name="file"    // 这个是给后端取值的key
                        action={img.uploadUrl}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                    >
                        {
                            imageUrl ? 
                            <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                            : <QfUploadIcon />
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