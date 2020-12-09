import { 
	Form, 
	Input, 
	Button, 
	Checkbox 
} from 'antd';
import api from '@/utils/api'
import {useHistory} from 'react-router-dom'
import { useEffect } from 'react';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 10 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};


export default props =>{
	const history = useHistory()

	// 登录提交
	const onFinish = values => {
			console.log('Success:', values);
			api.fetchLogin(values).then(res=>{
				console.log('登陆成功',res)
				if(res && res.token){
					localStorage.setItem('token',res.token)
					history.replace('/wyk/AllGoodList')
					// 调用App组件传递过来的onLogin方法，刷新 isLogin
					props.onLogin()
				}
			})
		};

		useEffect(()=>{
			location.href='/#/login'
			return undefined
		},[])

	return (
		<div className='qf-login'>
				<div className='qf-login-form' style={{margin:'100px 0'}}>
					<Form
						{...layout}
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
					>
							<Form.Item
								label="用户名"
								name="username"
								rules={[{ required: true, message: '请输入用户名!' }]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="密码"
								name="password"
								rules={[{ required: true, message: '请输入密码' }]}
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