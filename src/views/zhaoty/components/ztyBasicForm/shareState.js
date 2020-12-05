import React ,{useState}from 'react'
import { 
    Row, 
    Col,
    Radio ,
    Select,
    Space
} from 'antd';
import {basicFormInitValue as initValue}from '@/views/zhaoty/ZTYCONSTANT'

const BasicFormShareState = props =>{
     // 定义radio的数据
    const [value, setValue] = useState(1);

    const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    };

    //定义select的数据
    const children = [
        {id:1,name:'张三'},
        {id:2,name:'李四'},
        {id:3,name:'王五'}
    ];
    return (
        <div className='share-state'>
            <Row >
                <Col span={7} className='text-tip'>
                    目标公开 :
                </Col>
                <Col span={10}>
                    <Space>
                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={1}>公开</Radio>
                            <Radio value={2}>部分公开</Radio>
                            <Radio value={3}>不公开</Radio>
                        </Radio.Group>
                    </Space>
                    {
                        value===2 && 
                        <Select mode="tags" 
                        style={{ width: '100%',marginTop:'10px' }} 
                        placeholder={initValue.select}>
                        {children.map(ele=>{
                            return (
                            <Select.Option key={ele.id}>{ele.name}</Select.Option> 
                            )
                        })}
                        </Select>
                    }
                </Col>  
            </Row>
        </div>
    )
}

export default BasicFormShareState