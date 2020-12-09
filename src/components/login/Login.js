import React,{useEffect} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'
import api from '@/utils/api.js'
import {useHistory} from 'react-router-dom'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 12 }
};


const Login=(props)=>{
  useEffect(()=>{
    location.href='/#/login'
    return undefined
  },[])
  const history = useHistory()
  const onFinish = values => {
    console.log('Success:', values);
    api.fetchLogin(values).then(res=>{
      localStorage.setItem("token",res.token)
          console.log('res',res)
          history.replace('/')
          location.reload()
      })
  };
  return(
    <div className="qf-login">
      <h1>测试登录</h1>
      <div className="qf-loform">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
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

export default Login