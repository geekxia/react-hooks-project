import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          {
            value: 'xihu',
            label: '西湖',
          },
          {
            value: 'duanqiao',
            label: '断桥',
          },
          {
            value: 'leifengta',
            label: '雷峰塔',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          {
            value: 'zhonghuamen',
            label: '中华门',
          },
          {
            value: 'zijin',
            label: '紫荆大道',
          },
        ],
      },
    ],
  },
  {
    value: 'guangdong',
    label: '广东',
    children: [
      {
        value: 'shenzhen',
        label: '深圳',
        children: [
          {
            value: 'baoan',
            label: '宝安区',
          },
          {
            value: 'wutong',
            label: '梧桐山',
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 4,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
     
    >

      <Form.Item
        name="nickname"
        label={
          <span>
            昵称&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: '请输入昵称',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱地址"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
          {
            required: true,
            message: '请输入您的邮箱',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次确认密码',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次输入的密码不一致！');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="residence"
        label="居住地"
        rules={[
          {
            type: 'array',
            required: true,
            message: '请输入您当前居住地址',
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="联系电话"
        rules={[
          {
            required: true,
            message: '请输入您的电话',
          },
        ]}
      >
        <Input
          addonBefore={prefixSelector}
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

      <Form.Item
        name="website"
        label="个人网页"
        rules={[
          {
            required: true,
            message: '请输入网址',
          },
        ]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="请输入网址">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item label="验证码" extra="我们必须确保你是人类。">
        <Row gutter={8}>
          <Col span={6}>
            <Form.Item
              name="captcha"
              noStyle
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button>获取验证码</Button>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('必须接受协议'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已经读过<a href="">协议</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
export default props =>{
  return(
    <div className="zz-happyming">
      <h1><b>注册表单</b></h1>
      <hr/><br/>
      <RegistrationForm />
    </div>
    
  )
}