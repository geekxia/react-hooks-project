import React from 'react'
import { Tabs, Breadcrumb } from 'antd'
import { useHistory } from 'react-router-dom'
export default props => {
  const history = useHistory()
  
  return (
    <div className='baseDetail'>
      <Breadcrumb>
        <Breadcrumb.Item><a onClick={()=>history.push('/')}>Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>detail</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>baseDetail</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}