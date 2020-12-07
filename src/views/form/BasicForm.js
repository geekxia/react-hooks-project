import React, { useEffect,useState } from 'react';

import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  InputNumber,
} from 'antd';

import FormHead from './FormHead';
import action from '@/store/actions';

const { RangePicker } = DatePicker;
import { InfoCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
import {
  useSelector,
  useDispatch
} from 'react-redux';


const BasicForm = props=>{
  const childrenArr = useSelector(store=>store.bafo.children)
  const children =[];
  let [checken,setChecken] = useState('');
  console.log('children.length',children.length)
  const dispatch = useDispatch();//派发，派发的是actions
  const basic = '基础表单';

  childrenArr.map(ele=>{
    children.push(<Option key={ele.id}>{ele.name}</Option>);
  })

  function handleChange(value) {
    console.log(`selected ${value}`);
    
  }
  function radioChange(e){
    console.log('e.target.value',e.target.value)
    switch(e.target.value){
      case 'a':
        setChecken('');
      break;
      case 'b':
        setChecken('b');
      break;
      case 'c':
        setChecken('');
      break;
      default:
        setChecken('');
    }
  }
  
  useEffect(()=>{
    let childrenArr = [
      {name:'甲',id:1},
      {name:'乙',id:2},
      {name:'丙',id:3}
    ];

    dispatch(action.selectFriendAction(childrenArr))
    return undefined
  },[])
  return(
    <div>
        <FormHead formType={basic}>
          <p>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</p>
        </FormHead>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
        >
          <Form.Item 
            label=" 目标："
            name="target"
            rules={[{ required: true, message: '请输入标题!' }]}
          >
           <Input placeholder="给目标取个名字" />
          </Form.Item>
          <Form.Item 
            label="起止日期："
            name="date"
            rules={[{ required: true, message: '请输入起止日期!' }]}
          >
          <RangePicker 
            showTime 
          />
          </Form.Item>
          <Form.Item 
            label="目标描述"
            name="goalState"
            rules={[{ required: true, message: '请输入目标描述' }]}
          >
            <Input.TextArea placeholder='请输入您的阶段性任务目标' style={{height:98}}/>
          </Form.Item>
          <Form.Item 
            label="运动感想"
            name="sportThought"
            rules={[{ required: true, message: '请输入运动感想' }]}
          >
            <Input.TextArea placeholder='请写上您的打篮球体验' style={{height:98}}/>
          </Form.Item>
          <Form.Item 
            tooltip={{ title: '（可选）'+'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
            label=" 客户"
            >
           <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
          </Form.Item>
          <Form.Item 
            tooltip={{ title: '（可选）'+'Tooltip with customize icon', icon: <InfoCircleOutlined /> }}
            label=" 客户"
            >
           <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />
          </Form.Item>
          <Form.Item 
            label="邀评人"
            >
           <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
          </Form.Item>
          <Form.Item 
            label="权重"
          >
            <Form.Item name="input-number" noStyle placeholder='请描述你服务的客户，内部客户直接 @姓名／工号'>
              <InputNumber min={0} max={100} style={{width:88,height:30}}/>
            </Form.Item>
            <span className="ant-form-text">%</span>
          </Form.Item>
          <Form.Item label="目标公开" extra="客户、邀评人默认被分享">
            <Radio.Group>
              <Radio value="a" onChange={(e)=>radioChange(e)}>公开</Radio>
              <Radio value="b" onChange={(e)=>radioChange(e)}>部分公开</Radio>
              <Radio value="c" onChange={(e)=>radioChange(e)}>不公开</Radio>
            </Radio.Group>
            {
              checken==='b' && 
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%',dispaly:'none'}}
                placeholder="公开给"
                onChange={handleChange}
              >
                {children}
              </Select>
            }
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="submit" htmlType="submit">
              提交
            </Button>
            <Button htmlType="button">
              保存
            </Button>
          </Form.Item>
        </Form>
    </div>
  )
}

export default BasicForm;