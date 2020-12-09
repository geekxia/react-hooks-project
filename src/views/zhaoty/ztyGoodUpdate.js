import React, { useState,useEffect } from 'react';

import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Switch
} from 'antd';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import myImg from '@/utils/zhaoty/img'
import {goodUpdate} from '@/utils/zhaoty/api'
import {useDispatch,useSelector} from 'react-redux'
import action from '@/store/actions'

import SelectCate from './components/cateSelect'

const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

export default props => {
  const dispatch = useDispatch()
  let goodDetail = useSelector(store=>store.ztyGood.goodDetail)
  let [values,setValues]=useState({})
  console.log('goodDetail' ,goodDetail)
  const [form] = Form.useForm();
  const [imageUrl,setImageUrl]=useState('')
  const urlId = props.match.params.id
  const isAdd = (urlId==0)
  
  const onFinish = values => {
    values.img  = imageUrl
    if(!isAdd){
      values.id=goodDetail._id
    }
    goodUpdate(values).then(res=>{
      console.log('..........',values)
      props.history.replace('/zhao/good/list')
    })

  };
  const formChange=values=>{
    setValues(values)
    console.log('formChange----',values)
  }
  const { loading } = props;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  const imgSuccess=(e)=>{
      if(e.file && e.file.response && e.file.response.data){
          setImageUrl(e.file.response.data.url)
      }
  }
  useEffect(()=>{
     if(!isAdd){//编辑数据
      dispatch(action.ztyGetGoodDetail({id:urlId}))
     }
    return undefined
  },[])
  useEffect(()=>{
    form.setFieldsValue(goodDetail)
    console.log('--=-=-=-=-==-=')
    return undefined
  })
  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onValuesChange={(val,values)=>formChange(values)}
     
    >
      <Form.Item
        name="name"
        label="商品名称"
        rules={[ 
            { required: true,message: '商品名称是必填的'},
            {max:10 , message:'不得超过10字符'},
            {min: 2 , message:'不得少于2字符'}
        ]}
      >
        <Input placeholder='输入商品名称'/>
      </Form.Item>
      <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          { required: true,message: '商品描述是必填的'},
          {max:30 , message:'不得超过30字符'},
          {min: 6 , message:'不得少于6字符'}
        ]}
      >
        <TextArea rows={4} placeholder='输入商品描述' />
      </Form.Item>
      <Form.Item 
        name='price'
        label='商品价格'
      >
      <InputNumber min={0}  />
      </Form.Item>

      <Form.Item 
        name='cate'
        label='选择品类'
      >
        <SelectCate 
        allowClear 
        />
      </Form.Item>
      <Form.Item
       name='img'
       label='商品图片'
      >
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={myImg.uploadUrl}
        onChange={imgSuccess}
      >
        {imageUrl ? <img src={myImg.baseUrl+imageUrl} 
        alt="avatar" 
        style={{ width: '100%' }} /> : uploadButton}
      </Upload>
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
            {isAdd?'添加商品':'编辑完成'}
        </Button>
      </Form.Item>
    </Form>
  );
};















