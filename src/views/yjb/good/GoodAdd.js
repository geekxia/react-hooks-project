import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Upload,
  message,
  Switch,
} from 'antd';

import {LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {fetchYjbGood} from '@/utils/api'

const {Option} =Select

import img from '@/utils/img'

export default props=>{

const [componentSize, setComponentSize] = useState('default');
const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
};

let [imageUrl, setImageUrl] = useState('')

const imgSuccess = e => {
    console.log('图片上传成功', e)
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }

  const onFinish = values => {
    values.img = imageUrl
    console.log('values 提交接口', values)
    fetchYjbGood(values).then(()=>{
      // 跳转到列表页
      props.history.replace('/bolist')
    })
  } 
    return(
        <div className="YJBAdd">
            <h1>商品新增</h1>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onFinish={onFinish}
            >
                <Form.Item label="表单大小" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">偏小</Radio.Button>
                        <Radio.Button value="default">默认</Radio.Button>
                        <Radio.Button value="large">偏大</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item 
                label="商品名称"
                name="name"
                rules={[
                    { required: true, message: '商品名称是必填!'},
                    { max: 10, message: '商品名称不能超过10个字' },
                    { min: 2, message: '商品名称不能少于两个字' }
                ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item 
                label="商品描述"
                name="desc"
                rules={[
                    { required: true, message: '商品描述是必填!'},
                    { min: 10, message: '商品名称不能少于10个字' }
                ]}
                >
                    <Input.TextArea rows={4}/>
                </Form.Item>

                <Form.Item label="日历">
                    <DatePicker />
                </Form.Item>

                <Form.Item
                name="cate"
                label="选择品类"
                rules={[
                    { required: true, message: '商品描述是必填!' }
                ]}
                >
                    <Select
                        style={{ width: 200 }}
                        placeholder="选择一个品类"
                    >
                        <Option key='1' value="pat">宠物</Option>
                        <Option key='2' value="car">汽车</Option>
                        <Option key='3' value="elec">电器</Option>
                    </Select>
                </Form.Item>


                <Form.Item label="商品价格">
                    <InputNumber />
                </Form.Item>

                <Form.Item
                label='商品图片'
                rules={[
                    { required: true, message: '商品图片是必填!' }
                ]}
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
                        : <PlusOutlined />
                        }
                    </Upload>
                </Form.Item>
                
                <Form.Item label="是否热销">
                    <Switch />
                </Form.Item>

                <Form.Item label="Button" >
                    <Button htmlType="submit">提交</Button>
                </Form.Item>
            
            </Form>
        </div>
    )
}