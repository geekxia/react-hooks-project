import React,{useState,useEffect} from "react"
import { useSelector,useDispatch} from 'react-redux'
import { 
    Form, 
    Input, 
    InputNumber, 
    Button,
    Switch
} from "antd"
import CateSelect from "../components/cateSelect"
import UploadPic from '../components/uploadPic'
import api from "@/utils/api"
import action from '@/store/actions'


export default props=>{
    const [form] =Form.useForm()
    let shopDate = useSelector(store=>(store.xxlgetshop.shopDate))
    let goodInfo = useSelector(store =>(store.xxlgetshop.goodInfo))
    let [values,setValues] = useState("")
    const id = props.match.params.id
    const isAdd = props.match.params.id==="0" || props.match.params.id===":id"
    const dispatch = useDispatch()
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
        //如果是编辑页面，则把传输的数据加上id属性
        if(!isAdd) values.id = goodInfo._id
        api.pushshop(values).then(()=>{
            props.history.replace("/xxlshop")
        })
    }
    //用商品id调取接口
    useEffect(()=>{
        if(!isAdd) {
            dispatch(action.xxlgetgoodinfo({id}))
        }
        return ()=>{
            dispatch(action.xxlcleargoodinfo())
        }
    },[])
    //渲染id的商品信息
    let [flag,setFlag] = useState(false)
    useEffect(()=>{
        // console.log("-------------")只执行两次
        if(!flag){
            form.setFieldsValue(goodInfo)
        }  
        if(goodInfo._id){
            setFlag(true)
        }
        return undefined
    })
    // console.log("商品id----------",props.match.params.id)
    // console.log("商品数据----------",shopDate)
    console.log("商品编辑的商品",goodInfo)
    return (
        <div className="xxl-addshop">
            <h1>{isAdd ? "新增商品":"编辑商品"}</h1>
            <Form 
                {...layout}
                name="reguster"
                scrollToFirstError
                onFinish={onFinish} 
                onValuesChange = {(val,values)=>formChange(values)}
                form = {form}
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
                        {required:true,message:"商品描述是必填的！"}

                    ]}
                >
                    <InputNumber min={0}/>
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
                    <UploadPic src={values.img || goodInfo.img}/>
                    
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
                    {isAdd ? "提交":"编辑商品"}
                    </Button>
                </Form.Item>

            </Form>
        </div>
    )
}