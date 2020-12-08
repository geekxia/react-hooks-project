import React ,{useState}from 'react'
import { 
        Form, 
        Input, 
        Button ,
        Select,
        Upload,
        Switch
    } 
from 'antd';

import { YlqUploadImg } from '@/components'

import img from '@/utils/img'

import { fetchGoodOrEdit } from '@/utils/api'

export default props =>{

    let [imageUrl,setImageUrl] = useState('')

    const { Option } = Select;
    
    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10},
      };     
    

    //图片上传
    const handleImg = e =>{
        console.log('图片上传成功',e)
        if(e && e.fileList && e.fileList[0]&& e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    //表单提交
    const onFinish = values => {
        values.img = imageUrl
        console.log('表单提交的value',values);
        //因为不用走状态管理，所以可以直接在页面上掉接口
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace('/ylq/homepage/goodlist')
        })

    };

    return(
        <div>
            <h1>ylq 新增页面</h1>
            <div>
                <Form {...layout} name="nest-messages" onFinish={onFinish}>
                    {/* 商品名称 */}
                    <Form.Item 
                        name='name'
                        label="商品名称"
                        rules={[
                            { required: true ,message:'商品名称是必填!'},
                            {min:2,message:'商品名称不能少于2个字!'},
                            {max:10,message:'商品名称不能多于10字!'},
                        ]}

                    >
                        <Input />
                    </Form.Item>
                    
                    {/* 商品描述 */}
                    <Form.Item 
                        name='desc'
                        label="商品描述"
                        rules={[
                            { required: true ,message:'商品描述是必填!'},
                            {min:2,message:'商品描述不能少于2个字!'},
                        
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    {/* 商品价格 */}
                    <Form.Item 
                        name='price'
                        label="商品价格" 
                        rules={[
                            { required: true ,message:'商品价格是必填!'},                   
                        ]}
                    >
                        <Input style={{width:'200px'}} />
                    </Form.Item>
                    {/* 品类选择*/}
                    <Form.Item
                        name="cate"
                        label="品类选择"
                        rules={[
                            { required: true, message: '商品描述是必填!' }
                        ]}
                    >
                        <Select style={{ width: 200 }} >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" >
                                Disabled
                            </Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>
                    {/* 上传图片 */}
                    {/* Form.Item 不写name 可以避免报错 */}
                    <Form.Item  
                        label="图片上传"
                        rules={[
                            { required: true, message: '图片是必填!' }
                        ]}
                    >
                    <Upload
                        name="file"
                        action={img.uploadUrl}
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={(e)=>handleImg(e)}
                        >
                        {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <YlqUploadImg/>}
                    </Upload>
                    </Form.Item>
                    {/* 是否热销 */}
                    {/* valuePropName='checked'可以解决switch的双向绑定，实现取值效果 */}
                    <Form.Item
                        name='hot'
                        label='是否热销'
                        valuePropName='checked'
                        >
                        <Switch />
                    </Form.Item>             
                    {/* 提交按钮 */}
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset:4 }}>
                        <Button type="primary" htmlType="submit">
                        提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}