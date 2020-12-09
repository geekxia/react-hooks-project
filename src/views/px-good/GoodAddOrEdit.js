import React,{ useState,useEffect } from 'react'

import { 
    Form, 
    Input, 
    Button, 
    InputNumber,
    Switch,
} from 'antd';

import {fetchGoodAddOrEdit} from "@/utils/api"

import Selector from "./components/common/selector"
import Uploader from "./components/common/Uploader"

import { useSelector,useDispatch } from "react-redux";

import actions from "@/store/actions"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};

export default props=>{
    let [imageUrl,setImageUrl] = useState('')
    const [form] = Form.useForm();
    const id = props.match.params.id
    const isAdd = id==='0'

    const onFinish = values => {
        console.log('第一次提交的values',values);
        if(id==0){
            values.img=imageUrl
        }else{
            values.id=id
        }
        console.log(values);
        fetchGoodAddOrEdit(values).then((res)=>{
            props.history.replace('/panxi/good/list')
        })
    };
    const goodInfo = useSelector(store=>store.good.goodInfo)
    const dispatch = useDispatch()

    // 此时派发一次goodinfo，无法获取到异步的goodinfo
    useEffect(()=>{
        if(!isAdd) dispatch(actions.getGoodDetail({id}))
        return ()=>{
            dispatch(actions.clearGoodDetail())
        }
    },[])
    // 判断表单是否填充
    let [flag,setFlag]=useState(false)
    useEffect(()=>{
        // console.log('goodinfo',goodInfo);
        if(!flag){
            form.setFieldsValue(goodInfo)
        }
        if(goodInfo._id){
            setFlag(true)
        }
        return undefined
    })

    return (
        <div className='px-goodAddOrEdit'>
            <h1>潘曦-商品新增</h1>
            <hr/>
            <Form
                {...layout}
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品名称!' 
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品描述!' 
                    }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[{ 
                        required: true, 
                        message: '请输入商品描述!' 
                    }]}
                >
                    <InputNumber 
                        min={5} 
                    />
                </Form.Item>

                <Form.Item
                    label="商品类型"
                    name="cate"
                    rules={[{ 
                        required: true, 
                        message: '请选择商品类型!' 
                    }]}
                >
                    <Selector />
                </Form.Item>

                <Form.Item
                    label="是否热销"
                    name="hot"
                    valuePropName='checked'
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="商品图片"
                    name="img"
                >
                    <Uploader 
                        onChange={(src)=>setImageUrl(src)}
                        src={imageUrl}
                    >
                    </Uploader>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}