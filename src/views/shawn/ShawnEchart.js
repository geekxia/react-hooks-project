
import React,{useState,useEffect,useRef} from 'react'
let echarts = require('echarts');
import initWeather from './echarts/initWeather'
let myChart=null
let myChart1=null

export default props => {
  const main = useRef(null)
  const main1 = useRef(null)

  // var myChart = echarts.init(document.getElementById('main'));

  useEffect(()=>{
    myChart=echarts.init(main.current)
    myChart1=echarts.init(main1.current)
    return undefined
  },[])

  useEffect(()=>{
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: 'website visits'
        },
        tooltip: {},
        legend: {
            
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: 'views',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    return undefined
  },[])

  useEffect(()=>{
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(initWeather());
    return undefined
  },[])
        
  return (
    <div>
      <h1>图表echart</h1>
      <hr/>
        <div ref={main} style={{width: "600px",height:"400px", marginTop: '30px'}}>
        </div>
        <div ref={main1} style={{width: "600px",height:"400px", marginTop: '30px'}}>
        </div>
    </div>
  )
}