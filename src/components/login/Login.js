import { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import api from '@/utils/api'
import { useHistory } from 'react-router-dom'

import './style.scss'

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
};

export default props => {

    const history = useHistory()
    

    const onFinish = (values) => {
        console.log('Success:', values);
        api.fetchLogin(values).then(res=>{
            console.log('登录成功',res);
            if(res&&res.token) {
                // 把登录状态（鉴权）存储起来
                localStorage.setItem('token',res.token)
                localStorage.setItem('username',values.username)
                if(values.remember) {
                    localStorage.setItem('password',values.password)
                } else{
                    localStorage.removeItem('password')
                }
                // 跳转到首页
                history.replace('/')
                // 调用App组件传递过来的onLogin方法，刷新 isLogin
                props.onLogin()
            }
        })
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    useEffect(()=>{
        location.href = '/#/login'
        return undefined
    },[])
    return (
        <div className='tt-login'>
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                        username: localStorage.getItem('username'),
                        password: localStorage.getItem('password')
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名!'
                        },
                        {
                            pattern: /^[a-zA-Z][a-zA-Z]{2,15}$/,
                            message: '用户名格式不正确'
                        }
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
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}