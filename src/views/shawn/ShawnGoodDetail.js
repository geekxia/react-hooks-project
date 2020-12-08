
import { 
  Form, 
  Input, 
  Button, 
  Upload, 
  message,
  InputNumber,
  Switch,
  Select 
} from 'antd';
const { Option } = Select;
import ShawnUpdate from './components/ShawnUpdate'
import { useState } from 'react'
import { fetchShawnGood } from '@/utils/api'

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 12,
  },
};


export default props => {

  let [values, setValues] = useState({})
  const [form] = Form.useForm()

  const formChange = values => {
    setValues(values)
  }

  const onFinish = (values) => {
    console.log('Success:', values);
    fetchShawnGood(values).then(()=>{
      console.log('===============')
      // props.history.replace('/good/list')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <h1>gooddetail</h1>
      <hr/>
      <Form
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >

      <Form.Item
        label="商品名称"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          {
            max: 10,
            message: 'text.lengh cant more than ten!',
          },
          {
            min: 2,
            message: 'text.lengh cant less than two!',
          }
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        label="商品描述"
        name="desc"
        rules={[
          {
            required: true,
            message: 'Please input your desc!',
          },
          {
            max: 50,
            message: 'text.lengh cant more than ten!',
          },
          {
            min: 5,
            message: 'text.lengh cant less than two!',
          }
        ]}
      >
        <Input.TextArea rows={4}/>
      </Form.Item>


      <Form.Item
        label="商品价格"
        name="price"
        rules={[
          {
            required: true,
            message: 'Please input your price!',
          },
        ]}
      >
       <InputNumber min={0} initialValues={0}  />
      </Form.Item>


      <Form.Item 
        label="选择品类"
        name="cate"
        rules={[
          { required: true, message: '商品描述是必填!' }
        ]}
      >
        <Select placeholder='请选择一个品类' style={{ width: 150 }} allowClear>
          <Option value="lucy">Lucy</Option>
          <Option value="jack">jack</Option>
        </Select>
      </Form.Item>


      <Form.Item 
        label="上传图片"
        name="img"
        // rules={[
        //   {
        //     required: true,
        //     message: 'Please update your img!',
        //   },
        // ]}
      >
        <ShawnUpdate src={values.img}/>
      </Form.Item>


      <Form.Item 
        label="是否热销"
        name="hot"
        valuePropName='checked'
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
  )
} 
