import React ,{useState,useEffect}from "react"
import { Layout,Tabs,Radio } from 'antd';
const { TabPane } = Tabs;
import "./myself.scss"
import Basic from './content/Basic'
import Safety from './content/Safety'
import AccountNumber from './content/AccountNumber'
import Notice from './content/Notice'

export default props=>{
    let [mode,setMode] = useState("left")
    let [arrList,setArrList] =useState([
        {id:1,leftAside:"基本设置",content:<Basic/>},
        {id:2,leftAside:"安全设置",content:<Safety/>},
        {id:3,leftAside:"账号绑定",content:<AccountNumber/>},
        {id:4,leftAside:"新消息通知",content:<Notice/>}
    ])
    return (
        <div className="xxl-myself">
            <Tabs defaultActiveKey="1" tabPosition={mode} >
                {
                    arrList.map(ele=>(
                        <TabPane key={ele.id} tab={ele.leftAside} >
                            {ele.content}
                        </TabPane>
                    ))
                }
            </Tabs>
        </div>
    )
}