import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'
import {useEffect}from 'react'
import api from '@/utils/api.js'
import { useHistory } from 'react-router-dom'


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default props=>{
  const history=useHistory()
const onFinish = values => {
  console.log('Success:', values)
  api.fetchLogin(values).then(res=>{
    console.log(res)
    if(res && res.token){
      localStorage.setItem('token',res.token)
      history.replace('/')
      props.onLogin()
    }
  })
}
  return(
    <div className="qf-login">
      <div className="qf-login-main">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
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