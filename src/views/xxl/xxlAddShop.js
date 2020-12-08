import React,{useState} from "react"
import { useSelector,useDispatch} from 'react-redux'
import { 
    Form, 
    Input, 
    InputNumber, 
    Button,
    Switch
} from "antd"
import CateSelect from "./components/cateSelect"
import UploadPic from './components/uploadPic'
import api from "@/utils/api"


export default props=>{
    
    let shopDate = useSelector(store=>(store.xxlgetshop.shopDate))
    let [values,setValues] = useState("")
    const [form] =Form.useForm()
    const layout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        },
    }   
    const tailFormItemLayout = {
        wrapperCol: {
          sm: {
            span: 16,
            offset: 4,
          },
        }
    }
    const formChange = values =>{
        setValues(values)
    }
    const onFinish = (values) => {
        //提交成功
        console.log(values)
        api.pushshop(values).then(()=>{
            props.history.replace("/xxlshop")
        })

    }
    console.log("商品id----------",props.match.params.id)
    console.log("商品数据----------",shopDate)
    return (
        <div className="xxl-addshop">
            <Form 
                {...layout}
                name="reguster"
                scrollToFirstError
                onFinish={onFinish} 
                onValuesChange = {(val,values)=>formChange(values)}
                form = {form}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
            >   

                <Form.Item
                    name="name"
                    label="商品名称"
                    rules={[
                    {required: true,message:"商品名称是必填的"},
                    {max:10,message:"商品名称不能超过10个字"},
                    {min:2,message:"商品名称不能少于两个字"}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="desc"
                    label="商品描述"
                    rules={[
                        {required:true,message:"商品描述是必填的！"},
                        {max:30,message:"商品名称不能超过130字"},
                        {min:10,message:"商品名称不能少于10个字"}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="price"
                    label="商品价格"
                    rules={[
                        {type: 'number',min: 0,max: 99},
                        {required:true,message:"商品描述是必填的！"}

                    ]}
                >
                    <InputNumber />
                </Form.Item>

                <Form.Item 
                    name="cate" 
                    label="选择一个品类"
                    rules={[
                        {required:true,message:"选择品类是必填的"}
                    ]}
                >
                    <CateSelect />
                </Form.Item>

                <Form.Item  
                    name="img"
                    label="商品图片"
                    rules={[
                        {required:true,message:"商品图片是必填"}
                    ]}
                >
                    <UploadPic src={values.img}/>
                    
                </Form.Item>

                <Form.Item
                    name="hot"
                    label="是否热销"
                    valuePropName="checked"
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