import React from 'react'
import loadable from '@loadable/component'
const Label = loadable(()=> import('@/views/user/label/label.js'))
const Article = loadable(()=> import('@/views/user/tabs/article.js'))
const Catalogue = loadable(()=> import('@/views/user/tabs/catalogue.js'))
const Project = loadable(()=> import('@/views/user/tabs/project.js'))

import { 
  Avatar,
  Row,
  Col,
  Tabs
 } from 'antd'
const { TabPane } = Tabs
import {
  PlusOutlined,
  DotChartOutlined,
  BellFilled ,
  AlipaySquareFilled,
  Html5Filled,
  ClusterOutlined,
  ContactsOutlined,
  InfoCircleOutlined, 
  DislikeOutlined,
  FileUnknownOutlined,
  HeartOutlined, 
  MessageOutlined, 
  StarOutlined,
  UserOutlined,
  SearchOutlined,
  TaobaoCircleOutlined, 
  DingdingOutlined,
  SmallDashOutlined,
  VerticalAlignBottomOutlined,
  EditOutlined,
  BranchesOutlined,
  GithubOutlined
} from '@ant-design/icons'
const IconStyle = {
  height: "2em",
  width: "2em",
}
function TabsChange () {}
export default props => {
  return (
    <div className='userCenter'>
      {/* <div className=''></div> */}
      <div className='userCenter-left'>
        <div className='Headphoto'>
          <Avatar size={150} icon={<UserOutlined />} src='http://localhost:9000/img/1.jpg'/>
          <h1>Liu liu</h1>
          <h3>Liu liu</h3>
        </div>
        <div className='userCenter-left-middle'>
          <p><ContactsOutlined style={IconStyle}/> 交互专家</p>
          <p><ContactsOutlined style={IconStyle}/> 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
          <p><ContactsOutlined style={IconStyle}/> 深圳宝安草围社区</p>
        </div>
        <div className='userCenter-left-tag'>
          <Label/>
        </div>
        <div className='userCenter-left-team'>
          <Row>
            <Col span={8}>
              <span>
                <AlipaySquareFilled />
              </span>
              <span className='text'>
                我是支付宝
              </span>
            </Col>
            <Col span={8} offset={4}>
              <span>
                <TaobaoCircleOutlined/>
              </span>
              <span className='text'>
                淘宝是我老大
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <span>
                <AlipaySquareFilled />
              </span>
              <span className='text'>
                我是支付宝
              </span>
            </Col>
            <Col span={8} offset={4}>
              <span>
                <TaobaoCircleOutlined/>
              </span>
              <span className='text'>
                淘宝是我老大
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <span>
                <AlipaySquareFilled />
              </span>
              <span className='text'>
                我是支付宝
              </span>
            </Col>
            <Col span={8} offset={4}>
              <span>
                <TaobaoCircleOutlined/>
              </span>
              <span className='text'>
                淘宝是我老大
              </span>
            </Col>
          </Row>
        </div>
      </div>
      <div className='userCenter-right'>
      <Tabs defaultActiveKey="1" onChange={TabsChange}>
        <TabPane tab="文章" key="1">
          <Article></Article>
        </TabPane>
        <TabPane tab="目录" key="2">
          <Catalogue></Catalogue>
        </TabPane>
        <TabPane tab="项目" key="3">
          <Project></Project>
        </TabPane>
      </Tabs>
      </div>
    </div>
  )
}