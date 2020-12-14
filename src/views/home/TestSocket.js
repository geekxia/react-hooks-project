// 短连接：HTTP 无状态的前后端通信
// 长连接：一旦连接上，前后端不断开的通信

import io from 'socket.io-client';

import { useEffect } from 'react'

export default props => {

    useEffect(()=>{
        const socket = io();
        return undefined
    })
    
    return (
        <div>
            <h1>测试长连接</h1>
            <div>
                <input type="text"/>
                <button onClick={()=>send()}>发送</button>
            </div>
        </div>
    )
}