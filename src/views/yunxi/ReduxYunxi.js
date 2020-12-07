import React from 'react'
import {
    useSelector
}from 'react-redux'

export default props=>{
    const good = useSelector(store=>store.yunxi.good)
    return(
        <div>
            <h1>云兮工作呀</h1>
            <hr />
            <h1>{good}</h1>

            
        </div>
    )
}