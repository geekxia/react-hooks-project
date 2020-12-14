import React from 'react'

import { Statistic, Row, Col, Card} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

export default class Analysisi extends React.Component{
    render(){
        return(
            <div className="site-statistic-demo-card">
            <Row gutter={16}>
                <Col span={6}>
                    <Statistic title="总额销售" value={'¥'+126560} />
                    
                    <Card span={2}>
                        <Statistic
                        title="周同比"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                    </Card>
                    <Card>  
                        <Statistic
                        title="日同比"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                        />    
                    </Card>
                </Col>
                <Col span={6}>
                    <Statistic title="访问量" value={9946} />
                    
                    <Card span={4}>
                        <Statistic
                        title="周同比"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                    </Card>
                    <Card span={4}>
                        <Statistic
                        title="日同比"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Statistic title="支付笔数" value={6565} />
                    
                    <Card span={4}>
                        <Statistic
                        title="周同比"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                    </Card>
                    <Card span={4}>
                        <Statistic
                        title="日同比"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Statistic title="营运活动效果" value={78+"%"} />
                    
                    <Card span={4}>
                        <Statistic
                        title="周同比"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="%"
                        />
                    </Card>
                    <Card span={4}>
                        <Statistic
                        title="日同比"
                        value={9.3}
                        precision={2}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                        suffix="%"
                        />
                    </Card>
                </Col>
               
                
              
                
              
                </Row>
            </div>
        )
    }
}

// ReactDOM.render(
//     <div className="site-statistic-demo-card">
//       <Row gutter={16}>
//         <Col span={12}>
//           <Card>
//             <Statistic
//               title="Active"
//               value={11.28}
//               precision={2}
//               valueStyle={{ color: '#3f8600' }}
//               prefix={<ArrowUpOutlined />}
//               suffix="%"
//             />Card
//           </Card>
//         </Col>
//         <Col span={12}>
//           <Card>
//             <Statistic
//               title="Idle"
//               value={9.3}
//               precision={2}
//               valueStyle={{ color: '#cf1322' }}
//               prefix={<ArrowDownOutlined />}
//               suffix="%"
//             />
//           </Card>
//         </Col>
//       </Row>
//     </div>,
//     mountNode,
//   );
// render(
    
//     mountNode,
//   );


// export default  props =>{
//     return(
//         <div>
//             <h1>分析页</h1>
//             <hr/>
//             <ReactDOM/>
//         </div>
//     )
// }