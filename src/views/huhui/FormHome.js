import React,{useState} from "react"
import { 
    Steps, 
    Button, 
    message,
    Input,
    Row, 
    Col,
    Alert
} from 'antd'
import { UserOutlined,PayCircleOutlined } from '@ant-design/icons';
const { Step } = Steps

const content1 =<div className="From-input">
    <Row align="middle">
        <Col span={4}>
            <label htmlFor="">付款账户：</label>
        </Col>
        <Col span={20}>
            <Input placeholder="请输入付款帐号" prefix={<UserOutlined />} />
        </Col>
    </Row>
    <Row align="middle">
        <Col span={4}>
            <label htmlFor="">收款账户：</label>
        </Col>
        <Col span={20}>
            <Input placeholder="请输入收款帐号" prefix={<UserOutlined />} />
        </Col>
    </Row>
    <Row align="middle" justify="start">
        <Col span={5}>
            <label htmlFor="">收款人姓名：</label>
        </Col>
        <Col span={19}>
            <Input/>
        </Col>
    </Row>
    <Row align="middle">
        <Col span={4}>
            <label htmlFor="">转账金额：</label>
        </Col>
        <Col span={20}>
            <Input placeholder="请输入转账金额" prefix={<PayCircleOutlined />} />
        </Col>
    </Row>
    <Row align="middle">
        <Col span={4}>
            <label htmlFor="">转账金额：</label>
        </Col>
        <Col span={20}>
            <Input placeholder="请输入转账金额" prefix={<PayCircleOutlined />} />
        </Col>
    </Row>
</div>

const content2=<div className="Form-affirm">
    <Alert message="转账后，资金将直接打入对方账户，无法退回。" type="info" showIcon closable />
</div>

const FormHome = (props)=>{
    let [current,setCurrent]=useState(0)
    let [steps,setSteps]=useState([
        {
          title: '填写转账信息',
          content: content1,
        },
        {
          title: '确认转账信息',
          content: content2,
        },
        {
          title: '完成',
          content: 'Last-content',
        },
      ])
    
    const next = () => {
        setCurrent(current + 1);
    }

    const prev = () => {
        setCurrent(current - 1);
    }
    
    return (
        <div className="HH-Form">
            <h1>Form测试</h1>
            <hr/>
            <div className="From-main">
                <Steps current={current}>
                    {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content" style={{paddingTop:20+"px",paddingBottom:20+"px"}} >{steps[current].content}</div>
                <div className="steps-action">
                    {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        下一步
                    </Button>
                    )}
                    {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        提交
                    </Button>
                    )}
                    {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        上一步
                    </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FormHome