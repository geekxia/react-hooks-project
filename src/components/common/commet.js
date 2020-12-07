import React from 'react'
import { Descriptions, Tag } from 'antd'
import { 
  StarOutlined,
  DislikeOutlined,
  MessageOutlined,
  TaobaoCircleOutlined
 } from '@ant-design/icons'
export default props => {
function preventDefault () {}
  return (
    <div className='commet'>
      {/* <Descriptions title="apply">
      </Descriptions> */}
      <h3>apply</h3>
      <div className='main'>
        <Tag>Tag 1</Tag>
        <Tag>
          阿汤哥
        </Tag>
        <Tag closable>
          Tag 2
        </Tag>
      </div>
      <div className='text'>
        utWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWASBDUAS一洒比很高大傻逼大哥回家啊帅哥回家啊帅哥擦就是德国时间
      </div>
      <div className='bottom'>
        <div>
          <span>
            <TaobaoCircleOutlined></TaobaoCircleOutlined>
          </span>
          <span className='bottom-user'> &nbsp;lyj:</span>
          <span>&nbsp;&nbsp;发布于 https://ant.design&nbsp;&nbsp;&nbsp;&nbsp;2020-12-05 09:44</span>
        </div>
        <div>
          <span>
            <StarOutlined></StarOutlined>&nbsp;&nbsp;&nbsp;1220
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;<DislikeOutlined></DislikeOutlined>&nbsp;1230
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;<MessageOutlined></MessageOutlined>&nbsp;1000
          </span>
        </div>
      </div>
    </div>
  )
}