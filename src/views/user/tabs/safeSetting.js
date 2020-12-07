import React from 'react'
export default props => {
  return (
    <div className='safeSetting'>
      <h1>安全设置</h1>
      <div>
        <h3>密码强度</h3>
        <p>当前密码强度：：那是非常的强啊<span>绑定</span></p>
      </div>
      <div>
        <h3>密保手机</h3>
        <p>已绑定手机：：138****8293<span>绑定</span></p>
      </div>
      <div>
        <h3>密保问题</h3>
        <p>未设置密保问题，密保问题可有效保护账户安全<span>设置</span></p>
      </div>
      <div>
        <h3>备用邮箱</h3>
        <p>已绑定邮箱：：ant***sign.com<span>绑定</span></p>
      </div>
      <div>
        <h3>MFA 设备</h3>
        <p>未绑定 MFA 设备，绑定后，可以进行二次确认<span>修改</span></p>
      </div>
    </div>
  )
}