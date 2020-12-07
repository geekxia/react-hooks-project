
    import React, { useState } from 'react';
    import {
      Form,
      Input,
      InputNumber ,
      Tooltip,
      Cascader,
      Select,
      Row,
      Col,
      Checkbox,
      Button,
      AutoComplete,
      Upload,
      Switch ,
    } from 'antd';
    import { QuestionCircleOutlined } from '@ant-design/icons';

    import {QfUploadIcon} from '@/components/index'

    import img from '../../utils/img'
    import {fetchGoodOrEdit} from '../../utils/api'

    const { TextArea } = Input;


    const { Option } = Select;
    const AutoCompleteOption = AutoComplete.Option;
    const formItemLayout = {
        labelCol: { 
          sm: { span: 6 },
        },
        wrapperCol: {
          sm: { span: 18 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 6,
          },
        },
      };
   
export default props =>{
  
   let[ imageUrl,setImageUrl ]= useState()

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('提交的数据 ', values);
    fetchGoodOrEdit(values).then(()=>{
        props.history.replace('/good/list')
    })
  };

  // 图片上传成功
  const imgSuccess=(e)=>{
    console.log('图片上传成功',e)
    if(e&&e.fileList&&e.fileList[0]&&e.fileList[0].response){
        setImageUrl(e.fileList[0].response.data.url)
    }
   
  }

  return (
      <div style={{margin:'25px'}}>

     
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="商品名称"
        rules={[
          {
            required: true,
            message: '商品名称是必填',
          },
          {
            max: 10,
            message: '商品名称是不能超过10个字',
          }, 
          {
            min: 2,
            message: '商品名称是不能少于2个字',
          },
        ]}
      >
        <Input />
      </Form.Item>

        <Form.Item
        name="desc"
        label="商品描述"
        rules={[
          {
            required: true,
            message: '商品描述是必填',
          },
          {
            max: 30,
            message: '商品描述是不能超过10个字',
          }, 
          {
            min: 5,
            message: '商品描述是不能少于2个字',
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>


             <Form.Item
                name="price"
                label="商品价格"
                rules={[
                {
                    required: true,
                    message: '商品价格是必填',
                },
        
                ]}
            >
                <InputNumber min={1}  />
            </Form.Item>

            <Form.Item
          
                label="商品图片"
                rules={[
                {
                    required: true,
                    message: '商品图片是必填',
                },
        
                ]}
            >
                    <Upload
                        name='file'
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
               
                        action={img.uploadUrl}
                        onChange={(e)=>{imgSuccess(e)}}
                    >
                        {imageUrl ? <img src={img.imgBase+imageUrl} alt="avatar" style={{ width: '100%' }} /> : <QfUploadIcon/>}
                    </Upload>
            </Form.Item>

            <Form.Item
                name="hot"
                label="是否热销"
                valuePropName = 'checked'
                rules={[
                {
                    required: false,
                    message: '是否热销是非必填',
                },
          
                ]}
            >
               <Switch />
            </Form.Item>

           <Form.Item
        name="cate"
        label="选择品类"
        rules={[
          {
            required: true,
            message: '选择品类是必填',
          },
        ]}
      >
         <Select
            style={{ width: 200 }}
            placeholder="选择一个品类"
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

