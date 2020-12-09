import React from 'react'
import { Button } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'

export default props => {
  const logOut=()=>{
    localStorage.removeItem("token")
    location.reload()
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