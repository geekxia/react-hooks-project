import {useEffect} from "react"

import { Form, Input, Button, Checkbox } from 'antd';
import "./login.scss"

import {fetchLogin} from "@/utils/api"
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16,
    },
};
export default props=>{
    const onFinish = (values) => {
        console.log('Success:', values);
        fetchLogin(values).then(res=>{
            console.log(res)
            localStorage.setItem('token',res.token)
            location.href='/#/'
            props.onLogin(res.token)
        })
    };

    useEffect(()=>{
        // props.history.push('/#/login')
        location.href="/#/login"
        return undefined
    },[])
    return (
        <div className='px-login'>
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
                        label="用户名"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入密码!',
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