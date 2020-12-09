import React, { useState } from 'react';
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
  Switch,
} from 'antd';




import { fetchGoodQtp } from '@/utils/api'

import { QuestionCircleOutlined } from '@ant-design/icons';

import CateSelect from './components/CateSelect'
import QtpUpload from './components/QtpUpload'


const { Option } = Select;
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
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 4
    }
  },
};

    

export default props =>{

    let [imageUrl, setImageUrl] = useState('')
    let [values,setValues] = useState({})


    // 获取From的实例
    const [form] = Form.useForm();

    // const formChange = values => {
    //     setValues(values)
    //   }

    // 表单提交
    const onFinish = values => {
        console.log('Received values of form: ', values);
        
        fetchGoodQtp(values).then(()=>{
            // 跳转到页面
            props.history.replace('/qtp/list')
        })
    };


    
    
    
     
    

    return(
        <div>
            <h1>添加商品</h1>
            <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            // initialValues={{
            // residence: ['zhejiang', 'hangzhou', 'xihu'],
            // prefix: '86',
            // }}
            // scrollToFirstError
            // onValuesChange={(val, values)=>formChange(values)}
            >
            <Form.Item
                name="name"
                label="商品名称"
                rules={[
                {
                    required: true,message: '商品名称必填'
                },
                {
                    max: 10,message: '商品名称不能超过10个字'
                },
                {
                    min: 2,message: '商品名称不能少于两个字'
                }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="desc"
                label="商品描述"
                rules={[
                {
                    required: true,message: '商品描述必填'
                },
                {
                    max: 30,message: '商品描述不能超过30个字'
                },
                {
                    min: 2,message: '商品描述不能少于两个字'
                }
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item
                name="price"
                label="商品价格"
                rules={[
                {
                    required: true,message: '商品价格必填'
                }
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>

           
            <Form.Item
                name="cate"
                label="选择品类"
                rules={[
                {
                    required: true,message: '商品品类必选'
                }
                ]}
            >
                <CateSelect />
            </Form.Item>

            <Form.Item
                name="pages"
                label="商品图片"
                rules={[
                {
                    required: true,message: '商品图片必须上传'
                }
                ]}
            >
                <QtpUpload src={values.img} />
                

            </Form.Item>

            
            <Form.Item
                name="hot"
                label="是否热销"
                
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