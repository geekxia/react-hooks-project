import { Form, Input, Button, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Option } = Select
const { TextArea } = Input;

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
  }
 
const FFrom=props=>{

    const Demo = () => {
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      }  
    return(
        <div className="f-from">
            <h2>from表单</h2>
            <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="name"
                    name="商品名称"
                    rules={[
                    {
                        required: true,
                        max:6,
                        min:2,
                        message: '请输入2到6位的名称',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="desc"
                    name="商品描述"
                    rules={[
                    {
                        required: true,
                        max:18,
                        min:6,
                        message: '请输入6到18位的描述',

                    },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    label="name"
                    name="商品名称"
                    rules={[
                    {
                        required: true,
                        max:6,
                        min:2,
                        message: '请输入2到6位的名称',
                    },
                    ]}
                >
                    <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择品类 "
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    >
                        <Option value="1">方一波</Option>
                        <Option value="2">啦啦啦啦</Option>
                        <Option value="3">哈哈哈</Option>
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default FFrom