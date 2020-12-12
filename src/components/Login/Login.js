
import { Form, Input, Button, Checkbox } from 'antd';
import './login.scss'
import React,{useEffect} from 'react'
import api from '@/utils/api'
import { useHistory } from 'react-router-dom'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

export default props=>{
  const history = useHistory()
  const onFinish = values => {
    api.fetchLogin(values).then(res=>{
      if(res&&res.token){
        localStorage.setItem('token',res.token)
        history.replace('/')
        props.onLogin()
      }
    })

  };

  useEffect(()=>{
    location.href = '/#/login'
    return undefined
  },[])

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='qf-login'>
      <div>
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
            rules={[{ required: true, message: 'Please input your username!' },{
              pattern: /^[a-zA-Z][a-zA-Z0-9]{1,15}$/,
              message: '大小写字母开头，16位大小写字母数字组成'
            }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' },{
              pattern: /^[a-zA-Z0-9][a-zA-Z0-9]{1,15}$/,
              message: '2-16位大小写字母数字组成'
            }]}
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