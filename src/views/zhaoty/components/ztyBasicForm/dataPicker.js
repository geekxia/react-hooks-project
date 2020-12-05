import React from 'react'
import { 
    Row, 
    Col,
    InputNumber,
    DatePicker,

} from 'antd';
import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'

const { RangePicker } = DatePicker


const BasicFormDataPicker = props =>{
    return (
        <div className='data-pick'>
            <Row align='middle' >
                <Col span={7} className='text-tip'>起止日期 :</Col>
                <Col span={10}>
                    <RangePicker
                    placeholder={initValue.date}
                    />
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormDataPicker