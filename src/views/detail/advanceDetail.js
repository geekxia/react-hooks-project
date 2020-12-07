import React from 'react'
import { Tabs, Breadcrumb } from 'antd'
import { useHistory } from 'react-router-dom'
export default props => {
  const history = useHistory()
  return (
    <div className='advanceDetail'>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>Home</a></Breadcrumb.Item>
        <Breadcrumb.Item>
          <a onClick={() => history.replace('/baseDetail')}>detail</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>advanceDetail</a>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}