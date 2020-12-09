import {useState,useEffect} from 'react';
import api from '@/utils/api';
import {useDispatch,useSelector} from 'react-redux';
import action from '@/store/actions'
import { 
  Form, 
  Input, 
  InputNumber, 
  Button,Select,
  Switch,
  Upload, 
  message
} from 'antd';
import { 
  LoadingOutlined, 
  PlusOutlined 
} from '@ant-design/icons';
import { configConsumerProps } from 'antd/lib/config-provider';
import CateSelect from './components/CateSelect';
import GoodUpload from './components/GoodUpload';
const { Option } = Select;

const layout = {
  labelCol: {
    sm:{
      span: 4,
    }
  },
  wrapperCol: {
    sm:{
      span: 10,
    }
  },
};

const validateMessages = {
  required: '${label}是必填',
};

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

export default props=>{
  const dispatch = useDispatch();
  const [loading,setLoading] = useState('');
  let [values,setValues] = useState({});
  const goodInfo = useSelector(store=>store.good.goodInfo);

  // 获取Form的实例
  const [form] = Form.useForm()

  // 是否已经填充表单
  let [flag,setFlag] = useState(false);

  let id = props.match.params.id;
  const isAdd = id === '0';
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  
  // 当Form表单值发生变化时，我们手动取值，赋值给声明式变量 values
  const formChange = values=>{
    console.log('form------------values', values);
    setValues(values)
  }
  useEffect(()=>{
    // 当是编辑时，触发action调接口获取商品详情
    if(!isAdd) dispatch(action.getGoodDetail({id}))
    return dispatch(action.clearGoodDetail())
  },[])

  useEffect(()=>{
    console.log('好久好久')
    if(!flag) form.setFieldsValue(goodInfo);
    // 解决当前useEffect反复运行的问题
    if(goodInfo._id) {
      setFlag(true);
    }
    return undefined
  })
  // //图片上传成功
  // const imgSuccess = e=>{
  //   console.log('图片上传成功', e);
  //   if(e && e.fileList && e.fileList[0].response) {
  //     setImageUrl(e.fileList[0].response.data.url)
  //   }
  // }
  // 表单提交
  const onFinish = () => {
    console.log('values 提交接口',values);
    api.fetchGoodOrEdit(values).then((res)=>{
      // 跳转到列表页
      console.log('add表单提交',res,props);
      props.history.replace('/good/list')
    })
  };

  return(
    <div className='al-good-add'>
      <h1>{isAdd ? '商品新增':'商品编辑'}</h1>
      <Form 
        {...layout} 
        form = {form}
        name="nest-messages" 
        onFinish={onFinish}
        validateMessages={validateMessages}
        onValuesChange={(val,values)=>formChange(values)}
      >
        <Form.Item
          name='name'
          label="商品名称"
          rules={[
            {required: true,},
            {max:10,message:'商品名称不能超过10个字'},
            { min: 2, message: '商品名称不能少于两个字' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='商品图片'
          name='img'
          rules={[
            {required:true}
          ]}
        >
          <GoodUpload src={values.img || goodInfo.img}/>
        </Form.Item>
        <Form.Item 
          name='desc' 
          label="商品描述"
          rules={[
            {required: true},
            {max:100,message:'商品描述不能超过100个字'},
            { min: 10, message: '商品描述不能少于10个字' }
          ]}
        >
          <Input.TextArea rows={4}/>
        </Form.Item>

        <Form.Item
          name='price'
          label="价格"
          rules={[
            {
              required:true
            },
          ]}
        >
          <InputNumber min={0}/>
        </Form.Item>
        <Form.Item
          name='cate'
          label='选择品类'
          rules={[
            {required:true}
          ]}
        >
          <CateSelect/>
        </Form.Item>
        <Form.Item 
          name='hot'
          label="是否热销"
          valuePropName='checked'
        >
          <Switch/>
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            {isAdd ? '提交' : '确定修改'}
          </Button>
        </Form.Item>
    </Form>
    </div>
  )
}