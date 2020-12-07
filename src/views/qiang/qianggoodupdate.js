import {
    Form,
    Input,
    Button,
    InputNumber,
    Select,
    Switch,
    Upload
} from 'antd';

import { useState } from "react"
import { QfUploadIcon } from "@/components"
import img from "@/utils/img"

import { fetchGoodOrEdit } from '@/utils/api'

const { TextArea } = Input;
const { Option } = Select;


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

    let [imageUrl, setImageUrl] = useState('')




    const imgSuccess = e => {
        console.log("图片上传成功", e);
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            setImageUrl(e.fileList[0].response.data.url)

        }

    }

    const onFinish = (values) => {
        values.img = imageUrl
        console.log('Success:', values);
        fetchGoodOrEdit(values).then((res) => {
            console.log(res);
            props.history.replace('/qianggood/list')
        })
    };

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
                        name="username"
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
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="你还有选择吗"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            <Option key="1" value="hua">花有重开日</Option>
                            <Option key="2" value="ren">人无再少年</Option>
                            <Option key="3" value="bu">不须长富贵</Option>
                            <Option key="4" value="an">安乐是神仙</Option>
                            <Option key="5" value="chou">抽刀断水水更流</Option>
                            <Option key="6" value="ju">举杯消愁愁更愁</Option>
                        </Select>
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