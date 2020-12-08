import {useState} from 'react'

import { 
  Menu,
  Row,
  Col,
  Form, 
  Input, 
  InputNumber, 
  Button,
  Avatar,
  Upload, 
  message,
  Select
} from 'antd';


import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  QfUploadIcon
} from '@/components'
import img from '@/utils/img'


const { Option } = Select;
function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}



export default props=>{
  let [imageUrl,setImageUrl]=useState('')
  const [from]=Form.useForm()

  const imgSuccess=e=>{
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }

  const onFinish = values => {
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
  )
  

  return(
    <div className="qf-userset">
      <div className="qf-userset-aside">
        <Menu
          mode="inline"
        >
            <Menu.ItemGroup key="g1" >
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
      </div>
      <div className="qf-userset-main">
        <div className="qf-userset-main-left">
          <Row><h3>基本设置</h3></Row>
          <Form  name="nest-messages" onFinish={onFinish} >
            <Row><h4>邮箱</h4></Row>
            <Form.Item name={['user', 'email']}  rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Row><h4>呢称</h4></Row>
            <Form.Item name={['user', 'name']}  rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Row><h4>个人简介</h4></Row>
            <Form.Item name={['user', 'introduction']} >
              <Input.TextArea />
            </Form.Item>
            <Row><h4>您的电话</h4></Row>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
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
            <Row><h4>您的地址</h4></Row>
            <Form.Item
              name="map"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input  style={{ width: '100%' }} />
            </Form.Item>
            <Row><h4>选择你所在的省市</h4></Row>
            <Form.Item
              name="sheng"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择省市"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>
            </Form.Item>
            
            <Form.Item >
              <Button type="primary" htmlType="submit" >
                更新信息
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="qf-userset-main-right">
          <Row><h3>头像</h3></Row>
          <Avatar
            size={{
              xs: 24,
              sm: 32,
              md: 40,
              lg: 64,
              xl: 80,
              xxl: 100,
            }}
            src=""
          />
          <Upload
          name="file"
          listType="picture-card"
          className="avatar-uploader"
          action={img.uploadUrl}
          showUploadList={false}
          onChange={imgSuccess}
        >
          {
              imageUrl ?
              <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
              : <QfUploadIcon />
            }
        </Upload>
        </div>
      </div>
    </div>
  )
}
