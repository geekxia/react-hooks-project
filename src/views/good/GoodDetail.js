
import { useState } from 'react'
import { Form, Input, Button,InputNumber,Select,Upload, message } from 'antd';
import {UploadButton} from '@/components/index'
import img from '@/utils/img'
const { TextArea } = Input;
const {Option} =Select
export default props=>{

    
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
      const handleChange = info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
      };

       // 获取Form的实例
  const [form] = Form.useForm()

      let [imageUrl, setImageUrl] = useState('')

      const imgSuccess = e => {
        console.log('图片上传成功', e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
          setImageUrl(e.fileList[0].response.data.url)
        }
      }
      const onFinish= value =>{
        console.log('提交',value);
        
        
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
                name="detail"
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
                    action={img.uploader}
                    onChange={imgSuccess}
                >
                    {imageUrl ? <img src={img.imgBaseUrl+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <UploadButton/>}
                </Upload>
            </Form.Item>

            
            
            <Form.Item
                name="select"
                label="商品品类"
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please select your country!',
                },
                ]}
            >
                <Select placeholder="Please select a country">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
                </Select>
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

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                提交
                </Button>
            </Form.Item>

            </Form>
                
        </div>
    )
}