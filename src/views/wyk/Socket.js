import io from 'socket.io-client'
import {useEffect} from 'react'

let socket = null

export default props=>{

  useEffect(()=>{
    socket = io('http://10.20.158.45:8888');
    socket.on('connect',()=>{
      console.log('socket连接成功')
    })
    return undefined
  },[])
  return (
    <div>
      <h1>socket</h1>
    </div>
  )
}