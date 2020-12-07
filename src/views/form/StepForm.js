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
    let a={}
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        values?a=values:''
        next()
    }
    
    const tailFormItemLayout = {
        wrapperCol: {
          sm: {
            span: 16,
            offset: 4,
          },
        }
    }
    const selectBefore = (
        <Select defaultValue="支付宝" className="select-before">
          <Option value="支付宝">支付宝</Option>
          <Option value="银行账户">银行账户</Option>
        </Select>
    );
    const [current, setCurrent] = React.useState(0);

    const next = () => {     
        setCurrent(current + 1);
    };
    const init=()=>{
        return (
            <>
                <div>付款账户:{a.payment}</div>
                <div>收款账户{a.collection}</div>
                <div>收款人姓名{a.name}</div>
                <div>转账金额{a.amount}</div>
            </>
        )
    }
    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div>
            <Form form={form} name="register" onFinish={onFinish}>
            <Steps current={current}>
                {steps.map(item => (
                <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content" style={{display:'flex',justifyContent:'center'}} >
                {current==0 &&<div style={{width:450+'px'}}>
                    
                    

                    
                        <Form.Item
                            name="payment"
                            label="付款账户"
                            initialValue="abc@qq.com"
                            rules={[
                            {
                                required: true,
                                message:'111',
                            },
                            ]}
                        >
                            <Select className='select_form' style={{display:"inline-block"}} >
                                <Option>abc@qq.com</Option>              
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="collection"
                            label="收款账户"
                            rules={[
                            {
                                required: true,
                                message:'请输入收款人账户'
                            },
                            ]}
                        >
                            <Input addonBefore={selectBefore} value="mysite"/>
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="收款人姓名"
                            rules={[
                            {
                                required: true,
                                message: '请输入收款人姓名!',
                            },
                            
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                            label="转账金额"
                            rules={[
                            {
                                required: true,
                                message: '请输入转账金额!',
                            },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        
                        
                </div>
                }
                {
                    current==1&&<div>
                    {init()}
                </div>
                
                    
                }
                
                
            </div>
            



            <div className="steps-action">
                {current < steps.length - 1 &&(
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" >
                        Next
                    </Button>
                </Form.Item>
                
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
            </Form>
        </div>
    )
}