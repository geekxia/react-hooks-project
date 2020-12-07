

import React,{ useState } from "react";

import { 
    Form, 
    Input, 
    Button, 
    Select,
    InputNumber,
    Upload, 
    Switch
} from 'antd';

import { UploadIcon } from "@/components";

import img from "@/utils/img";



const { Option } = Select;

function onChange(value) {
console.log(`selected ${value}`);
}

function onBlur() {
console.log('blur');
}

function onFocus() {
console.log('focus');
}

function onSearch(val) {
console.log('search:', val);
}


export default props=>{

    const [autoCompleteResult,setAutoCompleteResult]=useState([])
    let [imageUrl,setImageUrl]=useState("")

    // 获取Form的实例
    const [form]=Form.useForm()

    // 图片上传成功
    const imgSuccess=e=>{
        console.log("图片上传成功",e);
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 16,
        },
    };

    return(
        <div className="">
            <h1>商品新增</h1>
            <hr/>
            <div>
                <Form {...layout} name="nest-messages" >
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
                        name="details"
                        label="商品详情"
                        rules={[
                            {required: true,message:"必填项"},
                            {min:10,message:"商品详情不少于 10 字"}
                        ]}
                        >
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Form.Item 
                        name="category"
                        label="商品种类"
                        rules={[
                            {required: true,message:"必填项"},
                            {max:10,min:2,message:"商品名称 必须为 2 和 10 之间"}
                        ]}
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="品类"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
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
                            {imageUrl ? <img src={img.imgBase +imageUrl} alt="avatar" style={{ width: '100%' }} /> :<UploadIcon />}
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
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}