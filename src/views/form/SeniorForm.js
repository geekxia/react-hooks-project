import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Space } from 'antd';
const originData = [];
import FormHead from './FormHead';

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: '张三',
    jobNum: `${i}`,
    department: 'computer'
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input placeholder={title}/>;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入 ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const SeniorForm = props => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const senior = '高级表单'
  const isEditing = (record) => record.key === editingKey;
  console.log('data',[...data])
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      jobNum: '',
      department: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const handleDelete = key => {
    
    const [dataSource,setDataSource] = useState(data);
    setDataSource(dataSource.filter(item => item.key !== key));
  };
  const handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  const columns = [
    {
      title: '成员姓名',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '工号',
      dataIndex: 'jobNum',
      width: '20%',
      editable: true,
    },
    {
      title: '所属部门',
      dataIndex: 'department',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      // render: (text, record) =>
      //     this.state.dataSource.length >= 1 ? (
      //       <Space>
      //         !editable ?<Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
      //           <a>Delete</a>
      //         </Popconfirm>
      //       </Space>
            
      //     ) : null,
      
      render: (_,record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="是否要取消更改?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                编辑
              </a>
              <Popconfirm title="确定要删除吗？" onConfirm={() => handleDelete(record.key)}>
                <a>删除</a>
              </Popconfirm>
          </Space>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div>
      <FormHead formType={senior}>
        <p>高级表单常见于一次性输入和提交大批量数据的场景。</p>
      </FormHead>
      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    
    </div>
    
  );
};

export default SeniorForm;