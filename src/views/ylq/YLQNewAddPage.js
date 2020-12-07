import React from 'react'
import { 
        Form, 
        Input, 
        Button ,
        Select,
        Upload,
        Switch
    } 
from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default props =>{
 
    class Avatar extends React.Component {
        state = {
        loading: false,
        };    
        render() {
        const { loading, imageUrl } = this.state;
        const uploadButton = (
            <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={this.handleChange}
            >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
        }
    }

    
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10},
      };     
    
    const { Option } = Select;

    const Demo = () => {
        const onFinish = values => {
            console.log(values);
        };
        return (
            <Form {...layout} name="nest-messages" onFinish={onFinish}>
                {/* 商品名称 */}
                <Form.Item 
                    name='name'
                    label="商品名称"
                    rules={[
                        { required: true ,message:'商品名称是必填!'},
                        {min:2,message:'商品名称不能少于2个字!'},
                        {max:10,message:'商品名称不能多于10字!'},
                    ]}

                >
                    <Input />
                </Form.Item>
                
                 {/* 商品描述 */}
                <Form.Item 
                    name='desc'
                    label="商品描述"
                    rules={[
                        { required: true ,message:'商品描述是必填!'},
                        {min:2,message:'商品描述不能少于2个字!'},
                    
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                {/* 商品价格 */}
                <Form.Item 
                    name='price'
                    label="商品价格" 
                    rules={[
                        { required: true ,message:'商品价格是必填!'},                   
                    ]}
                >
                    <Input style={{width:'200px'}} />
                </Form.Item>
                {/* 品类选择*/}
                <Form.Item
                    name="cate"
                    label="品类选择"
                    rules={[
                        { required: true, message: '商品描述是必填!' }
                    ]}
                >
                     <Select style={{ width: 200 }} >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" >
                            Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                </Form.Item>
                {/* 上传图片 */}
                <Form.Item name='img' label="图片上传" >
                    <Avatar />
                </Form.Item>
                {/* 是否热销 */}
                <Form.Item
                    name='hot'
                    label='是否热销'
                    valuePropName='checked'
                    >
                    <Switch />
                </Form.Item>             
                {/* 提交按钮 */}
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset:4 }}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
                </Form.Item>
            </Form>
        );
    };
    return(
        <div>
            <h1>ylq 新增页面</h1>
            <div>
                <Demo />
            </div>
        </div>
    )
}