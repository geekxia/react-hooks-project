import React, {useState,useEffect} from "react"
import scss from "./style.scss"
import { Row, Col,Form, Input, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
export default props=>{
    let [oo,setoo]=useState("on")
    let {history}=props



    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      };

    return (
        <div>
            <Row justify="start" className="R1" >
                <Col  >首页</Col>
                <Col >/</Col>
                <Col >表单叶</Col>
                <Col >/</Col>
                <Col className={oo}>基础表单</Col>
            </Row>
            <Row  className="R2">
                <Col >基础表单</Col>
            </Row>
            <Row  >
                <Col >表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景</Col>
            </Row>

            <Form
                    wrapperCol={{span:7}}
                    labelCol={{span:8}}
                    name="basic"
                    initialValues={{ remember: true }}
                    >
                    <Form.Item
                        label="标题"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input  placeholder="input placeholder" />
                    </Form.Item>

                    <Form.Item   name="range-time-picker" label="RangePicker[showTime]" {...rangeConfig}>
                         <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                     </Form.Item>

            </Form>
        </div>
    )
}