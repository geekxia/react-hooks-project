import React,{useEffect,useRef} from 'react'
import initSaleOption from './echarts/saleOption'
import initWeatherOption from './echarts/weatherOption'
let myChart1=null
let myChart2=null
export default props=>{
    // 使用ref进行DOM操作
    const main1 =useRef(null)
    const main2 =useRef(null)
    // 副作用：DOM操作，异步行为，长连接，定时器
    useEffect(()=>{
        // 使用ref获取DOM节点
        // 实例化图表对象
        myChart1=echarts.init(main1.current)
        // 触发actions获取异步的图表数据
        myChart2=echarts.init(main1.current)

        return undefined
    },[])
    useEffect(()=>{
        // 把异步数据绘制到图表上
        let a=['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
        let b=[5,20,36,10,10,20]
        myChart1.setOption(initSaleOption(a,b))
        myChart2.setOption(initWeatherOption())
        return undefined
    })
    return (
        <div>
          <h1>测试Echart</h1>
          <div
            ref={main1}
            style={{width: '600px', height: '400px', marginTop: '30px'}}
          >
          </div>
    
          <div
            ref={main2}
            style={{width: '600px', height: '400px', marginTop: '30px'}}
          >
          </div>
        </div>
      )
}