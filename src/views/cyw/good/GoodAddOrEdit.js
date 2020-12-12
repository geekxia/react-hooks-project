import React, { useState, useEffect }  from 'react'
import {
    Form,
    Input,
    Button,
    InputNumber,
    Switch 
} from 'antd'

import { fetchGoodOrEdit } from '@/utils/api'
import action from '@/store/actions'
import CateSelect from '../components/CateSelect'
import GoodUpdate from '../components/GoodUpdate'
import { useDispatch, useSelector } from 'react-redux'

const formItemLayout = {
    labelCol: { sm: { span: 4 } },
    wrapperCol: { sm: { span: 10 } }
}
const tailFormItemLayout = {
    wrapperCol: {
        sm: {
            span: 16,
            offset: 4
        }
    }
}

export default props => {  
    // 获取From的实例
    const [form] = Form.useForm()
    let [values, setValues] = useState({})
    const [flag,setFlag] = useState(false)
    const dispatch = useDispatch()
    // 判断是新增还是编辑
    // console.log('------props', props)
    const id = props.match.params.id
    const isAdd = id === '0'

    const goodInfo = useSelector(store=>store.good.goodInfo)
    useEffect(() => {
        // 给表单赋初始值
        if (!flag) form.setFieldsValue(goodInfo)
        // 解决当前useEffect一直运行的问题
        if(goodInfo._id) setFlag(true)
        return undefined
    })

    useEffect(() => {
        if(!isAdd) dispatch(action.getGoodDetail({id}))
        // 当前组件被销毁前，清空redux中的缓存数据
        return () => {
            dispatch(action.clearGoodDetail())
        }
    }, [])

    // 当form表单值发生变化的时候，我们手动取值，赋值给声明式变量 values
    const formChange = values => {
        console.log('----------',values)
        setValues(values)
    }

    const onFinish = values => {
        if(!isAdd) values.id = goodInfo._id
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/good/list')
        })
    }

    return (
        <div>
            <h1>商品新增与编辑</h1>
            <hr />
            <div>
                 <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    onValuesChange={(val, values)=>formChange(values)}
                >
                    <Form.Item
                        style={{margin: '20px 0'}}
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                max: 10, message: '商品名称不能超过10个字',
                                min: 1, message: '商品名称不能小于1个字'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[{ required: true, message: '商品价格是必写的' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            { required: true, message: '商品描述是必填项' },
                            { max: 60, message: '商品描述不能超过60个字' },
                            { min: 10, message: '商品描述不能小于10个字' }                           
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea />
                    </Form.Item>
                
                    <Form.Item
                        name="cate"
                        label="选择品类"
                        rules={[
                            {  required: true, message: '请选择商品品类' },
                        ]}
                    >
                        <CateSelect />
                    </Form.Item>

                    <Form.Item
                        name='img'
                        label='商品图片'
                        rules={[
                            {required:true, message:'商品图片是必填项！'}
                        ]}
                    >
                        <GoodUpdate src={ values.img || goodInfo.img}/>
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
        </div>
    )
}