import React from 'react'
import { 
    Input,
    Row, 
    Col,
} from 'antd';

import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'


const { TextArea } = Input


const BasicFormYardStick = props =>{
    return (
        <div className='yard-stick'>
            <Row >
                <Col span={7} className='text-tip'>衡量标准 :</Col>
                <Col span={10}>
                    <TextArea  placeholder={initValue.yardStick}  />
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormYardStick