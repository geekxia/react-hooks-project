
import { useState } from 'react'
import { Form, Input, Button,InputNumber,Select,Upload,Switch} from 'antd';
import {UploadButton} from '@/components/index'
import {fetchGoodOrEdit} from '@/utils/api'
import img from '@/utils/img'
import CateSelect from './components/CateSelect'
const { TextArea } = Input;
const {Option} =Select
export default props=>{

  let [imageUrl, setImageUrl] = useState('')
  const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 12,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 12,
      },
    };

     

       // 获取Form的实例
  const [form] = Form.useForm()

      

  const imgSuccess = e => {
    console.log('图片上传成功', e)
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }
  const onFinish= values =>{
    console.log('提交',values);
    values.img=imageUrl
    fetchGoodOrEdit(values).then(()=>{
        // props.history.replace('/good')
    })
    
  }
      
    return (
        <div>
            <Form
            {...layout}
            name="register"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            form={form}
            >

            <Form.Item
                label="商品名称"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="商品详情"
                name="desc"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            > 
                <TextArea rows={4} />
            </Form.Item>  

            <Form.Item
                label="商品价格"
                name="price"
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            >
                <InputNumber min={0} max={10} step={0.1} />
            </Form.Item>

            <Form.Item
                name="cate"
                label="商品品类"
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please select your country!',
                },
                ]}
            >
                <CateSelect />
            </Form.Item>

            <Form.Item
                label="文件上传"
                
                rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
                ]}
            > 
                
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={img.upLoadUrl}
                    onChange={e=>imgSuccess(e)}
                >
                    {imageUrl ? <img src={img.imgBaseUrl+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton/>}
                </Upload>
            </Form.Item>

            <Form.Item
                name="hot"
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