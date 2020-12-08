import {
    Form,
    Input,
    Button,
    InputNumber,
    Select,
    Switch,
    Upload
} from 'antd';

import { useState, useEffect } from "react"
import { QfUploadIcon } from "@/components"
import img from "@/utils/img"
import { fetchGoodOrEdit } from '@/utils/api'
import action from "@/store/actions"
import { useDispatch, useSelector } from "react-redux"
import CateSelect from "./component/cateselect"

const { TextArea } = Input;


const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 12,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default props => {
    const dispatch = useDispatch()
    let [imageUrl, setImageUrl] = useState('')
    const imgSuccess = e => {
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    const onFinish = (values) => {
        values.img = imageUrl
        fetchGoodOrEdit(values).then((res) => {
            props.history.replace('/qianggood/list')

        })
    };

    useEffect(() => {
        dispatch(action.getCatesAction())
        return undefined
    }, [])

    return (
        <div>
            <h1>HNQ的商品新增管理模块</h1>

            <div>
                <Form
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
                            { required: true, message: '商品名称必填' },
                            { max: 10, message: "商品名称不能超过10个字" },
                            { min: 4, message: "商品名称不能少于4个字" },

                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="商品详情"
                        name="desc"
                        rules={[
                            { required: true, message: "商品详情必填" }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="商品价格"
                        name="price"
                        rules={[
                            { required: true, message: "" }
                        ]}
                    >
                        <InputNumber min={0} />
                    </Form.Item>


                    <Form.Item
                        label="选择品类"
                        name="cate"
                        rules={[
                            { required: true, message: "" }
                        ]}
                    >
                        <CateSelect />
                    </Form.Item>

                    <Form.Item
                        label="是否热销"
                        name="hot"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <Form.Item
                        label='商品图片'
                        rules={[
                            { required: true, message: '商品图片是必填!' }
                        ]}
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
                                    <img src={img.imgBase + imageUrl} style={{ width: "100%" }} /> : <QfUploadIcon />
                            }

                        </Upload>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}