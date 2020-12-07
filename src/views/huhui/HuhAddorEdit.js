import React,{ useState } from "react"
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
    Modal
} from 'antd'
import { 
    PlusOutlined,
    LoadingOutlined
} from '@ant-design/icons'

const { Option } = Select;
const { TextArea } = Input

const AutoCompleteOption = AutoComplete.Option

const HuhAddorEdit = (props)=>{
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    let [imageUrl,setImageUrl] = useState("")
    const [form] = Form.useForm()
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
    ]

    const formItemLayout = {
        labelCol: {
          sm: { span: 8 },
        },
        wrapperCol: {
          sm: { span: 12 },
        },
    }

    const tailFormItemLayout = {
        wrapperCol: {
          sm: {
            span: 16,
            offset: 8,
          }
        }
    }

    const onFinish = values => {
        console.log('Received values of form: ', values);
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
          </Select>
        </Form.Item>
    )

    const onWebsiteChange = value => {
        if (!value) {
          setAutoCompleteResult([]);
        } else {
          setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
        }
    }


    //图片上传
    const handleCancel = () => setState({ previewVisible: false })
    const beforeUpload=(file)=>{
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
    const imgSuccess = (e)=>{
        console.log("图片上传成功",e);
    }
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )

    return (
        <div className="HH-AddorEdit">
            <h1>商品新增</h1>
            <hr/>
            <div className="AddorEdit-main" style={{paddingTop:"20px"}}>
                <Form
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
                            { required: true , message: '请输入商品名称！'},
                            { max:10 , message:"商品名称最多10个字！" },
                            { min:2 , message:"商品名称最少2个字！" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            { required: true , message: '请输入商品描述！' },
                            { min:10 , message:"商品描述最少10个字！" }
                        ]}
                    >
                        <TextArea showCount maxLength={200} />
                    </Form.Item>
                        
                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            { required: true , message: '请输入商品价格！' }
                        ]}
                    >
                        <InputNumber min={0}/>
                    </Form.Item>

                    <Form.Item
                        name="cate"
                        label="选择品类"
                        rules={[
                            { required: true , message: '请输入商品价格！' }
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="img"
                        label="商品图片"
                        rules={[
                            { required: true , message: '' }
                        ]}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={imgSuccess}
                        >
                            {
                                imageUrl ? 
                                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                                : uploadButton}
                        </Upload>
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

export default HuhAddorEdit