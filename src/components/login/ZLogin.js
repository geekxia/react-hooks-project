import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './style.scss'
import api from '@/utils/api'
import { useHistory } from 'react-router-dom'
import {useEffect} from 'react'

export default props =>{
  const history = useHistory()

  //提交登录
  const onFinish = (values) => {
    api.fetchLogin(values).then(res=>{
      if(res && res.token){
        //把登录状态存储起来
        localStorage.setItem('token',res.token)
        // 跳转到首页
        // location.href='/#/'
        history.replace('/')
        // 调用App组件传递过来的onLogin方法，刷新 isLogin
        props.onLogin()
      }
    })
  }
  useEffect(()=>{
    location.href = '/#/login'
    return undefined
  }, [])
  return(
    <div className='z-login'>
      <div className='loginform'>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名！',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <a href="">立即注册</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}