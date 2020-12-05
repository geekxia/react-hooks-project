import React from 'react'
import { 
    Input,
    Row, 
    Col,
} from 'antd';

import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'

const BasicFormInviterComment = props =>{
    return (
        <div className='inviter-comment'>
            <Row align='middle' >
                <Col span={7} className='text-tip'>邀评人 : 
                    <span className='small-tip'>(选填) 
                    </span>
                </Col>
                <Col span={10}>
                    <Input 
                    placeholder={initValue.inviter} 
                    className='input-title'
                    />
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormInviterComment