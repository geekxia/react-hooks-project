import React, { useState } from 'react'
import { Form, Input, Select, Button, Upload} from 'antd'
import { UploadOutlined  } from '@ant-design/icons'
const { Option } = Select
const layout = {
  // labelCol: {
  //   span: 8,
  // },
  wrapperCol: {
    span: 20
  },
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

export default props1 => {
  const [fileList, updateFileList] = useState([])
  const props = {
    fileList,
    beforeUpload: file => {
      if (file.type !== 'image/png') {
        message.error(`${file.name} is not a png file`)
      }
      return file.type === 'image/png'
    },
    onChange: info => {
      console.log(info.fileList);
      // file.status is empty when beforeUpload return false
      updateFileList(info.fileList.filter(file => !!file.status))
    },
  }
  function onFinish (value) { console.log(value)}
  // function onResize (size) {
  //   console.log(size)
  // }
  return (
    <div className='baseSetting'>
      <h1>基本设置</h1>
      <div className='baseSetting-left'>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <p>邮箱</p>
          <Form.Item
            name={['user', 'email']}
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <p>昵称</p>
          <Form.Item
            name={['user', 'name']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Basic usage"/>
          </Form.Item>
          <p>个人简介</p>
          <Form.Item name={['user', 'introduction']} >
            <Input.TextArea value='' autoSize={{ minRows: 2, maxRows: 12 }} />
          </Form.Item>
          <p>国家地区</p>
          <Form.Item name={['user', 'country']} >
            <Select placeholder="中国" style={{ width: 120 }}>
              <Option value="china">中国</Option>
            </Select>
          </Form.Item>
            &nbsp;&nbsp;&nbsp;
          <br/>
          <br/>
          <p>所在省市</p>
          <Form.Item name={['user', 'select']} className='select'>
            <Select placeholder="江西" style={{ width: 120 }} allowClear>
              <Option value="江西">江西</Option>
              <Option value="广东">广东</Option>
              <Option value="上海">上海</Option>
              <Option value="北京">北京</Option>
              <Option value="湖北">湖北</Option>
              <Option value="湖南">湖南</Option>
              <Option value="福建">福建</Option>
              <Option value="江南">江南</Option>
              <Option value="山东">山东</Option>
            </Select>
          </Form.Item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Form.Item name={['user', 'select1']} className='select'>
            <Select placeholder="宜春" style={{ width: 120 }} >
              <Option value="宜春">宜春</Option>
              <Option value="南昌">南昌</Option>
              <Option value="深圳">深圳</Option>
              <Option value="广州">广州</Option>
              <Option value="佛山">佛山</Option>
              <Option value="东莞">东莞</Option>
              <Option value="吉安">吉安</Option>
            </Select>
          </Form.Item>
          &nbsp;&nbsp;&nbsp;
          <br/>
          <br/>
          <p>街道地址</p>
          <Form.Item
            name={['user', 'address']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Basic usage"/>
          </Form.Item>
          <p>联系电话</p>
          <Form.Item
            name={['user', 'telephone1']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: 120,marginRight: 20 }} className='num1' placeholder="110" className='select'/>
          </Form.Item>
          <Form.Item
            name={['user', 'telephone2']}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: 120 }} className='num2' placeholder="120" className='select'/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              更新您的信息
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='baseSetting-right'>
          <h3>头像</h3>
          <div>
            <img src='http://localhost:9000/img/1.jpg' />
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload png only</Button>
            </Upload>
          </div>
      </div>
    </div>
  )
}