import React, { useState,useEffect } from 'react';
import GoodUpload from './components/GoodUpload'
import img from '@/utils/img'
import api from '@/utils/api'
import {
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Upload,
  Switch
} from 'antd';
import CatesSelect from './components/CatesSelect'
import { useDispatch,useSelector } from 'react-redux'
import action from '@/store/actions'

const { Option } = Select;
const { TextArea } = Input;



const formItemLayout = {
  labelCol: {
    sm: { span: 3 },
  },
  wrapperCol: {
    sm: { span: 9 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 3,
    },
  },
};

export default props=>{
        let [values, setValues] = useState({})
        let [loading,setLoading] = useState(false)
        let [imageUrl,setImageUrl] = useState('')
        const [form] = Form.useForm();
        const dispatch = useDispatch()
        const goodDetail = useSelector(store=>store.good.goodDetail)
        const id = props.match.params.id
        const isEdit = id==0 ? false:true
        let [ flag, setFlag] = useState(false)
      
        const onFinish = values => {
            if(isEdit) values.id=id
        //   console.log('Received values of form: ', values);
          api.fetchAddGood(values).then(res=>{
            props.history.replace('/good/list')
          })
        };

        

        // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
        const formChange = values => {
            setValues(values)
        }

        useEffect(()=>{
            if(isEdit){
                dispatch(action.initGoodEdit({id}))
            }
            return undefined
        },[])

        useEffect(()=>{
            if(!flag) form.setFieldsValue(goodDetail)
            if(goodDetail._id) setFlag(true)
            // console.log(goodDetail)
            
            return undefined
        })


    return (
        <div>
            <h1>添加商品</h1>
            <Form
                {...formItemLayout}
                form={form}
                name="good"
                onFinish={onFinish}
                scrollToFirstError
                onValuesChange={(val, values)=>formChange(values)}
            >
                <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[
                    { required: true, message: '请输入商品名称' },
                    { min:2, message:'商品名称不能少于两个字！' },
                    { max:10, message:'商品名称不能超过10个字' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cate"
                    label='商品类别'
                    rules={[
                        { required:true, message:'请选择商品类别！'}
                    ]}
                >
                    <CatesSelect />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='商品价格'
                    rules={[
                        { required:true, message:'请输入商品价格！' }
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label='商品描述'
                    rules={[
                        { required:true, message:'请输入商品描述！'},
                        { min:10, message:'商品名称不能少于10个字！' },
                        { max:30, message:'商品名称不能超过30个字' }
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    name='img'
                    label='商品图片'
                    rules={[
                        { required:true}
                    ]}
                >
                    <GoodUpload src={values.img||goodDetail.img} />
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