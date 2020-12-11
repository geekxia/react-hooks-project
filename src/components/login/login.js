import { Form, Input, Button, Checkbox } from 'antd';
import "./style.scss"
import { useEffect } from "react"
import api from "@/utils/api"
import { useHistory } from "react-router-dom"


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 19 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 19 },
};


export default props => {
    const history = useHistory()
    const onFinish = values => {
        console.log(values);
        api.fetchLogin(values).then(res => {

            //把登录状态(鉴权)存储起来
            if (res && res.token) {
                localStorage.setItem("token", res.token)

                //跳转到首页
                history.replace("/")
                //调用App组件传递过来的onLogin方法,刷新isLogin
                props.onLogin()
            }
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        location.href = ("/#/login")
        return undefined
    }, [])

    return (
        <div className="qq-login">
            <div>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{ required: true, message: '请输入你的账号' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                        name="remember"
                        valuePropName="checked"
                    >

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