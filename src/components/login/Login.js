import React,{ useEffect } from "react"
import { Form, Input, Button, Checkbox } from 'antd'
import Api from "@/utils/api"
import { useHistory } from "react-router-dom"

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 12}
}

const tailLayout = {
    wrapperCol: { offset: 0, span: 24 }
}

const HHlogin =(props)=>{
    const history = useHistory()
    //提交表单
    const onFinish = values => {
        console.log('Success:', values)
        Api.fetchLogin(values).then(res=>{
            console.log("登录成功",res);
            if( res && res.token){
                localStorage.setItem("token",res.token)
                //跳转至首页
                history.replace("/")
                //改变父组件 的 isToken 状态
                props.onLogin()
            }
        })
    }

    useEffect(()=>{
        location.href="/#/login"
        return undefined
    },[])

    return(
        <div className="HH-login">
            <div className="login-main">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    horizontal="true"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
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
                            message: 'Please input your password!',
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

export default HHlogin