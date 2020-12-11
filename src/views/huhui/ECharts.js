import React,{
    useEffect
} from "react"

var option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
}

let myChart=null
const ECharts =(props)=>{

    useEffect(()=>{
        //初始化实例
        myChart = echarts.init(document.getElementById('box'))
        //配置图标数据
        myChart.setOption(option)
    },[])

    return (
        <div className="HH-EChats">
            <h1>ECharts</h1>
            <hr/>
            <div id="box" style={{width:"600px",height:"400px"}}></div>
        </div>
    )
}

export default ECharts