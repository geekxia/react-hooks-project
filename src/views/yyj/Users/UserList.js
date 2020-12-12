import { Table, Tag, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import action from '@/store/actions'
import moment from 'moment'
import { useEffect } from 'react';
export default props => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(action.getUserList())
        return undefined
    }, [])
    const UsersList = useSelector(store => store.users.userList)
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            render: text => <a>{text}</a>,
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'tags',
            key: 'tags',
            align: 'center',
            render: (text, row) => (
                <Space>
                    <Button
                        type="primary"

                    >
                        编辑
                    </Button>
                    <Button
                        type="primary"
                        danger
                    >
                        删除
                    </Button>
                </Space>
            )
        }
    ];
    return (
        <div className='qf-userlist'>
            <h1>用户列表:</h1>
            <div style={{ margin: '30px 0' }}>
                <Table
                    columns={columns}
                    dataSource={UsersList.list}
                    rowKey='_id'
                />
            </div>
        </div>
    )
}