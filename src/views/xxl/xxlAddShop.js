import React,{useState} from "react"
import { 
    Form, 
    Input, 
    InputNumber, 
    Button,
    Select,
    Upload,
    message,
    Switch
} from 'antd';
import XxlUploadIcon from '@/components/xxl-upload-icon/index.js'
import img from "@/utils/img"
import api from '@/utils/api'
const { Option } = Select


export default props=>{
    let [imageUrl,setImageUrl] = useState("")
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
    }   
    const onFinish = (values) => {
        //提交成功
        values.img = imageUrl
        api.pushshop(values).then(()=>{
            props.history.replace("/xxlshop")
        })

    }
    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    const imgSuccess = e=>{
        console.log("图片上传成功",e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response && e.fileList[0].response.data){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    const tailFormItemLayout = {
        wrapperCol: {
          sm: {
            span: 16,
            offset: 4,
          },
        }
    }
    return (
        <div className="xxl-addshop">
            <Form 
                {...layout}
                name="reguster"
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
                    {required: true,message:"商品名称是必填的"},
                    {max:10,message:"商品名称不能超过10个字"},
                    {min:2,message:"商品名称不能少于两个字"}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                        {required:true,message:"商品描述是必填的！"},
                        {max:30,message:"商品名称不能超过130字"},
                        {min:10,message:"商品名称不能少于10个字"}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[
                        {type: 'number',min: 0,max: 99},
                        {required:true,message:"商品描述是必填的！"}

                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item 
                    name="cate" 
                    label="选择一个品类"
                    rules={[
                        {required:true,message:"选择品类是必填的"}
                    ]}
                >
                    <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="jack">xxl</Option>
                        <Option value="lucy">ljj</Option>
                        <Option value="xxl" >xhh</Option>
                        <Option value="Yiminghe">xpp</Option>
                    </Select>
                </Form.Item>

                <Form.Item  
                    label="商品图片"
                    rules={[
                        {required:true,message:"商品图片是必填"}
                    ]}
                >
                     <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={img.uploadUrl}
                        onChange={imgSuccess}
                    >
                        {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <XxlUploadIcon/>}
                    </Upload>
                    
                </Form.Item>

                <Form.Item
                    name="hot"
                    label="是否热销"
                    valuePropName="checked"
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