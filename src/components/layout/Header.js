import React from 'react'
import { 
  Button,
  Modal
} from 'antd'
import { 
  PoweroffOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

const { confirm } = Modal

export default props => {

  const logOut=()=>{
    confirm({
      title: '您确定要退出吗?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        localStorage.removeItem("token")
        location.reload()
      },
      onCancel() {
        // console.log('Cancel');
      },
      centered:true,
      okText:"确定",
      cancelText:"取消"
    })
  }

  return (
    <div className='qf-header' style={{textAlign:"right"}} >
        <Button
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={()=>logOut()}
        />
    </div>
  )
}