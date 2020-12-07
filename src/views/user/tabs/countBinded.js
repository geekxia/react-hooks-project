import React from 'react'
import { TaobaoCircleOutlined, AlipaySquareFilled, DingdingOutlined } from '@ant-design/icons'
export default props => {
  return (
    <div className='countBinded'>
      <h1>账户绑定</h1>
      <div>
        <TaobaoCircleOutlined  style={{ fontSize: '60px',color: "red" }} />
        <div>
          <h3>绑定淘宝</h3>
          <p>当前未绑定淘宝账号<span>绑定</span></p>
        </div>
      </div>
      <div> 
        <AlipaySquareFilled style={{ fontSize: '60px', color: "skyblue" }} />
        <div>
          <h3>绑定支付宝</h3>
          <p>当前未绑定支付宝账号<span>绑定</span></p>
        </div>
      </div>
      <div>
        <DingdingOutlined style={{ fontSize: '60px',color: "skyblue" }} />
        <div>
          <h3>绑定钉钉</h3>
          <p>当前未绑定钉钉号<span>绑定</span></p>
        </div>
      </div>
    </div>
  )
}