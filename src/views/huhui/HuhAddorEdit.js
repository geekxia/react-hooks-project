import React,{ useState } from "react"
import {
    Form,
    Input,
    Button,
    InputNumber,
    Switch
} from 'antd'
//引入接口
import {
    fetchGoodOrEdit
} from "@/utils/api"
//引入select通过组件
import WshSelect from "./components/WhsSelect"
//引入upload组件
import WhsUpload from "./components/WhsUpload"

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
    let [imageUrls,setImageUrls]=useState({})
    const [form] = Form.useForm()

    //当form表单值发生变化时,手动赋值
    const formChange=(values)=>{
        setImageUrls(values)
    }
    //表单提交
    const onFinish = values => {
        console.log('表单提交 ', values);
        fetchGoodOrEdit(values).then(res=>{
            props.history.replace('/hucontact')
        })
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
                    scrollToFirstError
                    onValuesChange={(val,values)=>formChange(values)}
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
                            { required: true , message: '请选择商品品类！' }
                        ]}
                    >
                        <WshSelect />
                    </Form.Item>

                    <Form.Item
                        name="img"
                        label="商品图片"
                        rules={[
                            { required: true , message: '请上传商品图片！' }
                        ]}
                    >
                        <WhsUpload src={imageUrls.img} />
                    </Form.Item>
                    
                    <Form.Item
                        name="hot"
                        label="是否热销"
                        valuePropName="checked"
                    >
                        <Switch  />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{backgroundColor:"#1890ff",borderColor:"#1890ff"}}
                            size="large"
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default HuhAddorEdit