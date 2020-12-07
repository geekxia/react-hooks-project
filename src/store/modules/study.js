import type from '../actionTypes'

// Reducer
// 是函数，并且是纯函数
// 它是redux的store中发挥核心作用的工具，是真正处理数据的地方
// 必须store，必须要定义reducer
let initState = {
  msg: 'hello 2009',
  foo: {
    count: 0
  },
  loading:true,
  data:[
    {
      key: '1',
      成员姓名: 'John Brown',
      年龄: 32,
      所属部门: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      成员姓名: 'Jim Green',
      年龄: 42,
      所属部门: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      成员姓名: 'Joe Black',
      年龄: 32,
      所属部门: 'Sidney No. 1 Lake Park',
    }
  ],
  data1:
    {
      key: 4,
      成员姓名: 'John Brown',
      年龄: 32,
      所属部门: 'New York No. 1 Lake Park',
    } 
  
}
export default (state=initState, action) => {
  // 第一步，接收store给的信号（干什么、数据）
  // 第二步，数据处理
  // 第三步，把处理完的数据，返回给store
  // console.log('来自于视图组件的action====', action)
  // 深复制
  // let newState = {...state}
  // let newState = Object.assign()
  
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case type.CHANGE_MSG:
      newState.msg = action.payload
      break
    case type.ADD_FOO_COUNT:
      newState.foo.count += action.payload
      break
    case type.FAN:
      newState.loading=action.payload
      break
      case type.DELETE:
      newState.data=JSON.parse(JSON.stringify(newState.data))
      newState.data=newState.data.filter(ele=>ele.key!=action.payload)
      break
    case type.HANDLEADD:
      newState.data1.key+=1
      newState.data=[...newState.data,newState.data1]
      break
    default:
      return state
  }

  return newState
}
