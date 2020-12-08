import { useState } from 'react'

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
  InputNumber,
  Upload,
  Switch
} from 'antd'

import { AddGoods } from '@/utils/api'

import CateSelect from './components/CateSelect'
import GoodUpload from './components/GoodUpload'

import { QuestionCircleOutlined } from '@ant-design/icons';
const { Option } = Select
const { TextArea } = Input
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 4,
    },
  }
}

export default props => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([])
  let [imageUrl, setImageUrl] = useState('')
  let [values, setValues] = useState({})

  // 获取Form的实例
  const [form] = Form.useForm()

  // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
  const formChange = values => {
    setValues(values)
  }

  // 表单提交
  const onFinish = () => {
    console.log('values 提交接口', values)
    fetchGoodOrEdit(values).then(()=>{
      // 跳转到列表页
      props.history.replace('/good/list')
    })
  }

  return(
    <div>
      <h1>商品新增</h1>
      <Form
        style={{margin:'25px 0'}}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
        onValuesChange={(val, values)=>formChange(values)}
      >
        <Form.Item
          name="name"
          label="商品名称"
          rules={[
            { required: true, message: '商品名称是必填!',},
            { max: 10, message: '商品名称不能超过10个字' },
            { min: 2, message: '商品名称不能少于两个字' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="商品描述"
          rules={[
            { required: true, message: '商品描述是必填!',},
            { max: 30, message: '商品描述不能超过10个字' },
            { min: 10, message: '商品描述不能少于两个字' }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            { required: true, message: '商品描述是必填!',}
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="cate"
          label="选择品类"
          rules={[
            { required: true, message: '商品描述是必填!' }
          ]}
        >
          <CateSelect />
        </Form.Item>
        {/* 凡是被 Form.Item 包裹的表单组件，相当于都给表单传递了一个 onChange 事件 */}
        <Form.Item
          name='img'
          label='商品图片'
          rules={[
            { required: true, message: '商品图片是必填!' }
          ]}
        >
          <GoodUpload src={values.img} />
        </Form.Item>

        <Form.Item
          name='hot'
          label='是否热销'
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
