import React,{ useState } from "react"
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    Upload,
    Switch
} from 'antd'
import img from "@/utils/img"
import {
    QfUploadIcon
} from "@/components/index"
//引入接口
import {
    fetchGoodOrEdit
} from "@/utils/api"

const { Option } = Select;
const { TextArea } = Input

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

const HuhAddorEdit = (props)=>{
    let [imageUrl,setImageUrl] = useState("")
    const [form] = Form.useForm()

    //表单提交
    const onFinish = values => {
        values.img = imageUrl
        console.log('表单提交 ', values);
        fetchGoodOrEdit(values).then(res=>{
            props.history.replace('/hucontact')
        })
    }

    //图片上传
    const imgSuccess = (e)=>{
        if( e && e.fileList && e.fileList[0] && e.fileList[0].response){
            console.log("图片上传成功",e);
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

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
                            placeholder="请选择商品品类"
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
                            { required: true , message: '请上传商品图片！' }
                        ]}
                    >
                        <Upload
                            name="file"
                            action={img.uploadUrl}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            onChange={imgSuccess}
                            fileList={imageUrl}
                        >
                            {
                                imageUrl ? 
                                <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> 
                                : <QfUploadIcon />
                            }
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item
                        name="hot"
                        label="是否热销"
                        valuePropName="checked"
                    >
                        <Switch  />
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