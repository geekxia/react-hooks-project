import { useState,useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import CateSelect from '../components/CateSelect'
import GoodUpload from '../components/GoodUpload'
import { fetchGoodOrEdit } from '@/utils/api'
import action from '@/store/actions'


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

const { Option } = Select
const { TextArea } = Input

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

  let [values, setValues] = useState({})
  const dispatch = useDispatch()


  const id = props.match.params.id
  const isAdd = id === '0'
  const goodInfo = useSelector(store=>store.good.goodInfo)
  // console.log('gooodInfo',goodInfo)

  const formChange = values => {
    setValues(values)
  }

  //核心代码
  const [flag, setFlag] = useState(false) // 是否已经填充表单
  const [form] = Form.useForm() // 获取Form的实例
  useEffect(()=>{
    // 给表单赋初始值
    if(!flag) form.setFieldsValue(goodInfo)
    // 解决当前useEffect反复运行的问题
    if(goodInfo._id) setFlag(true)
    return undefined
  })

  useEffect(()=>{
    // 当是编辑时，触发action调接口获取商品详情
    if(!isAdd) dispatch(action.getGoodDetail({id}))
    return undefined
  }, [])


  // 表单提交
  const onFinish = () => {
    console.log('values 提交接口', values)
    if(!isAdd) values.id = goodInfo._id
    fetchGoodOrEdit(values).then(()=>{
      // 跳转到列表页
      props.history.replace('/zhappy/display')
    })
  }

  return(
    <div>
      <h1><b>{isAdd?'商品新增':'商品编辑'}</b></h1>
      <hr/>
      <Form
        style={{margin:'25px 0'}}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
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
          <Input style={{ width: 400 }}/>
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            { required: true, message: '商品价格是必填!',}
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        {/* <Form.Item
          name="num"
          label="库存"
          rules={[
            { required: true, message: '库存是必填!',}
          ]}
        >
          <InputNumber min={0} />
        </Form.Item> */}
        
        <Form.Item
          name="cate"
          label="选择品类"
          rules={[
            { required: true, message: '商品描述是必填!' }
          ]}
        >
          <CateSelect />
        </Form.Item>
        
        <Form.Item
          name="desc"
          label="商品描述"
          rules={[
            { required: true, message: '商品描述是必填!',},
            { max: 30, message: '商品描述不能超过30个字' },
            { min: 2, message: '商品描述不能少于10个字' }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name='img'
          label='商品图片'
          rules={[
            { required: true, message: '商品图片是必填!' }
          ]}
        >
          <GoodUpload src={values.img||goodInfo.img} />
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
            {isAdd?'提交':'提交修改'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
