import React from 'react'
import { Card, Avatar, Row, Col } from 'antd'
import { 
  BranchesOutlined,
  EditOutlined,
  EllipsisOutlined,
  VerticalAlignBottomOutlined
} from '@ant-design/icons'
const { Meta } = Card
export default props => {
  let arr = new Array(80)
  for(var i=0;i<80;i++) {
    arr[i] = i
  }
  return (
    <div className='catalogue'>
      <Row gutter={16}>
        {
          arr.map((_, index) => {
            return (
              <Col className="gutter-row" key={index} span={6}>
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <VerticalAlignBottomOutlined  key ='down'/>,
                    <EditOutlined key="edit" />,
                    <BranchesOutlined key="setting" />,
                    <EllipsisOutlined key="ellipsis" />
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                  />
                </Card>
              </Col>
            )
          })
        }
        {/* <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col> */}
      </Row>
     {/* <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <VerticalAlignBottomOutlined  key ='down'/>,
          <EditOutlined key="edit" />,
          <BranchesOutlined key="setting" />,
          <EllipsisOutlined key="ellipsis" />
        ]}
      >
        <Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Card title"
          description="This is the description"
        />
      </Card> */}
    </div>
  )
}