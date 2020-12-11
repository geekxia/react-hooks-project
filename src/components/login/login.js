import {useEffect,useState} from "react"

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
let userInfo = {}
let username = localStorage.getItem('username')
let password = localStorage.getItem('password')
if(username&&password) userInfo={username,password}

export default props=>{
    const onFinish = (values) => {
        console.log('Success:', values);
        if(values.remember){
          localStorage.setItem('username',values.username)
          localStorage.setItem('password',values.password)
        }else{
          localStorage.removeItem('username')
          localStorage.removeItem('password')
        }
        fetchLogin(values).then(res=>{
            console.log(res)
            localStorage.setItem('token',res.token)
            location.href='/#/'
            props.onLogin(res.token)
        })
    };
    useEffect(()=>{
        location.href="/#/login"
        return undefined
    },[])
    return (
        <div className='px-login'>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember:true,...userInfo}}
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
                        <Checkbox>记住密码</Checkbox>
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