import { Form, Input, Button, Checkbox } from 'antd'
import './style.scss'
import { fetchGetLoginToken } from '@/utils/api'
import { useEffect } from 'react'


const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 5,
      span: 16,
    },
  };

export default props=>{

    const onFinish = (values) => {
        // console.log('Success:', values);
        fetchGetLoginToken(values).then(res=>{
            // console.log(res)
            if(res && res.token){
                localStorage.setItem('token',res.token)
                props.onLogin(res.token)
            }
        })
      };

      useEffect(()=>{
        location.href='/#/login'
      },[])

    return(
        <div className='qf-login'>
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
                        rules={[
                        {
                            required: true,
                            message: '请输入用户名',
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
                            message: '请输入密码',
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