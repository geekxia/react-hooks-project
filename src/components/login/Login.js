
import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'
import api from '@/utils/api'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 10, span: 10},
  };
export default props=>{
    
    const history = useHistory()

    //登录提交
    const onFinish=(values)=>{
        api.fetchLogin(values).then(res=>{
            if(res && res.token) {
                // 把登录状态(鉴权)存储起来
                localStorage.setItem('token',res.token)
                //跳转到首页
                history.replace('/')
                // 调用App组件传递过来的onLogin方法，舒心isLogin
                props.onLogin()

            }
        })
        props.onLogin()
    }
    return (
        <div className='qf-login'>
        <div>
    <Form
        {...layout}
        name="login"
        onFinish={onFinish}
        >
        <Form.Item
            label="账号"
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
            提交
            </Button>
        </Form.Item>
    </Form>
        </div>
        </div>
    )
}