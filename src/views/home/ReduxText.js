import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { Form, Input, Button, Select,  Upload,Switch,InputNumber  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchGoodOrEdit } from '@/utils/api'
import action from '@/store/actions'
import img from '@/utils/img'
import CreateSelect from '@/views/components/createSelect'
const { Option } = Select
const { TextArea } = Input;
const layout = {
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 16,
                },
                }
const tailLayout = {
                wrapperCol: {
                offset: 4,
                span: 16,
                },
            }
// 定义一个无状态组件
const FFrom=props=>{
    const info=useSelector(store=>store.detail.gooddetail)
    const dispatch=useDispatch()
    const [ImageUrl,setImageUrl]=useState("")
    const loading=false
    let isAdd = props.match.params.id ==="0"
    // 封装一个方法
    const uploadButton = ()=>{
        return(
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        )
        }
    // 当提交的时候将img手动添加到val上
    const onFinish = (values) => {
        if(props.match.params.id!=0){
            values.id=props.match.params.id
        }
        values.img=ImageUrl
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/basedetail')
          })
    }
    const [form] = Form.useForm() // 获取Form的实例
   
    // 进入页面的时候进行判断id是否是零,是就是新增不是就是编辑
    useEffect(()=>{

        
        if(!isAdd){
            let id=props.match.params.id 
            dispatch(action.getGoodDetail({id}))
        }
        return ()=>{
            // 当前组件被销毁前，清空redux中的缓存数据
            dispatch(action.clearGoodDetail())
        }
    },[])
    let [flag,setFlag]=useState(false)
    useEffect(()=>{
        console.log("1")
        if(!flag) form.setFieldsValue(info)
        if(info._id) {
            setFlag(true)
            setImageUrl(info.img)
        }
        return undefined
    })
    // 图片上传成功
    const imgSuccess = e => {
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            console.log(e.fileList[0].response.data.url)
        setImageUrl(e.fileList[0].response.data.url)
        }
    }
    return(
        <div className="f-from">
            <h2>from表单</h2>
            <Form
            form={form}
            {...layout}
            name="basic"
           
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}

            
            >
                <Form.Item
                    label="商品名称"
                    name="name"
                    rules={[
                    {
                        required: true,
                        max:6,
                        min:2,
                        message: '请输入2到6位的名称',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="商品描述"
                    name="desc"
                    rules={[
                    {
                        required: true,
                        max:18,
                        min:6,
                        message: '请输入6到18位的描述',

                    },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                 label="商品图片"
                 rules={[
                    {
                        required: true,
                        message: '商品图片必填',
                    },
                    ]}
                >
                    <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={img.uploadUrl}
                    onChange={imgSuccess}
                    >
                        {ImageUrl ? <img src={img.imgBase+ImageUrl} alt="img" style={{ width: '100%' }} /> : uploadButton()}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name='hot'
                    label='是否热销'
                    valuePropName='checked'
                    >
                    <Switch />
                    </Form.Item>
                <Form.Item
                    label="商品品类"
                    name="cate"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                   <CreateSelect/>
                </Form.Item>
                <Form.Item
                    label="商品价格"
                    name="price"
                    rules={[
                    {
                        required: true,
                        message: '请输入价格',
                    },
                    ]}
                >
                    <InputNumber min={0} max={10} step={0.1} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        {
                        isAdd ?'提交':'编辑完成'
                        }
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default FFrom