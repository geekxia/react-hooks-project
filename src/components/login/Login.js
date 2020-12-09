import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'
import api from '@/utils/api'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    }
}
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    }
}

export default props=>{
    const onFinish = (values) => {
        api.fetchLogin(values).then(res=>{
            console.log(res)
            if(res&&res.token){localStorage.setItem('token',res.token)}
            location.reload()
        })
        console.log('Success:', values)
        
    }
    location.href='/#/login'
    return (
        <div className='qf-login '>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}