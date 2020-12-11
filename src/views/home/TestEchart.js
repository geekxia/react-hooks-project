import {useEffect,useRef} from "react"
import fnc from "./echarts/ec1"
import fnc2 from "./echarts/weatherOption"
export default props => {
    var myChart
    var myChart2
    var inputEl = useRef(null);
    var inputEl2 = useRef(null);
    let a=[5, 20, 36, 10, 10, 20]
    let b=["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    useEffect(()=>{
         myChart = echarts.init(inputEl.current);
         myChart2 = echarts.init(inputEl2.current);
        return undefined
    },[])
    useEffect(()=>{
        myChart.setOption(fnc(a,b));
        return undefined
    })
    useEffect(()=>{
        myChart2.setOption(fnc2());
        return undefined
    })
    return (
      <div>
        <h1>excart</h1>
        <div ref={inputEl} style={{width: "600px",height:"400px"}}></div>
        <div
        ref={inputEl2}
        style={{width: '600px', height: '400px', marginTop: '30px'}}
      ></div>
      </div>
    )
  }