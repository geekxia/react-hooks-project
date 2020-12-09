import {
    Form,
    InputNumber,
    Switch,
    Input,
    Button,
} from 'antd';

import TtUpload from './ttcomponents/TtUpload'

import { fetchGoodOrEdit } from '@/utils/api'

import GoodCates from './ttcomponents/GoodCates'

import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import action from '@/store/actions' 

const formItemLayout = {
    labelCol: {
        sm:  { span: 4 }
    },
    wrapperCol: {
        sm:  { span: 10 }
    },
};  

const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 4,
      },
    }
}

export default props=>{

    const dispatch = useDispatch()
    const { TextArea } = Input;

    // 获取Form的实例
    const [form] = Form.useForm()

    let [values, setValues] = useState({})

    const id = props.match.params.id

    const isAdd = id==='0'
    // console.log('------isAdd', isAdd);

    const goodInfo = useSelector(store=>store.ttGood.goodInfo)

    // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
    const formChange = values => {
        setValues(values)
    }

    const [flag, setFlag] = useState(false) // 是否已经填充表单
    useEffect(()=>{
        if(!flag) form.setFieldsValue(goodInfo)  // 给表单赋初始值
        if(goodInfo._id) setFlag(true)  // 解决当前useEffect反复运行的问题
        return undefined
    })


    useEffect(()=>{
        // 当是编辑时，触发action调接口获取商品详情
        if(!isAdd) dispatch(action.getGoodDetailAction({id}))
        return ()=>(
            // 当前组件被销毁前，清空redux中的缓存数据
            dispatch(action.clearGoodDetailAction())
        )
    },[])


    // 表单提交
    const onFinish = () => {
        // console.log('提交成功 ', values);
        if(!isAdd) values.id = goodInfo._id
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/ttgood')
        })
    };
    
    return (
        <div>
            <h1>{isAdd?'商品新增':'商品编辑'} </h1>
            <Form
                style={{margin: '25px 0'}}
                name="validate_other"
                form={form}
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    ['input-number']: 1
                }}
                onValuesChange={(val, values)=>formChange(values)}
            >
                <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[
                        { required: true, message: '商品名称是必填'},
                        { max: 20, message: '商品名称不能超过20个字'},
                        { min: 2, message: '商品名称不能少于两个字'}
                    ]}    
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                        { required: true, message: '商品描述是必填'},
                        { max: 50, message: '商品名称不能超过50个字'},
                        { min: 2, message: '商品名称不能少于两个字'}
                    ]}    
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item 
                    label="商品价格" 
                    name="price" 
                    rules={[
                        { required: true, message: '商品价格是必填'}
                    ]}
                >
                    <InputNumber min={0} />
                    {/* <span className="ant-form-text"> 元</span> */}
                </Form.Item>

                <Form.Item 
                    label="商品数量" 
                    name="input-number"
                    rules={[
                        { required: true, message: '商品数量是必填'}
                    ]}
                >
                    <InputNumber min={1} max={100000} />
                    {/* <span className="ant-form-text">件</span> */}
                </Form.Item>

                <Form.Item
                    name="cate"
                    label="选择品类"
                    rules={[{ required: true, message: '商品描述是必填!' }]}
                >
                    <GoodCates />
                </Form.Item>

                <Form.Item name="hot" label="是否热销" valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item 
                    name='img'
                    label="商品图片"
                    rules={[
                        {required: true, message: '商品图片是必填!'}
                    ]}    
                >
                    <TtUpload src={values.img || goodInfo.img } />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {isAdd?'添加商品':'确定修改'}
                    </Button>
                </Form.Item>
            </Form>
            
        </div>
    )
}