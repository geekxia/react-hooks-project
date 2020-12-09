import {useEffect} from "react"
import { Form, Input, Button, Checkbox } from 'antd';
import "./style.scss"
import  {useHistory} from "react-router-dom"
import {fetchLogin} from "@/utils/api"

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };



export default props=>{
    let history=useHistory()
    const onFinish = (values) => {
        fetchLogin(values).then(res=>{
            console.log(res)
            if(res&&res.token){
                localStorage.setItem("token",res.token)
                props.ons(res.token)
                history.replace("/")  
            }

        })
      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    useEffect(()=>{
        return undefined
    },[])

    return (
        <div className="d1"  >
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户"
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
                        label="密码"
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
    )
}