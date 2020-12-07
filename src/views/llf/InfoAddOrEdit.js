import { 
    Form,
    Input, 
    Button,
    Select 
    } from 'antd';

//form表单布局
const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };
const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  //下拉选项
const { Option } = Select;


const InfoAddOrEdit=props=>{

    const Demo = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form
        {...layout}
        style={{margin:'25px 0'}}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
        <Form.Item
            label="商品名称"
            name="name"
            rules={[
             { required: true, message: '商品名称是必填的哦!' },
             { max:10,message:'商品名称不能超过10个字' },
             { min:2,message:'商品名称不能少于两个字'}
            ]}
        >
            <Input />
        </Form.Item>
    
        <Form.Item
            label="商品描述"
            name="desc"
            rules={[
             { required: true,message: '商品描述是必填的哦!'},
             { max:30,message:'商品名称不能超过30个字' },
             { min:6,message:'商品名称不能少于6个字'}
            ]}
        >
            <Input />
        </Form.Item>
        
        <Form.Item
            label="选择品类"
            name="cate"
            rules={[
             { required: true,message: '必须要选择品类哦!'},
            ]}
        >
         <Select
            showSearch
            style={{ width: 200 }}
            placeholder="选择品类"
            allowClear={true}
        >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
         </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
             提交
            </Button>
        </Form.Item>
        </Form>
    );
    };
      
    return (
        <div className='llf-AddOrEdit'>
        <div>测试商品新增页</div>
        <Demo />
        </div>
    )
}
export default InfoAddOrEdit