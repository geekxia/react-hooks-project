import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoodUpload from './components/GoodUpload'
import { fetchGoodOrEdit } from '@/utils/api'
import CateSelect from './components/CateSelect'
import actions from '@/store/actions'

import { 
  Form, 
  Input, 
  Button, 
  InputNumber,
  Switch,
} from 'antd'
const { TextArea } = Input

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
}


export default props => {  
  const dispatch = useDispatch()
  let [values, setValues] = useState({})
  
  // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
  const formChange = values => {
    setValues(values)
    console.log('values',values)
  }

  const id = props.match.params.id
  const isAdd = id === '0'
  const goodInfo = useSelector(store=>store.good.goodInfo)
    
  let [flag, setFlag] = useState(false)  
  const [form] = Form.useForm() // 获取表单实例
  
  useEffect(()=>{
    // 判断是编辑还是新增
    if(!isAdd) dispatch(actions.goodDetailAction({id}))
    return ()=>{
      // 当前组件被销毁前，清空redux中的缓存数据,走actions.js、goods.js
      dispatch(actions.clearGoodDetail())
    }
  }, [])
  useEffect(()=>{
    // 给表单赋初始值
    if(!flag) form.setFieldsValue(goodInfo)
    // 解决当前useEffect反复运行的问题
    if(goodInfo._id) setFlag(true)
    return undefined
  })

  // 表单提交
  const onFinish = values => {
    console.log('提交接口', values);
    if(!isAdd) values.id = goodInfo._id
    fetchGoodOrEdit(values).then(()=>{
      // 跳转到商品列表页
      props.history.replace('/good/list')
    })
  }
  
  // 商品价格变化
  function onChange(value) {
    console.log('changed', value);
  }

  return (
    <div>
      <h1>{isAdd? '商品新增' : '商品编辑'}</h1>
      <hr/>
      <div>
        <Form
          style={{margin:"25px 0"}}
          {...layout}          
          form={form}
          name="basic"
          onFinish={onFinish}
          scrollToFirstError
          onValuesChange={(val, values)=>formChange(values)}
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
            name="img"
            rules={[
              { required: true, message: '商品图片是必填!' }
            ]}
          >
            <GoodUpload src={values.img||goodInfo.img}/>
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
              { isAdd? '确认提交' : '确认修改' }
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}