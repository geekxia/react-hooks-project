
let inintState={
    good:'莫莫'
}

export default (state=inintState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action){
        default:
            return state
    }
    return newState
}