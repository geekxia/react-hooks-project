import React from 'react'

import { 
    Steps, 
    Button, 
    message,
    Form,
    Input,
    Select,

} from 'antd';
const { Option } = Select

const { Step } = Steps;


const steps = [
    {
      title: '填写转账信息',
      content: 'First-content',
    },
    {
      title: '确认转账信息',
      content: 'Second-content',
    },
    {
      title: '完成',
      content: 'Last-content',
    }
]


export default props=>{
    const selectBefore = (
        <Select defaultValue="支付宝" className="select-before">
          <Option value="支付宝">http://</Option>
          <Option value="银行账户">https://</Option>
        </Select>
    );
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div>
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content" style={{display:'flex',justifyContent:'center'}} >
                {current==0 && <div style={{width:450+'px'}}>
                    <div style={{display:"inline-block"}}>付款账户:</div>
                    <Select value='abc@qq.com'  className='select_form' style={{display:"inline-block"}}>
                        <Option>abc@qq.com</Option>              
                    </Select>
                    
                    <div style={{display:"inline-block",marginTop:20+'px'}}>收款账户: </div>
                    <Input addonBefore={selectBefore} defaultValue="mysite" style={{width:370+'px',display:"inline-block",marginTop:20+'px'}} />
                    
                    <div style={{display:"inline-block",marginTop:20+'px'}}>收款人姓名:</div>
                        <Input value="Alex" style={{width:370+'px',display:"inline-block",marginTop:20+'px'}} />

                    <div style={{display:"inline-block",marginTop:20+'px'}}>转账金额:</div>
                    <Input prefix="￥" value="500" style={{width:370+'px',display:"inline-block",marginTop:20+'px'}} />
                    
                </div>
                }
                {
                    current==1
                }
                
                
            </div>
            



            <div className="steps-action">
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
                )}
                {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Previous
                </Button>
                )}
            </div>
        </div>
    )
}