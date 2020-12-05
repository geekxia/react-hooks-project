import React from 'react'
import { 
    Input,
    Row, 
    Col,
} from 'antd';
import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'


const BasicFormTitle = props =>{
    return (
            <div className='title'>
                <Row align='middle' >
                    <Col span={7} className='text-tip'>标题 :</Col>
                    <Col span={10}>
                        <Input 
                        placeholder={initValue.title} 
                        className='input-title'
                        />
                    </Col>  
                </Row>
            </div>
    )
}

export default BasicFormTitle