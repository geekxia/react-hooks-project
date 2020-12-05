import React from 'react'
import { 
    Input,
    Row, 
    Col,
} from 'antd';
import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'

const { TextArea } = Input


const BasicFormDesc = props =>{
    return (
        <div className='desc-area'>
            <Row >
                <Col span={7} className='text-tip'>目标描述 :</Col>
                <Col span={10}>
                <TextArea  placeholder={initValue.desc} />
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormDesc