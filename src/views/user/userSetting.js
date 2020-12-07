import React, {  useState } from 'react'
import loadable from '@loadable/component'
const SafeSetting = loadable(()=> import('@/views//user/tabs/safeSetting'))
const BaseSetting = loadable(()=> import('@/views/user/tabs/baseSetting'))
const CountBinded = loadable(()=> import('@/views/user/tabs/countBinded'))
const NewMsg = loadable(()=> import('@/views/user/tabs/newMsg'))
import { 
  Tabs
} from 'antd'
const { TabPane } = Tabs
export default props => {
  function TabsChange(){}
  const tabPosition = 'left'
  return (
    <div className='userSetting'>
      {/* <Space style={{ marginBottom: 24 }}>
          Tab position:
          <Radio.Group value={tabPosition} onChange={this.changeTabPosition}>
            <Radio.Button value="top">top</Radio.Button>
            <Radio.Button value="bottom">bottom</Radio.Button>
            <Radio.Button value="left">left</Radio.Button>
            <Radio.Button value="right">right</Radio.Button>
          </Radio.Group>
        </Space> */}
        <div>
        <Tabs tabPosition={tabPosition} defaultActiveKey='1'>
          <TabPane tab="基本设置" key="1" >
            <BaseSetting />
          </TabPane>
          <TabPane tab="安全设置" key="2">
            <SafeSetting />
          </TabPane>
          <TabPane tab="账户绑定" key="3">
            <CountBinded />
          </TabPane>
          <TabPane tab="新消息通知" key="4" >
            <NewMsg />
          </TabPane>
        </Tabs>
        </div>

    </div>
  )
}