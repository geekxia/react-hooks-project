import { Row, Col } from 'antd';

export default (props) => {
    return (
        <div className="onefour">
            <h1>onefour</h1>
            <hr/>
            <Row>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
                <Col span={8}>col-8</Col>
            </Row>
        </div>
    )
}