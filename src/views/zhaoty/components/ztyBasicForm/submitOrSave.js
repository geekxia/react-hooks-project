import React from 'react'
import { 
    Button,
    Row, 
    Col,
    Space
} from 'antd';

import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'

const BasicFormSubmitOrSave = props =>{
    return (
        <div className='button'>
            <Row align='middle' >
                <Col span={7} className='text-tip'></Col>
                <Col span={10}>
                    <Space>
                        <Button type='primary' size='middle'>{initValue.submit}</Button>
                        <Button size='middle'>{initValue.save}</Button>
                    </Space>
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormSubmitOrSave