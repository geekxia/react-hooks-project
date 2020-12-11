import React,{ useState,useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
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
  Switch,
  Upload ,
  InputNumber
} from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import img from "@/utils/img"
import {PlusOutlined} from "@/components/"
import { fetchGoodOrEdit } from '@/utils/api'
import CateSelect from "../common/CateSelect"
import action from "@/store/actions"
const { Option } = Select
const { TextArea } = Input
const AutoCompleteOption = AutoComplete.Option;
const formItemLayout = {
  labelCol: {
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    sm: {
      span: 16,
    },
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


export default props => {
  let dispatch=useDispatch()
  let goodarr=useSelector(store=>store.good.arrvalue)
  let isid=props.match.params.id==0
  let id=props.match.params.id
  let [imageUrl,setimageUrl]=useState("")

  //不写[]频繁触发
  let [flag,setflag]=useState(false)
  useEffect(()=>{
      if(!flag) { 
        form.setFieldsValue(goodarr)
        if(goodarr&&goodarr.img){
          setimageUrl(goodarr.img)
        }
      }
    if(goodarr._id){
      setflag(true)
    }
    console.log("触发setFieldsValue")
    return undefined
  })
  //比from实例渲染慢
  useEffect(()=>{
    if(id!=0){
      dispatch(action.goodval({id})) 
    }
    return undefined
  },[])

  //图片上传成功回调
  const  imgSuccess=(e)=>{
    console.log(e)
   if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
     setimageUrl(e.fileList[0].response.data.url)
   }
 }
  const [autoCompleteResult, setAutoCompleteResult] = useState([])

  // 获取Form的实例
  const [form] = Form.useForm()

  // 表单提交
  const onFinish = values => {
    console.log('values', values);
    values.img = imageUrl
    if(id!=0){
      values.id=id
    }
    fetchGoodOrEdit(values).then(res=>{
      props.history.replace("/good/list")
    })

  }


  return(
    <div>
      <h1>  {isid? "商品新增":"商品编辑"}</h1>
      <Form
        style={{margin:'25px 0'}}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        colon
      >
        <Form.Item
          name="name"
          label="商品名称"
          rules={[
            { required: true, message: '商品名称是必填!',},
            { max: 10, message: '商品名称不能超过10个字' },
            { min: 2, message: '商品名称不能少于两个字' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="商品描述"
          rules={[
            { required: true, message: '商品描述是必填!',},
            { max: 30, message: '商品描述不能超过10个字' },
            { min: 5, message: '商品描述不能少于两个字' }
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="cate"
          label="选择品类"
          rules={[
            { required: true, message: '商品描述是必填!' }
          ]}
        >
             <CateSelect xx ></CateSelect>
        </Form.Item>

        <Form.Item
           name="hot"
          label="是否热销"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          name="price"
          label="商品价格"
          rules={[
            { required: true, message: '商品描述是必填!',}
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
           label="图片上传"
           rules={[
            { required: true, message: '商品图片是必填!' }
          ]}
        >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={img.imgURL}
              onChange={imgSuccess}
            >
              {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
          </Upload>
        </Form.Item> 



        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {id==0?"新增":"修改"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
