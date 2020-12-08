import React,{ useState } from 'react'

import img from '@/utils/img'
import {
  QfUploadIcon
} from '@/components'
import {
  fetchGoodOrEdit
} from '@/utils/api'
import CateSelect from './components/CateSelect'

import { 
  Form, 
  Input, 
  Button, 
  InputNumber,
  Select,
  Switch,
  Upload
} from 'antd'
const { TextArea } = Input
const { Option } = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}

export default props => {
  let [imageUrl, setImageUrl] = useState('')
  // 获取表单实例
  const [form] = Form.useForm()
  // 表单提交
  const onFinish = values => {
    values.img = imageUrl
    console.log('提交接口', values);
    fetchGoodOrEdit(values).then(()=>{
      // 跳转到商品列表页
      props.history.replace('/good/list')
    })
  }
  // 图片上传成功
  const imgSuccess = e => {
    console.log('图片上传成功', e)
    if(e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }

  function onChange(value) {
    console.log('changed', value);
  }
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function onChangeswitch(checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <div>
      <h1>商品新增</h1>
      <hr/>
      <div>
        <Form
          style={{margin:"25px 0"}}
          {...layout}          
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              { required: true, message: '请输入商品名称!' },
              { max: 10, message: '商品名称不能超过10个字符' },
              { min: 2, message: '商品名称不能少于两个字符' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              { required: true, message: '请输入商品描述!' },
              { min: 4, message: '商品名称不能少于四个字符' }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: '请输入商品价格!' }]}
          >
            <InputNumber min={1} onChange={onChange} />
          </Form.Item>

          <Form.Item
            label="商品品类"
            name="cate"
            rules={[{ required: true, message: '请选择商品品类!' }]}
          >
            <CateSelect/>
          </Form.Item>    

          <Form.Item
            label="商品图片"
          >
            <Upload
              name="file"
              action={img.uploadUrl}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              onChange={imgSuccess}
            >
              {
                imageUrl ?
                <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
                : <QfUploadIcon />
              }
            </Upload>
          </Form.Item> 

          <Form.Item
            label="是否热销"
            name="hot"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>             

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}