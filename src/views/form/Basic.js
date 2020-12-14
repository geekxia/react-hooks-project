
// ReactDOM.render(<Input placeholder="Basic usage" />, mountNode);


import React, { useState } from 'react';

import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Space,
  InputNumber,
  message
} from 'antd';

const { TextArea } = Input;

const { RangePicker } = DatePicker;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

const FormSizeDemo = () => {
  let timer = null
  const [componentSize, setComponentSize] = useState('default')
  const [loadings,setLoadings] = useState(false)
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }

  const onFinish = values => {
    console.log('Success:', values)
      setLoadings(!loadings)
      timer = setTimeout(()=>{
        setLoadings(loadings)
        message.success('提交成功');
      },1500)
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  
  
  
  
  
  return (
    <>
      <Form
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 10 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="basic"
      >
        <Form.Item 
          label="标题"
          name='标题'
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder='给目标起个名字' />
        </Form.Item>
    
        <Form.Item 
          label="起止日期"
          name='range-picker'
          rules={[{type: 'array', required: true, message: '请选择起止日期' }]}
        >
            <Space direction="vertical" size={24}>
              <RangePicker />
            </Space>
        </Form.Item>

        <Form.Item  
          label="目标描述"
          name='目标描述'
          rules={[{ required: true, message: '请输入目标描述' }]}
        >
            <TextArea rows={4} placeholder='请输入目标描述' />
        </Form.Item>

        <Form.Item  
          label="衡量标准"
          name='衡量标准'
          rules={[{ required: true, message: '请输入衡量标准' }]}
        >
            <TextArea rows={4} placeholder='请输入衡量标准' />
        </Form.Item>

        <Form.Item label="客户(选填)">
          <Input placeholder='请描述你服务的客户，内部客户直接 @姓名／工号' />
        </Form.Item>

        <Form.Item label="邀评人(选填)">
          <Input placeholder='请直接 @姓名／工号，最多可邀请 5 人' />
        </Form.Item>

        <Form.Item label="权重(选填)">
            <InputNumber min={0} max={100} />
            <span>%</span>
        </Form.Item>
       
        <Form.Item name="radio-group" label="目标公开">
            <Radio.Group>
            <Radio value="a">公开</Radio>
            <Radio value="b">部分公开</Radio>
            <Radio value="c">不公开</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item 
           wrapperCol={{ span: 8,offset:7 }}
        >
            客户、邀评人默认被分享
        </Form.Item>

        <Form.Item 
          wrapperCol={{ span: 4,offset:7 }}
        >
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loadings}  
            >
              提交
          </Button>
          <Button htmlType="button">
              保存
          </Button>
        </Form.Item>

      </Form>
    </>
  )
}


export default props=>{
    return(
        <div>
           <div className='basic-header'>
                <h1>基础表单</h1>
                <span>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</span>
           </div>
           <div className='basic-main'>
               {<FormSizeDemo />}
           </div>
        </div>
    )
}