import React from 'react'
import { 
    Input,
    Row, 
    Col,
} from 'antd';

//icon
import {
    InfoCircleOutlined
} from '@ant-design/icons'

import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'


const BasicFormCustomComment = props =>{
    return (
        <div className='custom-comment'>
            <Row align='middle' >
                <Col span={7} className='text-tip'>客户 : 
                    <span className='small-tip'>(选填) 
                        <InfoCircleOutlined/>
                    </span>
                </Col>
                <Col span={10}>
                    <Input 
                    placeholder={initValue.custom}
                    className='input-title'
                    />
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormCustomComment