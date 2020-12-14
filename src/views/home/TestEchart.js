import { useEffect, useRef } from 'react'
import initBar from './echarts/echart-1'
import initWeather from './echarts/echart-2'

let myChart1 = null
let myChart2 = null

export default props=>{

    const main1 = useRef(null)
    const main2 = useRef(null)

    useEffect(()=>{
        console.log('echarts', echarts);
        // 使用ref获取DOM节点
        // 实例化图表对象
        myChart1 = echarts.init(main1.current)
        myChart2 = echarts.init(main2.current)
        return undefined
    },[])
    
    useEffect(()=>{
        // 第2步：把异步的数据绘制图表上
        let num = [120, 200, 150, 80, 70, 110, 130]
        myChart1.setOption(initBar(num))
        return undefined
    })

    useEffect(()=>{
        myChart2.setOption(initWeather())
    })
    
    return (
        <div>
            <h1>测试图表</h1>
            <div ref={main1} style={{width: '600px', height: '500px'}}></div>
            <div ref={main2} style={{width: '600px', height: '500px'}}></div>
        </div>
    )
}