import { useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
    Form,
    Input, 
    Button,
    InputNumber ,
    Upload,
    Switch 
    } from 'antd';
import ImgCrop from 'antd-img-crop';
import imgs from '@/utils/img'
import { fetchGoodOrEdit } from '@/utils/api'
import CateSelect from './component/CateSelect'
import action from '@/store/actions'
import { formatCountdown } from 'antd/lib/statistic/utils';

//form表单布局
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

//文本框
const { TextArea } = Input;

const InfoAddOrEdit=props=>{
    const dispatch = useDispatch()
    const goodInfo = useSelector(store=>store.good.goodInfo)
    let [imageUrl, setImageUrl] = useState('')
   
    const imgSuccess = e =>{
        // console.log("图片上传成功",e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

    //编辑
    //判断是编辑还是新增
    const id = props.match.params.id
    const isAdd = id==='0'
    // console.log('------idAdd', isAdd)
    const [flag, setFlag] = useState(false) // 是否已经填充表单
    const [form] = Form.useForm() //获取Form实例,就可以操作form；记得要在Form标签中form={form}
    //dispatch触发action调后端接口获取对应的商品信息
    useEffect(()=>{
     if(!isAdd) dispatch(action.getGoodDetail({id}))
     return ()=>{
        // 当前组件被销毁前，清空redux中的缓存数据
        dispatch(action.clearGoodDetail())
      }
    },[])

    useEffect(()=>{
        // console.log('goodInfo',goodInfo)
        // 给表单赋初始值
        if(!flag) form.setFieldsValue(goodInfo)
        // 解决当前useEffect反复运行的问题
        // 解决当前useEffect反复运行的问题
        return undefined
    })

     console.log('goodInfo-img',goodInfo)
     //表单提交
    const onFinish = (values) => {
        values.img=imageUrl
        // console.log('Success:', values);
        fetchGoodOrEdit(values).then(()=>{
            console.log('表达提交成功')
            props.history.replace('/llfList')
        })
    };

      
    return (
        <div className='llf-AddOrEdit'>
          <h1>{isAdd ? '商品新增' : '商品编辑'}</h1>
            <Form
            {...layout}
            style={{margin:'25px 0'}}
            name="basic"
            onFinish={onFinish}
            form={form}
            >
            <Form.Item
                label="商品名称"
                name="name"
                rules={[
                { required: true, message: '商品名称是必填的哦!' },
                { max:10,message:'商品名称不能超过10个字' },
                { min:2,message:'商品名称不能少于两个字'}
                ]}
            >
                <Input />
            </Form.Item>
        
            <Form.Item
                label="商品描述"
                name="desc"
                rules={[
                { required: true,message: '商品描述是必填的哦!'},
                { max:30,message:'商品名称不能超过30个字' },
                { min:6,message:'商品名称不能少于6个字'}
                ]}
            >
            <TextArea rows={4} />
            </Form.Item>
            
            <Form.Item
                label="选择品类"
                name="cate"
                rules={[
                { required: true,message: '必须要选择品类哦!'},
                ]}
            >
                <CateSelect />
            </Form.Item>
            
            <Form.Item
                label="商品价格"
                name="price"
                rules={[
                { required: true, message: '商品价格是必填的哦!' },
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>
            
            <Form.Item
                name='img'
                label="商品图片"
                rules={[
                { required: true, message: '商品图片是必填的哦!' },
                ]}
            >
            <ImgCrop rotate>
                <Upload
                name="file"
                action={imgs.uploadUrl}
                listType="picture-card"
                onChange={e=>imgSuccess(e)}
                className="avatar-uploader"
                showUploadList={false}
                >
                { 
                imageUrl ?
                <img src={imgs.imgBase+(imageUrl ||goodInfo.img) } alt="avatar" style={{ width: '100%' }} />
                : '+ Upload'
                }
                </Upload>
            </ImgCrop>
            </Form.Item>
        
        
            <Form.Item
            name='hot'
            label="是否热销" 
            valuePropName='checked'
            >
            <Switch />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}
export default InfoAddOrEdit