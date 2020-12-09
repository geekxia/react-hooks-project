import { 
	Form, 
	Input, 
	Button, 
	Checkbox 
} from 'antd';
import {fetchLogin} from '@/utils/api'

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 10 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

export default props =>{

	const onFinish = values => {
			console.log('Success:', values);
		};

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