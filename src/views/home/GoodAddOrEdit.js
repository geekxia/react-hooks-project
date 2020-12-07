import React,{useState} from 'react'

import { Form, 
        Input, 
        Button,
        InputNumber,
        Select,
        Upload, 
        Switch
     } from 'antd'

     import {
        QfUploadIcon
      } from '@/components'

import img from '@/utils/img'
import { fetchGoodOrEdit } from '@/utils/api'


 const { Option } = Select;


export default props=>{
    const [autoCompleteResult, setAutoCompleteResult] = useState([])
    let [imageUrl, setImageUrl] = useState('')
  
    const layout = {
        labelCol: {span: 2},
        wrapperCol: { span: 8 },
      };
      const tailLayout = {
        wrapperCol: { offset: 2, span: 8 },
      };

      //图片上传:
      const imgSuccess = e => {
        console.log('图片上传成功', e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
          setImageUrl(e.fileList[0].response.data.url)
        }
      }
      //表单提交:
      const onFinish =values=>{
        values.img = imageUrl
        fetchGoodOrEdit(values).then(()=>{
            props.history.replace('/good/list')
        })

      }
    return(
        <div>
            <h1>商品新增页</h1>
            <hr/>
            <Form                 
                {...layout}
                name="basic" 
                onFinish={onFinish}
                >
                <Form.Item                      
                    label="查询商品"
                    name="name"                       
                    rules={[
                        { required: true, message: '请输入你要查询的商品名称'},
                        { max: 10, message: '商品名称不能超过10个字' },
                        { min: 2, message: '商品名称不能超过2个字' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item                      
                    label="商品详情"
                    name="desc"                       
                    rules={[
                        { required: true, message: '请输入商品的详情信息'},
                        { max: 30, message: '商品名称不能超过30个字' },
                        { min: 10, message: '商品名称不能少于10个字' },
                    ]}
                >
                    <Input.TextArea row={4}/>
                </Form.Item>

                <Form.Item                
                    label="商品价格"
                    name="price"
                    rules={[
                        { required: true, message: '商品描述是必填!',}
                    ]}
                >
                    <InputNumber min={0} />
                </Form.Item>
                <Form.Item
                label="商品品类"
                name="cate"
                rules={[
                    { required: true, }
                ]}
                >
                <Select                
                    style={{ width: 200 }}
                    placeholder="请选择品类"
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                </Form.Item>

                <Form.Item
                    label='商品图片'
                    name='img'
                    rules={[
                        { required: true, message: '商品图片是必填!' }
                    ]}
                    >
                    <Upload
                        fileList=''
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

                    <Form.Item
                        name='hot'
                        label='是否热销'
                        valuePropName='checked'
                        rules={[
                            { required: true }
                        ]}
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