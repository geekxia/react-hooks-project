import React, { useState }  from 'react'
import {
    Form,
    Input,
    Select,
    Button,
    InputNumber,
    Upload,
    Switch 
} from 'antd'
import { UploadIcon } from '@/components'
import img from '@/utils/img'

import { fetchGoodOrEdit } from '@/utils/api'

import CateSelect from '../components/CateSelect'

const { Option } = Select
  
const formItemLayout = {
    labelCol: { sm: { span: 8 } },
    wrapperCol: { sm: { span: 16 } }
}
const tailFormItemLayout = {
    wrapperCol: {
        sm: {
            span: 16,
            offset: 8
        }
    }
}

export default props => {  
    const [form] = Form.useForm()
    let [values, setValues] = useState({})
    
    let [imageUrl, setImageUrl] = useState('')
    const onFinish = values => {
        values.img = imageUrl
        // console.log('values 提交', values)
        fetchGoodOrEdit(values).then(()=>{
            // 跳转到列表页
            props.history.replace('/good/list')
        })
    }

    // 当form表单值发生变化的时候，我们手动取值，赋值给声明式变量 values
    const formChange = values => {
        setValues(values)
    }

    // 图片上传成功
    const imgSuccess = e => {
        console.log('图片上传成功', e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }

    return (
        <div>
            <h1>商品新增与编辑</h1>
            <hr />
            <div>
                 <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    onValuesChange={(val, values)=>formChange(values)}
                >
                    <Form.Item
                        style={{margin: '20px 0'}}
                        name="name"
                        label="商品名称"
                        rules={[
                            {
                                required: true,
                                max: 10, message: '商品名称不能超过10个字',
                                min: 1, message: '商品名称不能小于1个字'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        label="商品价格"
                        rules={[{ required: true, message: '商品价格是必写的' }]}
                    >
                        <InputNumber min={1} />
                    </Form.Item>

                    <Form.Item
                        name="desc"
                        label="商品描述"
                        rules={[
                            {
                                required: true,
                                max: 30, message: '商品描述不能超过30个字',
                                min: 10, message: '商品描述不能小于10个字'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.TextArea />
                    </Form.Item>
                
                    <Form.Item
                        name="cate"
                        label="选择品类"
                        rules={[
                            {  required: true, message: '请选择商品品类' },
                        ]}
                    >
                        <CateSelect />
                    </Form.Item>

                    <Form.Item
                        name='imgForm'
                        label='商品图片'
                        rules={[
                            {required:true, message:'商品图片是必填项！'}
                        ]}
                    >
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={img.imgUrl}
                            onChange={imgSuccess}
                        >
                            {
                                imageUrl ?
                                <img src={img.baseUrl+imageUrl} alt="avatar" style={{ width: '100%' }} />
                                : <UploadIcon/>
                            }
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        name='hot'
                        label='是否热销'
                        valuePropName='checked'
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}