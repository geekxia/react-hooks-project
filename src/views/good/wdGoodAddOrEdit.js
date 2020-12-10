import { useState,useEffect} from 'react';
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
import { useDispatch,useSelector } from 'react-redux';
import {gooddetailAction,cleardetailAction} from '@/store/actions'
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
    const dispatch=useDispatch()
    const goodInfo=useSelector(store=>store.good.goodInfo)
    console.log('goodInfo',goodInfo)
    let [imageUrl,setimageUrl]=useState('')
    let [values,setValues]=useState({})
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const id=props.match.params.id
    const isAdd=id==='0'
    const [flag,setFlag]=useState(false)
    const formChange=(val,values)=>{
        console.log('val values',val,values)
    }
    //表单提交
    const onFinish = values => {
        console.log('values',values)
        if(!isAdd)values.id=goodInfo._id
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace('/good/list')
        })
        dispatch(cleardetailAction())
    }; 
    //编辑
    useEffect(()=>{

        if(!isAdd) dispatch(gooddetailAction({id}))
        return undefined
    },[])
    useEffect(()=>{
        if(!flag)form.setFieldsValue(goodInfo)
        if(goodInfo._id)setFlag(true)
        return undefined
    })
    // console.log('props',props)
  // 获取Form的实例
    const [form] = Form.useForm();
    return(
        <div>
            <h1>{isAdd?'增加商品':'编辑商品'}</h1>
            
            <Form
            style={{margin:'25px 0'}}
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            onValuesChange={(val,values)=>{
                formChange(values)
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
            name='img'
            label='商品图片'
            rules={[
                { required: true, message: '商品图片是必填!' }
            ]}
            >
            <UpdateImg src={values.img||goodInfo.img} />
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
                {isAdd?'提交商品信息':'修改商品信息'}
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}