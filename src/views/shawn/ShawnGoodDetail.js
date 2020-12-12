
import { 
  Form, 
  Input, 
  Button, 
  InputNumber,
  Switch,
  Modal
} from 'antd';
import { fetchShawnGood } from '@/utils/api'
import ShawnUpdate from './components/ShawnUpdate'
import ShawnCateSelect from './components/ShawnCateSelect'
import { useState,useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import action from '@/store/actions'


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

  const dispatch = useDispatch()
  let [values, setValues] = useState({})
  const id=props.match.params.id
  const isAdd=id==='0'
  const goodInfo = useSelector(store=>store.list.goodInfo)
  const [flag, setFlag] = useState(false)
  const formChange = values => {
    setValues(values)
  }
  const [form] = Form.useForm();
  

  useEffect(()=>{
    if(!flag) form.setFieldsValue(goodInfo)
    if(goodInfo._id) setFlag(true)
    return undefined
  })

  useEffect(()=>{
    if(!isAdd) dispatch(action.goodDetailAction({id}))
    return ()=>{
      dispatch(action.clearGoodDetailAction())
    }
  }, [])


  const onFinish = (values) => {
    // console.log('values 提交接口', values)
    if(!isAdd) values.id = goodInfo._id
    fetchShawnGood(values).then(()=>{
      // console.log(res)
      props.history.replace('/shawngoodlist')
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <h1>{isAdd ? '商品新增' : '商品编辑'}</h1>
      <hr/>
      <Form
      form={form}
      {...layout}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
      onValuesChange={(val,values)=>formChange(values)}
    >

      <Form.Item
        label="商品名称"
        name="name"
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
       <InputNumber min={0} />
      </Form.Item>


      <Form.Item 
        label="选择品类"
        name="cate"
        // rules={[
        //   { required: true, message: '商品描述是必填!' }
        // ]}
      >
        <ShawnCateSelect/>
      </Form.Item>



      <Form.Item 
        label="上传图片"
        name="img"
        rules={[
          {
            required: true,
            message: 'Please update your img!',
          },
        ]}
      >
        <ShawnUpdate src={values.img||goodInfo.img}/>
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
        { isAdd ? '添加商品' : '确定修改' }
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
} 
