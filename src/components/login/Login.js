import { useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'
import api from '@/utils/api'
import { useHistory } from 'react-router-dom'

const layout = { labelCol: { span: 4 }, wrapperCol: { span: 19 }, };
const tailLayout = { wrapperCol: { offset: 8, span: 16 }, };


export default props => {

    const history = useHistory()

    const onFinish = values => {
        console.log('Success:', values);
        api.fetchLogin(values).then(res => {
            console.log('调接口成功', res)
            if (res && res.token) {
                // 把登录状态( 鉴权 ) 存储起来
                localStorage.setItem('token', res.token)
                // 跳转到首页
                // location.href = '/#/'
                history.replace('/')
                // 调用App组件传递过来的onLogin方法，刷新 isLogin
                props.onLogin()
            }
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        location.href = '/#/login'
        return undefined
    }, [])

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
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!'
                            },
                            {
                                pattern: /^[a-zA-Z][a-zA-Z]{1,19}$/,
                                message: '用户名格式有误'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密 码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
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