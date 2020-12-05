import React from 'react'
import { 
    Row, 
    Col,
    InputNumber
} from 'antd';
import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'


const BasicFormWeight = props =>{
    return (
        <div className='weight'>
            <Row align='middle' >
                <Col span={7} className='text-tip'>权重 : 
                    <span className='small-tip'>(选填) 
                    </span>
                </Col>
                <Col span={10}>
                    <InputNumber 
                    min={0} 
                    max={100}  
                    defaultValue={initValue.weight}
                    /> %
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormWeight