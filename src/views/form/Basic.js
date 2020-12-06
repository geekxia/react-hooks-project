
// ReactDOM.render(<Input placeholder="Basic usage" />, mountNode);


import React, { useState } from 'react';

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  Space,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';


const { TextArea } = Input;

const { RangePicker } = DatePicker;

const FormSizeDemo = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        labelAlign='center'
      >
        <Form.Item label="标题">
          <Input placeholder='给目标起个名字' />
        </Form.Item>

        <Form.Item label="起止日期">
            <Space direction="vertical" size={12}>
                <RangePicker />
            </Space>
        </Form.Item>

        <Form.Item  label="目标描述">
            <TextArea rows={4} placeholder='请输入你的阶段性工作目标' />
        </Form.Item>

        <Form.Item  label="衡量标准">
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

        <Form.Item >
            客户、邀评人默认被分享
        </Form.Item>

        <Form.Item  labelCol={{ offset: 10} } >
            <Button htmlType="submit" type="primary" placeholder='提交'>
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