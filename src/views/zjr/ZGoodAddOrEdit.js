import { Form, Input, Button, Select, Switch, Upload } from 'antd';
// import { ZUploadIcon } from '@/components'
import {
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { useState } from 'react';
const { Option } = Select;
const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
// 品类选择
const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];
const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
};

const onFinish = values => {
    values.img = imageUrl
    console.log('values 提交接口', values)
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

export default props => {
    // const { loading, imageUrl } = this.state;
    let [imageUrl, setImageUrl] = useState('')
    let { loading } = props
    // 获取Form的实例
    const [form] = Form.useForm()
    // 图片上传成功
    const imgSuccess = e => {
        console.log('图片上传成功', e)
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    const ZUploadIcon = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>)
    return (
        <div>
            <h1>商品添加和编辑测试</h1>
            <Form
                form={form}
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label="商品名"
                    name="goodname"
                    rules={[{ required: true, min: 2, max: 10 }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name='gooddesc' label="商品描述">
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item name="cate" label="选择品类" rules={[{ required: true, message: '品类必填' }]}>
                    <Select options={areas} />
                </Form.Item>

                <Form.Item
                    label='商品图片'
                    rules={[
                        { required: true, message: '商品图片是必填!' }
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
                                <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} />
                                : <ZUploadIcon />
                        }
                    </Upload>
                </Form.Item>

                {/* 提交按钮 */}
                < Form.Item {...tailLayout} >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}
