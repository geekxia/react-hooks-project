import React,{ useState } from 'react'

import { 
    Form, 
    Input, 
    Button, 
    Select,
    InputNumber,
    Switch,
    Upload,
    message
} from 'antd';

import { 
    LoadingOutlined, 
    PlusOutlined 
} from '@ant-design/icons';

import img from "@/utils/img"

import {fetchGoodAddOrEdit} from "@/utils/api"

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

export default props=>{
    const onFinish = values => {
        values.img=imageUrl
        fetchGoodAddOrEdit(values).then((res)=>{
            props.history.replace('/panxi/good/list')
        })
    };
    let [imageUrl,setImageUrl] = useState('')
    let [loading,setLoading] = useState(false)

    const uploadButton =()=> (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    
    const handleChange = info => {
        console.log(info);
        if(info.file&&info.file.response&&info.file.response.data){
            setImageUrl(info.file.response.data.url)
        }
    };

    return (
        <div className='px-goodAddOrEdit'>
            <h1>潘曦-商品新增</h1>
            <hr/>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品名称!' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品描述!' 
                    }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品描述!' 
                    }]}
                >
                    <InputNumber 
                        min={5} 
                    />
                </Form.Item>

                <Form.Item
                    label="商品类型"
                    name="cate"
                    rules={[{ 
                        required: true, 
                        message: '请选择商品类型!' 
                    }]}
                >
                    <Select 
                        // defaultValue="lucy" 
                        allowClear
                    >
                        <Option value="lucy">Lucy</Option>
                        <Option value="jack">Jack</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="是否热销"
                    name="hot"
                    valuePropName='checked'
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="商品图片"
                    name="img"
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={img.uploadUrl}
                        onChange={handleChange}
                        fileList={imageUrl}
                    >
                        {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton()}
                    </Upload>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}