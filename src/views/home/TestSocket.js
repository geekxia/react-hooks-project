// 短连接：HTTP  无状态的前后端通信
// 长连接：一旦连接上，前后端不断开的通信

import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import './style.scss'

let socket = null
let count = 0

export default props => {

  let [msg, setMsg] = useState('')
  let [list, setList] = useState([])
  let [chatStr, setChatStr] = useState('<div>9292983</div>')

  useEffect(()=>{
    socket = io('http://10.20.158.74:8888')
    socket.on('connect', ()=>{
      console.log('socket连接成功')
    })
    // 订阅发布模式
    socket.on('client', msg=>{
      console.log('收到了服务器的消息', msg)
      chatStr += `<div class='row'>${msg}</div>`
      setChatStr(JSON.parse(JSON.stringify(chatStr)))
    })
    return ()=>{
      socket = null
    }
  }, [])

  const send = ()=> {
    if(msg.trim()) {
      socket.emit('server', msg)
    }
    setMsg('')
  }
  const confirm = e => {
    if(e.keyCode === 13) {
      if(msg.trim()) {
        socket.emit('server', msg)
      }
      setMsg('')
    }
  }

  const test = e => {
    console.log('e', e.target.value)
  }

  

  return (
    <div>
      <h1>测试长连接</h1>
      <div className='chat-box' dangerouslySetInnerHTML={{__html: chatStr}}></div>
      <div>
        <input
          type="text"
          value={msg}
          onChange={e=>setMsg(e.target.value)}
          onKeyUp={e=>confirm(e)}
        />
        <button onClick={()=>send()}>发送</button>
      </div>
    </div>
  )
}
