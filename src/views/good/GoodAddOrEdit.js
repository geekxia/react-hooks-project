import {useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import action from '@/store/actions'

import { 
    Form, 
    Input,
    Select, 
    InputNumber, 
    Button ,
    Upload, 
    Switch 
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import img from '@/utils/img'
import {fetchGoodAddOrEdit} from '@/utils/api'
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
const { TextArea } = Input;
const { Option }=Select

export default (props)=>{
    let [values, setValues] = useState({})
    let [imageUrl, setImageUrl] = useState('')
    let { loading } = props
    const [form] = Form.useForm()
    const dispatch=useDispatch()
    const id=props.match.params.id//拿到id
    const isAdd=id==0//判断是新增true还是编辑页edit

    const imgSuccess = e => {
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
       }

    const goodInfo=useSelector(store=>store.good.goodInfo)
    
    const formChange=(value)=>{
        setValues(value)
    }

    useEffect(()=>{
        form.setFieldsValue(goodInfo)
        return undefined
    })

    useEffect(()=>{
        if(!isAdd){
            dispatch(action.getGoodDetail({id}))
        }
        return ()=> {
            action.clearGoodCache()
        }
    },[])

    const onFinish = values => {
        values.img = imageUrl
        fetchGoodAddOrEdit(values).then(() => {
            props.history.replace('/good/list')
        })
        }
        
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
        <div>
            <h3>{isAdd?'商品新增':'商品编辑'}</h3>
            <Form 
            {...layout} 
            name="nest-messages" 
            onFinish={onFinish}
            form={form}
            onValuesChange={(val, values) => formChange(values)}
            >
                <Form.Item name='name' label="商品名称" rules={[{ required: true, min: 2, max: 10 }]}>
                    <Input />
                </Form.Item>
                <Form.Item name='desc' label="商品描述" rules={[{ required: true,min:10,max:30 }]}>
                    <TextArea rows={4} />
                </Form.Item>
                <Form.Item name= 'price' label="商品价格" rules={[{ required: true,type: 'number', min: 0}]}>
                    <InputNumber />
                </Form.Item>
                <Form.Item name= 'cate' label="选择品类" rules={[{required: true}]}>
                    <Select>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                name='upload'
                label="图片上传"
                >
                <Upload
                    name="file"
                    className="avatar-uploader"
                    fileList=''
                    listType='picture-card'
                    showUploadList={false}
                    action={img.uploadUrl}
                    onChange={imgSuccess}
                >
                    {imageUrl ? <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                </Form.Item>
                <Form.Item 
                name="hot"
                label="是否热销"
                valuePropName='checked'
                >
                    <Switch />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    {isAdd?'确认新增':'确认编辑'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}