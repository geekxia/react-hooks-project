import React,{ useState,useEffect }  from 'react'
import './login.scss'
import { Form, Input, Button, Checkbox } from 'antd';
import { useSelector,useDispatch} from 'react-redux'
import action from "@/store/actions"
import api from "@/utils/api"

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
  const tailLayout = {
    wrapperCol: { offset: 4, span: 16},
};
export default props=>{
    let [username,setuSername] = useState("")
    const onFinish = values => {
        console.log(values)
        api.fetchXxlLogin(values).then(res=>{
            if(res && res.token){
                console.log(res)
                //设置token
                localStorage.setItem("token",res.token) 
                if(values.remember){
                    localStorage.setItem("username",values.username)
                }

                //改变app中isLogin的值,跳转页面
                props.onLogin()
            }
            
            
        })
    };
    useEffect(()=>{
        
        return undefined
    },[])
    useEffect(()=>{
        //手动修改url
        location.href="/#/login"
        return undefined
    },[])
    return (
        <div className="xxl-login">
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入您的用户名' }]}
                >
                    <Input value={username} onChange={()=>(setuSername(localStorage.getItem("username") ))}/>
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入您的密码' }]}
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
    )
}