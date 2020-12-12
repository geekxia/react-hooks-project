import { useEffect, useRef } from 'react'
import initPV from './echarts/PV'
import initWeather from './echarts/WEATHER'

let myChart1 = null
let myChart2 = null

export default props => {
    // 使用ref进行DOM操作
    const main1 = useRef(null)
    const main2 = useRef(null)

    useEffect(() => {
        // myChart = echarts.init(document.getElementById('main'))
        // 使用ref获取DOM节点
        // 实例化图表对象
        myChart1 = echarts.init(main1.current)
        // 触发actions获取异步的图表数据
        myChart2 = echarts.init(main2.current)

        return undefined
    }, [])


    useEffect(() => {
        myChart1.setOption(initPV())
        myChart2.setOption(initWeather())
        return undefined
    })
    return (
        <div>
            <h1>数据</h1>
            <div
                ref={main1}
                style={{ width: '600px', height: '400px', marginTop: '30px' }}
            >
            </div>
            <div
                ref={main2}
                style={{ width: '600px', height: '400px', left: '630px' }}
            ></div>
        </div>
    )
}