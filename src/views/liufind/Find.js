import React ,{useState}from 'react'
import img from '@/utils/img.js'
import {fetchGoodOrEdit} from '@/utils/api.js'

import { Form,
         Input, 
         Button, 
         Checkbox ,
         InputNumber,
         Select,
         Upload, 
         message,
         Switch 
} from 'antd'

import {
  QfUploadIcon
} from '@/components/'
import CateSelects from './components/CateSelects'
import action from '@/store/actions.js'
import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

const { TextArea } = Input
const { Option } = Select

const layout = {
  labelCol: {
    span:5,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset:5,
    span: 16,
  },
};




const Find =(props)=>{
  // 列表页面传递过来的id
  const id=props.match.params.id==='0'
  console.log("id",id)
  console.log('props',props)
  const goodInfo=useSelector(store=>{store.good.getGoodDetail})
  
  // 调取接口
  const dispatch=useDispatch()
  useEffect(()=>{
    if(id!=='0'){
      dispatch(action.getGoodDetail({id:props.match.params.id}))
    }
    
    return undefined
  },[])

  let [imageUrl, setImageUrl] = useState('')
  // 方法
  const onFinish = (values) => {
    values.img = imageUrl
    console.log("表单值",values);
    fetchGoodOrEdit(values).then(()=>{
      props.history.replace('/goodlist')
    })

  };
// 图片上传
  const imgSuccess = e => {
    console.log('图片上传成功', e)
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
      setImageUrl(e.fileList[0].response.data.url)
    }
  }
  // 获取form实例
  

  return (
    <div>
      <h1>{id?'商品新增':'商品修改'}</h1>
      <Form {...layout}  onFinish={onFinish} >
        {/* ======商品名称====== */}
        <Form.Item
          label="商品名称"
          name="name"
          rules={[
          {
              required: true,
              message: '商品名是必填项',
          },
          ]}
        >
          <Input />   
        </Form.Item>  
        {/* ====商品描述==== */}
        <Form.Item
          label="商品描述"
          name="desc"
          rules={[
            {required:true,message:'商品描述为必填项'},
            {min:2,message:'描述不能少于两个字符'},
            {max:30,message:'商品描述不能多于30个字符'}
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        {/* =======品类=============*/}
        <Form.Item
          name="cate"
          label="选择品类"
          rules={[
            { required: true, message: '商品描述是必填!' }
          ]}
        >
          {/* <Select
            style={{ width: 200 }}
            placeholder="选择一个品类"
          >
            <Option key='1' value="jack">Jack</Option>
            <Option key='2' value="lucy">Lucy</Option>
            <Option key='3' value="tom">Tom</Option>
          </Select> */}
          <CateSelects></CateSelects>
        </Form.Item>
        {/* =======商品价格========= */}
        <Form.Item
          label="商品价格"
          name="price"
          rules={[
            {required:true,message:'价格为必填参数'}
          ]}
        >
          <InputNumber min={0} />
        </Form.Item>
        {/* =====是否热销===== */}
        <Form.Item
          label="是否热销"
          name="hot"
          valuePropName="checked"
        >
          <Switch defaultChecked  />
        </Form.Item>
        {/* ==========商品图片======= */}
        <Form.Item
          label="商品图片"
         
        >
          <Upload
            name="file"
            action={img.uploadUrl}
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={imgSuccess}
          >
            {
              imageUrl ?
              <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} />
              : <QfUploadIcon />
            }
          </Upload>
        </Form.Item>
        {/* =========提交============== */}
        <Form.Item {...tailLayout}>
          <Button  type="primary" htmlType="submit">
          {id?"增加商品":'修改商品'}
          </Button>
        </Form.Item>
      </Form>



    </div>
  )
}

export default Find