import { Form, Input, Button, Checkbox } from 'antd';


export default props => {
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 12 },
    };
    const tailLayout = {
    wrapperCol: { offset: 2, span: 16 },
    };
    
    const Demo = () => {
        const onFinish = values => {
            console.log('Success:', values);
        };
        
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };
        
        return (
            <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
        
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
            </Form.Item>
        
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                登录
                </Button>
            </Form.Item>
            </Form>
        );
    };
    return (
        <div>
            <h1>登录</h1>
            <Demo />
        </div>
    )
}