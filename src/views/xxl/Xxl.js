import React,{ useState }  from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  InputNumber,
  Space,
  Tooltip
} from 'antd';
import { InfoCircleOutlined, } from '@ant-design/icons';
import action from '@/store/actions'
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default props=>{
    // console.log(props)
    const [componentSize, setComponentSize] = useState('default');
    const proArr = useSelector(store=>(store.xxlProject.proArr))
    const [myTitle,setMyTitle] = useState('')
    const [myTarget,setMytarget] = useState("")
    const [myStandard,setMyStandard] = useState("")
    const dispatch = useDispatch()

    

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const onchange = (e,key)=>{
        if(key==="title"){
            setMyTitle(e.target.value)
        }
        if(key==="target"){
            setMytarget(e.target.value)
        }
        if(key==="standard"){
            setMyStandard(e.target.value)
        }
        
    }
    const onSubmitMsg = ()=>{
        let obj = {}
        obj.id = Date.now()
        obj.myTitle=myTitle
        obj.myTarget=myTarget
        obj.myStandard=myStandard
        console.log(obj)
        dispatch(action.addPro(obj))
    }
    return (
        <div className="xxl-form">
            <h2>填写项目资料：</h2>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <Form.Item label="表单大小" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">小</Radio.Button>
                        <Radio.Button value="default">中</Radio.Button>
                        <Radio.Button value="large">大</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="标题">
                    <Input placeholder="给目标起个名字" value={myTitle} onChange={(e)=>onchange(e,"title")}/>
                </Form.Item>

                <Form.Item label="起始日期">
                    <Space direction="vertical" size={12}>
                        <RangePicker placeholder='开始日期'/>
                    </Space>
                </Form.Item>

                <Form.Item label="目标描述">
                    <TextArea rows={4} placeholder='请输入你的阶段性工作目标' value={myTarget} onChange={(e)=>onchange(e,"target")}/>
                </Form.Item>

                <Form.Item label="衡量标准">
                    <TextArea rows={4} placeholder='请输入衡量标准' value={myStandard} onChange={(e)=>onchange(e,"standard")}/>
                </Form.Item>

                <Form.Item 
                    label={
                        <Tooltip title="目标的服务对象">
                            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                >
                    <Input placeholder="请描述你的客户，内部客户直接@姓名/工号"/>
                </Form.Item>

                <Form.Item 
                    label="邀评人(选填)"
                >
                    <Input placeholder="请直接@姓名/工号，最多可邀请5人"/>
                </Form.Item>

                <Form.Item label="权重">
                    <InputNumber placeholder="请输入"/> %
                </Form.Item>

                <Form.Item label="目标公开">
                    <Radio.Group >
                        <Radio value={1}>公开</Radio>
                        <Radio value={2}>部分公开</Radio>
                        <Radio value={3}>不公开</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item className="xxl-submi">
                    <Button onClick={()=>onSubmitMsg()}>提交</Button>
                    <Button onClick={()=>onSubmitMsg()}>保存</Button>
                </Form.Item>
            </Form>
            <hr/>
            <h2>展示项目资料：</h2>
            {
                proArr.map(ele=>(
                    <div key={ele.id}>
                        <span>{ele.myTitle}</span>
                        <span>-------</span>
                        <span>{ele.myTarget}</span>
                        <span>-------</span>
                        <span>{ele.myStandard}</span>
                    </div>
                ))
            }
        </div>
    )
}