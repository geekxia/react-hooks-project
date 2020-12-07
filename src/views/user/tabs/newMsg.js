import React from 'react'
import { Switch } from 'antd'
export default props => {
  return (
    <div className='newMsg'>
      
      <h1>新消息通知</h1>
      <div>
        <h3>账户密码</h3>
        <p>其他用户的消息将以站内信的形式通知<span><Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /></span></p>
      </div>
      <div>
        <h3>系统消息</h3>
        <p>系统消息将以站内信的形式通知<span><Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /></span></p>
      </div>
      <div>
        <h3>待办任务</h3>
        <p>待办任务将以站内信的形式通知<span><Switch checkedChildren="开" unCheckedChildren="关" defaultChecked /></span></p>
      </div>
    </div>
  )
}