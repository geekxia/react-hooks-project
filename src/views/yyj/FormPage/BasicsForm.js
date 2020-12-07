import { PageHeader, Form, Input, InputNumber, Button, DatePicker, TimePicker, Space, Radio} from 'antd';

const { RangePicker } = DatePicker;
const routes = [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    {
      path: '',
      breadcrumbName: '表单页',
    },
    {
      path: '',
      breadcrumbName: '基础表单',
    },
  ];

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 9,
    },
};
// 时间选择
const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
};
const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
};

const Demo = () => {
    // 时间选择器
    const onFinish = fieldsValue => {
        // Should format date value before submit.
        const rangeValue = fieldsValue['range-picker'];
        const values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);
      };
  
    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['user', 'name']}
          label="标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input 
            placeholder="给目标起个名字"
          />
        </Form.Item>
        <Form.Item name={['user', 'time']} label="起止日期" {...rangeConfig}>
            <RangePicker />
        </Form.Item>
        <Form.Item name={['user', 'describe']} label="目标描述">
          <Input.TextArea 
            placeholder="请输入你的阶段性工作目标"
          />
        </Form.Item>
        <Form.Item name={['user', 'standard']} label="衡量标准">
          <Input.TextArea 
            placeholder="请输入衡量标准"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'client']}
          label="客户（选填）"
          tooltip='目标的服务对象'
        >
          <Input 
            placeholder="请描述你服务的客户，内部客户直接 @姓名 / 工号"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'invite']}
          label="邀评人（选填）"
        >
          <Input 
            placeholder="请直接 @姓名 / 工号,最多可邀请5人"
          />
        </Form.Item>
        <Form.Item
          name={['user', 'weight']}
          label="权重（选填）"
        >
          <InputNumber min={0} max={100} defaultValue={0} />&nbsp;&nbsp;%
        </Form.Item>
        <Form.Item
          name={['user', 'public']}
          label="目标公开"
          extra="客户、邀评人默认被分享"
        >
            <Radio.Group>
                <Radio value={1}>公开</Radio>
                <Radio value={2}>部分公开</Radio>
                <Radio value={3}>不公开</Radio>
            </Radio.Group>
        </Form.Item>
    
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Space>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button>
                    保存
                </Button>
            </Space>
        </Form.Item>
      </Form>
    );
  };
export default props=>{
    return(
        <div>
            <PageHeader
                className="site-page-header"
                title="基础表单"
                breadcrumb={{ routes }}
                footer="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
            />
            <Demo />
        </div>
    )
}