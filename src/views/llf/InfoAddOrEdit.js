import React, { useState } from 'react';
import { 
    Form,
    Input, 
    Button,
    Select,
    InputNumber ,
    Upload,
    Switch 
    } from 'antd';
import ImgCrop from 'antd-img-crop';
import img from '@/utils/img'
import { fetchGoodOrEdit } from '@/utils/api'

//form表单布局
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  //下拉选项
const { Option } = Select;
//文本框
const { TextArea } = Input;



const InfoAddOrEdit=props=>{
    let [imageUrl, setImageUrl] = useState('')

    const imgSuccess = e =>{
        // console.log("图片上传成功",e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

     //表单提交
    const onFinish = (values) => {
        values.img=imageUrl
        // console.log('Success:', values);
        fetchGoodOrEdit(values).then(()=>{
            console.log('表达提交成功')
            props.history.replace('/llfList')
        })
    };
      
    return (
        <div className='llf-AddOrEdit'>
        <div>测试商品新增页</div>
                    
                <Form
                {...layout}
                style={{margin:'25px 0'}}
                name="basic"
                onFinish={onFinish}
                >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[
                    { required: true, message: '商品名称是必填的哦!' },
                    { max:10,message:'商品名称不能超过10个字' },
                    { min:2,message:'商品名称不能少于两个字'}
                    ]}
                >
                    <Input />
                </Form.Item>
            
                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[
                    { required: true,message: '商品描述是必填的哦!'},
                    { max:30,message:'商品名称不能超过30个字' },
                    { min:6,message:'商品名称不能少于6个字'}
                    ]}
                >
                <TextArea rows={4} />
                </Form.Item>
                
                <Form.Item
                    label="选择品类"
                    name="cate"
                    rules={[
                    { required: true,message: '必须要选择品类哦!'},
                    ]}
                >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择品类"
                    allowClear={true}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                </Form.Item>
                
                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[
                    { required: true, message: '商品价格是必填的哦!' },
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                
                <Form.Item
                    label="商品图片"
                    rules={[
                    { required: true, message: '商品图片是必填的哦!' },
                    ]}
                >
                <ImgCrop rotate>
                    <Upload
                    name="file"
                    action={img.uploadUrl}
                    listType="picture-card"
                    onChange={imgSuccess}
                    className="avatar-uploader"
                    showUploadList={false}
                    >
                    { 
                    imageUrl ?
                    <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
                    : '+ Upload'
                    }
                    </Upload>
                </ImgCrop>
                </Form.Item>
            
            
                <Form.Item
                name='hot'
                label="是否热销" 
                valuePropName='checked'
                >
                <Switch />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default InfoAddOrEdit