import React, { useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {
  Form,
  Input,
  Select,
  Button,
  Upload, 
  message,
  InputNumber,
  Switch
} from 'antd';

import{
    UploadIcon
} from '@/components'

import action from '@/store/actions'

import CateSelect from './components/CateSelect'
import ShopUpload from './components/ShopUpload'

import img from '@/utils/img'
import { fetchShopOrEdit } from '@/utils/api'

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    sm: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    }
  }
}

export default props =>{
    const dispatch = useDispatch()
    let [values,setValues] = useState({})
    let [imageUrl,setImageUrl] = useState('')
        //获取Form的实例
    const [form] = Form.useForm()

    // 用于判断是新增，还是编辑
    const id = props.match.params.id
    const isAdd = id === '0'
    console.log('-----',isAdd)
    const shopInfo = useSelector(store=>store.shop.shopInfo)

    // 是否已经填充表单
    const [flag,setFlag] = useState(false)
    
    useEffect(()=>{
        //给表单赋初始值
        if(!flag) form.setFieldsValue(shopInfo)
        // 解决当前useEffect反复运行的问题
        if(shopInfo._id) setFlag(true)
        return undefined
    })

    useEffect(()=>{
        // 当时编辑时，触发action调接口湖区商品详情
        if(!isAdd) dispatch(action.getShopDetail({id}))
        return ()=>{
            //当前组件被销毁前，清空redux中的缓存数据
            dispatch(action.clearShopDetail())
        }
    },[])

    // 表单提交的信息
    const onFinish = (values) => {
        values.img = imageUrl
        console.log('values提交接口', values)
        if(!isAdd) values.id = shopInfo._id
        fetchShopOrEdit(values).then(()=>{
            //跳转到列表页
            props.history.replace('/shop/list')
        })
    }

    return( 
        <div>
            <div>
                <h1>商品新增</h1>
                <span>字段</span>
            </div>
            <div>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    >
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[
                        { required: true,message: '请输入商品名称!' },
                        { max:10,message:'商品名称不能超过10个字符' },
                        { min:2,message:'商品名称不能少于2个字符' }  
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                        { required: true,message: '请输入商品描述!' },
                        { max:30,message:'商品名称不能超过30个字符' },
                        { min:10,message:'商品名称不能少于10个字符' }  
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        name="cate"
                        label="选择品类"
                        rules={[
                            { required: true, message: '请选择商品品类!' }
                        ]}
                        >
                        {/* 凡是被Form.Item包裹的表单组件，相当于都给表单传递了一个onChange事件 */}
                         <CateSelect />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            { required: true, message: '请输入商品价格!',}
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>

                    <Form.Item
                        label="img"
                        rules={[
                        { required: true,message: '请上传图片!' }
                        ]}
                    >
                        <ShopUpload src={values.img||shopInfo.img} />
                    </Form.Item>

                    <Form.Item
                        name="hot"
                        label="热销产品"
                        valuePropName='checked'
                    >
                        <Switch  />
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                        {
                            isAdd?'添加商品':'确认修改'
                        }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
  
}