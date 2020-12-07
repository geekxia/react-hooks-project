import { 
  Breadcrumb,
  Form, 
  Input, 
  InputNumber, 
  Button,
  DatePicker,
  Checkbox 
} from 'antd'


const { RangePicker } = DatePicker


export default props => {

  
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const options = [
    { label: '公开', value: 'Apple' },
    { label: '部分公开', value: 'Pear' },
    { label: '不公开', value: 'Orange' },
  ]
    const onFinish = values => {
      
      console.log(values);
    }
  
    return(
      <div className='qf-from'>
        <h1>基础表单使用</h1>

        {/* 面包屑的表单 */}
        <div className='qf-from-crumb' >
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>表单页</Breadcrumb.Item>
            <Breadcrumb.Item>基础表单</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className='qf-from-item' style={{margin:"20px 0"}}>
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={['user', 'name']} label="标题" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name={['user', 'Picker']} label="起始时间" >
              <RangePicker allowClear />
            </Form.Item>

            <Form.Item name={['user', 'target']} label="目标描述" rules={[{ type: 'string' }]}>
              <Input.TextArea />
            </Form.Item>

            <Form.Item name={['user', 'fortarget']} label="衡量标准">
              <Input.TextArea />
            </Form.Item>


            <Form.Item name={['user', 'customer']} label="客户">
              <Input />
            </Form.Item>

            <Form.Item name={['user', 'invitation']} label="邀填人">
              <Input />
            </Form.Item>

           
            <Form.Item name={['user', 'weight']} label="权重" rules={[{ type: 'number', min: 0, max: 100 }]}>
              <InputNumber 
                 formatter={value1 => `${value1}%`}
                 parser={value1 => value1.replace('%', '')}
              />
            </Form.Item>

            <Form.Item name={['user', 'hot']} label="目标公开" >
              <Checkbox.Group options={options} />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
}