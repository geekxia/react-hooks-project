import { Form, Input, Button, Select, Switch, Upload, InputNumber } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import img from '@/utils/img'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import action from '@/store/actions'
import { fetchAddOrEdit } from '@/utils/api';
const { Option } = Select;
const formLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
};
// 热销
function onChangeHot(checked) {
    console.log(`switch to ${checked}`);
}
const swiperLayout = {
    wrapperCol: { span: 8 }
}
// 品类选择
const areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];
const buttonLayout = {
    wrapperCol: { offset: 2, span: 16 },
};
export default props => {
    // 获取Form的实例
    const [form] = Form.useForm()
    let { loading } = props
    let [imageUrl, setImageUrl] = useState('')
    // 价格改变
    const onChangePrice = () => {
    }
    // 图片上传成功
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const handleChange = e => {
        console.log('图片上传成功', e)
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    // 表单提交
    const onFinish = values => {
        values.img = imageUrl
        console.log('values 提交接口', values)
        // 入参：从页面来,添加商品时的这些数据
        fetchAddOrEdit(values).then(() => {
            props.history.replace('/zjr/list')
        })
    };

    return (
        <div>
            <h1>商品添加和编辑测试</h1>
            <Form
                form={form}
                {...formLayout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                {/* 名 */}
                <Form.Item
                    label="商品名"
                    name="name"
                    rules={[{ required: true, min: 2, max: 10 }]}
                >
                    <Input />
                </Form.Item>
                {/* 描述 */}
                <Form.Item name='desc' label="商品描述">
                    <Input.TextArea rows={4} />
                </Form.Item>
                {/* 品类 */}
                <Form.Item name="cate" label="选择品类" rules={[{ required: true, message: '品类必填' }]}>
                    <Select options={areas} />
                </Form.Item>
                <Form.Item name='price' label="商品价格">
                    <InputNumber min={1} onChange={onChangePrice} />
                </Form.Item>
                {/* 图片上传 */}
                <Form.Item label="上传图片">
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={img.uploadUrl}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                {/* 热销 */}
                <Form.Item label="是否热销" name='hot' valuePropName='checked'>
                    <Switch />
                </Form.Item>
                {/* 提交按钮 */}
                < Form.Item {...buttonLayout}  >
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}
