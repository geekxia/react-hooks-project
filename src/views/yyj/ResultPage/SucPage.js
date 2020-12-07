import { Result, Button, Typography, Steps, Popover, Row, Col } from 'antd';


const { Paragraph, Text } = Typography;
const { Step } = Steps;
const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

export default props=>{
    return(
        <div>
            <Result
                status="success"
                title="提交成功!"
                subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
                extra={[
                <Button type="primary" key="goBack">返回列表</Button>,
                <Button key="look">查看项目</Button>,
                <Button key="print">打印</Button>
                ]}
            >
            <div className="desc">
                <Paragraph>
                    <Text
                    strong
                    style={{
                        fontSize: 16,
                    }}
                    >
                    项目名称
                    </Text>
                </Paragraph>
                <div className='SucRow'>
                    <Row>
                        <Col span={8}>项目 ID: 666666</Col>
                        <Col span={8}>负责人: 康同志</Col>
                        <Col span={8}>生效时间: 2020-12-6~2100-12-6</Col>
                    </Row>
                </div>
                <Steps current={1} progressDot={customDot}>
                    <Step title="创建项目" subTitle="颜小弟" description="2020-12-06 14:00" />
                    <Step title="部门初审" subTitle="赵雨溪" />
                    <Step title="财务复核" subTitle="景雨溪" />
                    <Step title="完成" subTitle="康雨溪" />
                </Steps>
            </div>
            </Result>
        </div>
    )
}