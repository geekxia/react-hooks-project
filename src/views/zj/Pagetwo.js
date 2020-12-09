import React, { useState,useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux'
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
  InputNumber,
  Upload,
  message,
  Switch,
} from "antd";
import { QfUploadIcon } from "@/components";
import CateSelect from './components/CateSelect'
import GoodUpload from './components/GoodUpload'
import action from '@/store/actions'
import img from "@/utils/img";
import { fetchGoodOrEdit } from "@/utils/api";

import {
  QuestionCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
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
};
const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

export default (props) => {
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const dispatch=useDispatch()
  let [values,setValues]=useState({})
  const id=props.match.params.id
  const isAdd=id==0
  const goodInfo=useSelector(store=>store.good.goodInfo)
  console.log('--------------props',props)
  const formChange=values=>{
    setValues(values)
  }
  // 获取Form的实例
  const [flag,setFlag]=useState(false)
  const [form] = Form.useForm();

  useEffect(()=>{
    // 给表单赋初始值
    if(!flag) form.setFieldsValue(goodInfo)
    // 解决当前useEffect反复运行的问题
    if(goodInfo._id)setFlag(true)
    return undefined
  })
  useEffect(()=>{
    // 当是编辑状态时，触发action掉接口获取商品详情
    if(!isAdd) dispatch(action.getGoodDetail({id}))
    return undefined
  },[])
  // 表单提交
  const onFinish = (values) => {
    values.img = imageUrl;
    // console.log("values 提交接口: ", values, props.history);
    fetchGoodOrEdit(values).then(() => {
      props.history.replace("/good/list");
    });
  };

  return (
    <div className="twoone">
      <h1>{isAdd?'商品新增':'商品编辑'}</h1>
      <hr />
      <Form
        style={{ margin: "25px 0" }}
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
            { required: true, message: "商品名称必填!" },
            { max: 10, message: "商品名称不能超过10个字" },
            { min: 2, message: "商品名称不能少于2个字" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="desc"
          label="商品描述"
          rules={[
            { required: true, message: "商品描述必填!" },
            { max: 30, message: "商品名称不能超过30个字" },
            { min: 10, message: "商品名称不能少于10个字" },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item name="price" label="商品价格" rules={[{ required: true }]}>
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item
          name="cate"
          label="选择品类"
          rules={[{ required: true, message: "商品选择必选!" }]}
        >
          <CateSelect/>
        </Form.Item>

        <Form.Item
          label="商品图片"
          rules={[{ required: true, message: "商品图片必选!" }]}
        >
          <GoodUpload src={values.img||goodInfo.img} />
        </Form.Item>

        <Form.Item name="hot" label="是否热销" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {isAdd?'添加商品':'确认修改'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
