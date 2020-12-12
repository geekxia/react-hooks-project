import { Form, Input, Button, Checkbox } from 'antd'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import './style.scss'
import  api  from '@/utils/api'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 10,
    }
}


export default props => {
    const history = useHistory()

    useEffect(() => {
        location.href = '/#/login'
        return undefined
    }, [])

    const onFinish = values => {
        // console.log('-------login',values)
        api.fetchLogin(values).then(res => {
            if (res && res.token) {
                // 存储登录状态
                localStorage.setItem('token', res.token)
                // 跳转到首页
                history.replace('/')
                // 调用App组件传递过来的onLogin方法，刷新isLogin
                props.onLogin()
            }            
        })
    }

    return (
        <div className='qf-login'>
            {/* <h1>登录页面</h1>
            <hr /> */}
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
                        rules={[{
                            required: true,
                            message: '请输入您的用户名',
                        }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密 码"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '请输入您的密码',
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