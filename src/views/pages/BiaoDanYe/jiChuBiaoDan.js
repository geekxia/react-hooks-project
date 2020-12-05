import React, { useState, useEffect } from "react";
import scss from "./style.scss";
import {
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Select,
  Button
} from "antd";
const { RangePicker } = DatePicker;
export default (props) => {
  let [oo, setoo] = useState("on");
  let { history } = props;
  const rangeConfig = {
    rules: [{ type: "array", required: true, message: "Please select time!" }],
  };

  function validatePrimeNumber(number) {
    if (number < 10) {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
    return {
      validateStatus: "error",
      errorMsg: "The prime between 0 and 0 is 10!",
    };
  }

  const [number, setNumber] = useState({
    value: 1,
  });

  const onNumberChange = (value) => {
    setNumber({
      ...validatePrimeNumber(value),
      value,
    });
  };
  // 下拉选择
  let [selectedItems, SETselectedItems] = useState([]);
  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const handleChange = (selectedItems) => {
    SETselectedItems(selectedItems);
  };

  return (
    <div>
      <Row justify="start" className="R1">
        <Col>首页</Col>
        <Col>/</Col>
        <Col>表单叶</Col>
        <Col>/</Col>
        <Col className={oo}>基础表单</Col>
      </Row>
      <Row className="R2">
        <Col>基础表单</Col>
      </Row>
      <Row>
        <Col>
          表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景
        </Col>
      </Row>

      <Form wrapperCol={{ span: 7 }} labelCol={{ span: 8 }} name="basic">
        <Form.Item
          label="标题"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item name="range-time-picker" label="起止日期" {...rangeConfig}>
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name={["user", "introduction"]}
          label="目标描述"
          size="large"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={["user", "introduction"]}
          label="衡量标准"
          size="large"
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="权重"
          validateStatus={number.validateStatus}
          help={number.errorMsg}
        >
          <InputNumber
            min={0}
            max={100}
            value={number.value}
            onChange={onNumberChange}
          />
          %
        </Form.Item>
        <Form.Item
          name={["user", "Radio"]}
          label="目标公开"
          size="large"
        >
          <Radio.Group name="Radio" defaultValue={1}>
            <Radio value={1}>目标公开</Radio>
            <Radio value={2}>不公开</Radio>
            <Radio value={3}>部分公开</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="公开给"
        >
          <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item >
            <Row justify="center">
                <Col push={20}>
                  <Button type="primary" htmlType="submit" >
                    提交
                  </Button>
                </Col>
                <Col  push={24}>
                  <Button type="primary" >
                    保存
                  </Button>
                </Col>
              </Row>
       </Form.Item>
      </Form>
    </div>
  );
};
