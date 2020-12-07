// import React ,{Component} from 'react'
// import { withRouter } from "react-router"
// function breadInfo (WrappedComponent){
//     return class extends Component{
//         constructor(props){
//             super(props)
//             this.state={
//                 info:{}
//             }
//         }
//         componentDidMount(){
//             this.setState(state=>{
//                 return {
//                     info:{
//                         id:999,
//                         name:'我是小李白',
                        
//                     }
//                 }
//             })
//         }
//         render(){
//             let {info} = this.state
//             return (
//                 <div>
//                     <WrappedComponent info={info} {...this.props}></WrappedComponent>
//                 </div>
//             )
//         }
//     }
// }
// export default breadInfo