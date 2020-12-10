import {useEffect} from 'react'
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
    };


export default props =>{

  useEffect(() => {
    const myChart = echarts.init(document.getElementById('main'));
    
    myChart.setOption(option);
    return undefined
  }, []);
  
  return(
    <div className='zz-happyZhao'>
      <h1><b>图表</b></h1>
      <hr/>
      <div id="main" style={{width: '600px',height:'400px'}}></div>
    </div>
  )
}