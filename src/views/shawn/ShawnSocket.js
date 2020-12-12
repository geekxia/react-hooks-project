

import React,{useState,useEffect} from 'react'
import io from 'socket.io-client'
import '@/assets/css/common.scss'

let socket = null
let count = 0


export default props => {
  let [msg, setMsg] = useState('')
  let [list, setList] = useState([])
  let [chatStr, setChatStr] = useState('<div>9292983</div>')

  useEffect(()=>{
    socket = io('http://10.20.158.171:8888')
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
      <h1>长连接socket</h1>
      <hr/>
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