import { useState } from 'react';
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
    Switch,
    Upload, 
    message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import {WdUpdate} from '@/components'
import img from '@/utils/img'
import {fetchGoodOrEdit} from '@/utils/api'
const { Option } = Select;
const {TextArea}=Input
const AutoCompleteOption = AutoComplete.Option;


    
const formItemLayout = {
    labelCol: {
    sm: { span: 4 },
    },
    wrapperCol: {
    sm: { span: 16 },
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
    



    
    



export default props => {
    let [imageUrl,setimageUrl]=useState('')
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const imgSuccess = e => {
        console.log('图片上传成功', e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setimageUrl(e.fileList[0].response.data.url)
        }
    }
    //表单提交
    const onFinish = values => {
        console.log('提交内容', values);
        values.img=imageUrl
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace('/good/list')
        })
    };
  // 获取Form的实例
    const [form] = Form.useForm();
    return(
        <div>
            <h1>增加商品</h1>
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
                {
                    required: true,
                    message: '商品名称必填!',
                },
                {
                    max:10,
                    message:'商品名称不能超过10个字'
                },
                {
                    min:2,
                    message:'商品名称不能小于2个字'
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="desc"
                label="商品描述"
                rules={[
                {
                    required: true,
                    message: '商品描述必填!',
                },
                {
                    max:50,
                    message:'商品描述不能超过50个字'
                },
                {
                    min:10,
                    message:'商品描述不能小于10个字'
                },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name="cate"
                label="选择品类"
                rules={[
                {
                    required: true,
                    message: '品类是必选的!',
                },
                ]}
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
                name="price"
                label="商品价格"
                rules={[
                {
                    required: true,
                    message: '商品描述必填!',
                },
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>
            
            <Form.Item
            name='hot'
            label='是否热销'
            >
                <Switch />
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
                <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
                : <WdUpdate />
                }
            </Upload>
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}