import React,{useState} from 'react'
import { 
    Form, 
    Input,
    Select, 
    InputNumber, 
    Button ,
    AutoComplete,
    Upload, 
    message,
    Switch 
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import img from '@/utils/img'
import {fetchGoodAddOrEdit} from '@/utils/api'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
const { TextArea } = Input;
const {Option}=Select
const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }
function getBase64(img, callback) {
const reader = new FileReader();
reader.addEventListener('load', () => callback(reader.result));
reader.readAsDataURL(img);
}

function beforeUpload(file) {
const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
}

const isLt2M = file.size / 1024 / 1024 < 2;
if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
}
return isJpgOrPng && isLt2M;
}

export default (props)=>{
    let [imageUrl, setImageUrl] = useState('')
    let { loading } = props
    const [form] = Form.useForm()
    const imgSuccess = e => {
        if(e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
       };
    const onFinish = values => {
        values.img = imageUrl
        
        fetchGoodAddOrEdit(values).then(() => {
            // 跳转到列表页
            // props.history.replace('/good/list')
            console.log('values',values)
        })
        }
        
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <div>
            <h3>商品编辑</h3>
            <Form 
            {...layout} 
            name="nest-messages" 
            onFinish={onFinish}
            form={form}
            >
                <Form.Item name={['user', 'name']} label="商品名称" rules={[{ required: true, min: 2, max: 10 }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'desc']} label="商品描述" rules={[{ required: true,min:10,max:30 }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name={['user', 'price']} label="商品价格" rules={[{ required: true,type: 'number', min: 0}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name={['user', 'cate']} label="选择品类" rules={[{required: true}]}>
                    <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                name={['user', 'upload']}
                label="图片上传"
                >
                <Upload
                    name="file"
                    className="avatar-uploader"
                    listType='picture-card'
                    showUploadList={false}
                    action={img.uploadUrl}
                    onChange={imgSuccess}
                >
                    {imageUrl ? <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                </Form.Item>
                <Form.Item 
                name="hot"
                label="是否热销"
                valuePropName='checked'
                >
                    <Switch />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}