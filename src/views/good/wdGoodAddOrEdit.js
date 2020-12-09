import { useState } from 'react';
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
    Switch,
    Upload, 
    message,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import {WdUpdate} from '@/components'
import UpdateImg from './components/UpdateImg'
import img from '@/utils/img'
import {fetchGoodOrEdit} from '@/utils/api'
import CatesSelect from './components/CatesSelect'
const { Option } = Select;
const {TextArea}=Input
const AutoCompleteOption = AutoComplete.Option;


    
const formItemLayout = {
    labelCol: {
    sm: { span: 4 },
    },
    wrapperCol: {
    sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
    sm: {
        span: 16,
        offset: 4,
    },
    },
};
    



    
    



export default props => {
    let [imageUrl,setimageUrl]=useState('')
    let [values,setValues]=useState({})
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    
    const formChange=(val,values)=>{
        console.log('val values',val,values)
    }
    //表单提交
    const onFinish = values => {
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace('/good/list')
        })
    };
  // 获取Form的实例
    const [form] = Form.useForm();
    return(
        <div>
            <h1>增加商品</h1>
            
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
            onValuesChange={(val,values)=>{
                formChange(val,values)
                setValues(values)
            }}
            >
            <Form.Item
                name="name"
                label="商品名称"
                rules={[
                {
                    required: true,
                    message: '商品名称必填!',
                },
                {
                    max:10,
                    message:'商品名称不能超过10个字'
                },
                {
                    min:2,
                    message:'商品名称不能小于2个字'
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="desc"
                label="商品描述"
                rules={[
                {
                    required: true,
                    message: '商品描述必填!',
                },
                {
                    max:50,
                    message:'商品描述不能超过50个字'
                },
                {
                    min:10,
                    message:'商品描述不能小于10个字'
                },
                ]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item
                name="cate"
                label="选择品类"
                rules={[
                {
                    required: true,
                    message: '品类是必选的!',
                },
                ]}
            >
                <CatesSelect />
            </Form.Item>
            
            <Form.Item
                name="price"
                label="商品价格"
                rules={[
                {
                    required: true,
                    message: '商品描述必填!',
                },
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>
            
            <Form.Item
            name='hot'
            label='是否热销'
            >
                <Switch />
            </Form.Item>

            <Form.Item
            name='img'
            label='商品图片'
            rules={[
                { required: true, message: '商品图片是必填!' }
            ]}
            >
            <UpdateImg src={values.img} />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                提交商品信息
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}