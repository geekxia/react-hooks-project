import { Result, Button, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const { Paragraph, Text } = Typography;

export default props=>{
    return(
        <div>
            <Result
                status="error"
                title="提交失败"
                subTitle="请核对并修改以下信息后，再重新提交。"
                extra={[
                <Button type="primary" key="console">
                    返回修改
                </Button>
                ]}
            >
            <div className="desc">
                <Paragraph>
                    <Text
                    style={{
                        fontSize: 16,
                    }}
                    >
                    您提交的内容有如下错误:
                    </Text>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined className="site-result-demo-error-icon" /> 您的账户已被冻结&nbsp;&nbsp;&nbsp;<a>立即解冻 &gt;</a>
                </Paragraph>
                <Paragraph>
                    <CloseCircleOutlined className="site-result-demo-error-icon" /> 您的账户还不具备申请资格&nbsp;&nbsp;&nbsp;<a>立即升级 &gt;</a>
                </Paragraph>
            </div>
            </Result>
        </div>
    )
}