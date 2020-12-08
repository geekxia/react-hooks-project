

import { useState } from "react";
// UI组件
import { 
    Form, 
    Input, 
    Button, 
    Select,
    InputNumber,
    AutoComplete,

    Upload, 
    Switch
} from 'antd';

// 自定义 Icon 组件
import { UploadIcon } from "@/components";

import { fetchGoodOrEdit } from "@/utils/api";

import img from "@/utils/img";



const { Option } = Select;


const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
};

export default props=>{

    const [autoCompleteResult,setAutoCompleteResult]=useState([])

    let [imageUrl,setImageUrl]=useState("")

    // 获取Form的实例
    const [form]=Form.useForm()

    // 图片上传成功
    const imgSuccess = e => {
        console.log("图片上传成功",e);
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

    // 提交表单
    const onFinish = values =>{
        values.img=imageUrl
        console.log("values 提交接口",values);
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace("/goodlist")
        })
    }

    return(
        <div className="">
            <h1>商品新增</h1>
            <hr/>
            <div>
                <Form 
                    {...layout} 
                    name="nest-messages"  
                    onFinish={onFinish}    
                >
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[
                            {required: true,message:"必填项"},
                            {max:10,min:2,message:"商品名称 必须为 2 和 10 之间"}
                        ]}
                    >
                        <Input />
                    </Form.Item>
                  
                    <Form.Item 
                        name="desc"
                        label="商品介绍"
                        rules={[
                            {required: true,message:"必填项"},
                            {min:5,message:"商品详情不少于 5 字"}
                        ]}
                        >
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Form.Item 
                        name="cate"
                        label="商品种类"
                        rules={[{required: true,message:"必填项"}]}
                    >
                        <Select
                            style={{ width: 200 }}
                            placeholder="品类"
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item 
                        name="price"
                        label="商品价格"
                        rules={[
                            {required: true,message:"必填项"},
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>
                    
                    <Form.Item
                        label="图片"
                        rules={[{required: true,message:"必填项"}]}
                    >
                        <Upload
                           name="file"
                           action={img.uploadUrl}
                           listType="picture-card"
                           className="avatar-uploader"
                           showUploadList={false}
                           onChange={imgSuccess}
                        >
                            {imageUrl ? <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> :<UploadIcon />}
                        </Upload>
                    </Form.Item>

                    <Form.Item 
                        name="hot"
                        label="是否热销"
                        valuePropName="checked"
                    >
                        <Switch  />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}