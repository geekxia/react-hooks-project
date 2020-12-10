import { Form, Input, Button, Checkbox } from 'antd';
import { useEffect } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import {fetchLogin} from '@/utils/api'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
    };
    const tailLayout = {
    wrapperCol: { offset: 4, span: 19 },
    };


export default props=>{
    const history =useHistory()
    const onFinish = values => {
        console.log('Success:', values);
        fetchLogin(values).then(res=>{
            console.log('登录成功',res)
            localStorage.setItem('token',res.token)
            history.replace('/')
            props.onLogin()
        })
        };
        return(
    <div className='wd-login'>
        <h1>登录</h1>
        <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ 
                    required: true, 
                    message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密  码"
                name="password"
                rules={[{ 
                    required: true, 
                    message: 'Please input your password!' }]}
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
    </div>
    )
}