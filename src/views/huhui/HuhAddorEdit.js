import React,{ useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import {
    Form,
    Input,
    Button,
    InputNumber,
    Switch
} from 'antd'
//引入接口
import {
    fetchGoodOrEdit
} from "@/utils/api"
//引入select通过组件
import WshSelect from "./components/WhsSelect"
//引入upload组件
import WhsUpload from "./components/WhsUpload"
//引入状态管理Api
import action from "@/store/actions"

const { TextArea } = Input

const formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 12 }
    }
}

const tailFormItemLayout = {
    wrapperCol: {
      sm: {
        span: 16,
        offset: 8,
      }
    }
}

const HuhAddorEdit = (props)=>{
    let [imageUrls,setImageUrls]=useState({})
    let [flag,setFlag] = useState(false) //是否已经填充表单
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    //获取编辑页删除id
    const id = props.match.params.id
    const isAdd = id === "0"
    const goodDetails = useSelector(store=>store.good.goodInfo)

    //当form表单值发生变化时,手动赋值
    const formChange=(values)=>{
        setImageUrls(values)
    }
    //表单提交
    const onFinish = values => {
        console.log('表单提交 ', values);
        if(!isAdd) values.id = goodDetails._id
        fetchGoodOrEdit(values).then(res=>{
            props.history.replace('/hucontact')
        })
    }
    //设置form表单默认值
    useEffect(()=>{
        if(!flag) form.setFieldsValue(goodDetails)
        if(goodDetails._id) setFlag(true)
        return undefined
    })

    useEffect(()=>{
        //调列表接口
        if(!isAdd) dispatch(action.getGoodDetail({id}))
        return ()=>{
            dispatch(action.clearGoodDetail())
        }
    },[])

    return (
        <div className="HH-AddorEdit">
            <h1>{ id!="0" ? "商品编辑" : "商品新增"}</h1>
            <hr/>
            <div className="AddorEdit-main" style={{paddingTop:"20px"}}>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    onValuesChange={(val,values)=>formChange(values)}
                >
                    <Form.Item
                        name="name"
                        label="商品名称"
                        rules={[
                            { required: true , message: '请输入商品名称！'},
                            { max:10 , message:"商品名称最多10个字！" },
                            { min:2 , message:"商品名称最少2个字！" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            { required: true , message: '请输入商品描述！' },
                            { min:10 , message:"商品描述最少10个字！" }
                        ]}
                    >
                        <TextArea showCount maxLength={200} />
                    </Form.Item>
                        
                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[
                            { required: true , message: '请输入商品价格！' }
                        ]}
                    >
                        <InputNumber min={0}/>
                    </Form.Item>

                    <Form.Item
                        name="cate"
                        label="选择品类"
                        rules={[
                            { required: true , message: '请选择商品品类！' }
                        ]}
                    >
                        <WshSelect />
                    </Form.Item>

                    <Form.Item
                        name="img"
                        label="商品图片"
                        rules={[
                            { required: true , message: '请上传商品图片！' }
                        ]}
                    >
                        <WhsUpload src={imageUrls.img || goodDetails.img} />
                    </Form.Item>
                    
                    <Form.Item
                        name="hot"
                        label="是否热销"
                        valuePropName="checked"
                    >
                        <Switch  />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            style={{backgroundColor:"#1890ff",borderColor:"#1890ff"}}
                            size="middle"
                        >
                            {
                                id!="0" ? "提交编辑" : "新增商品"
                            }
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default HuhAddorEdit