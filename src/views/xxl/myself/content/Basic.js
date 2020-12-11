import React from 'react'
import { Input,Row, Col ,Select ,Upload, message, Button } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { UploadOutlined } from '@ant-design/icons';
import img from "@/utils/img"

const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
    Zhejiang: ['杭州', '宁波', '温州'],
    Jiangsu: ['南京', '苏州', '北京'],
};
export default props=>{
    const [cities, setCities] = React.useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = React.useState(cityData[provinceData[0]][0]);

    const handleProvinceChange = value => {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };

    const onSecondCityChange = value => {
        setSecondCity(value);
    };
    const props2 = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };
    return (
        <div className="xxl-basic">
            <h1>基本设置</h1>
            <Row>
                <Col span={4}>邮箱</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Input placeholder="请输入您的邮箱地址" />
                </Col>
            </Row>
            <Row>
                <Col span={4}>昵称</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Input placeholder="请输入您的昵称" />
                </Col>
            </Row>
            <Row>
                <Col span={4}>个人简介</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <TextArea rows={4} />
                </Col>
            </Row>
            <Row>
                <Col span={4}>国家/地区</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Select
                        style={{ width: 200 }}
                        placeholder="选择一个地址或国家"
                    >
                        <Option value="jack">中国</Option>
                        <Option value="lucy">英国</Option>
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={4}>所在省市</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Select defaultValue={provinceData[0]} style={{ width: 120}} onChange={handleProvinceChange}>
                        {provinceData.map(province => (
                        <Option key={province}>{province}</Option>
                        ))}
                    </Select>
                    <Select style={{ width: 120,marginLeft:"10PX"  }} value={secondCity} onChange={onSecondCityChange}>
                        {cities.map(city => (
                        <Option key={city}>{city}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row>
                <Col span={4}>街道地址</Col>
            </Row>
            <Row>
                <Col span={6}>
                    <Input placeholder="请输入您的街道地址" />
                </Col>
            </Row>
            <Row>
                <Col span={4}>联系电话</Col>
            </Row>
            <Row>
                <Col span={2}>
                    <Input  />
                </Col>
                <Col span={4}>
                    <Input  style={{marginLeft:"10px"}}/>
                </Col>
            </Row>
            <Row>
                <Col span={2}>
                <Button type="primary">更新基本信息</Button>
                </Col>
            </Row>

            <div className="upImg">
                <img src={img.headerImg} alt="0"/>
                <Upload {...props2}>
                    <Button icon={<UploadOutlined />}>更换头像</Button>
                </Upload>
            </div>  
        </div>
    )
}