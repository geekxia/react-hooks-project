import { 
Form, 
Input, 
InputNumber, 
Button, 
Select, 
Upload 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import '@/components/layout/style.scss'

const { Option } = Select;

export default props=>{
    const [form] = Form.useForm()

    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 8,
        },
      };

      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

      
        const onFinish = (values) => {
          console.log(values);
          form.resetFields();
        };
    return (
        <div className='qf-add'>
            <h1>添加商品</h1>
            <hr/>
            <Form 
                {...layout} name="nest-messages" 
                form={form} onFinish={onFinish} 
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['product', 'name']}
                    label="商品名称"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name={['product', 'type']}
                    label="商品类别"
                    rules={[{ required: true }]}
                >
                    <Select
                    placeholder="请选择商品类别"
                    allowClear
                    >
                    <Option value="male">1</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name={['product', 'num']}
                    label="商品数量"
                    rules={[
                    {
                        type: 'number',
                        min: 1,
                        max: 1000,
                        required: true
                    }
                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item name={['product', 'introduction']} label="商品描述">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item name={['product', 'img']} label="商品图片">
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                    <Button type="primary" htmlType="submit">
                    提交
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}