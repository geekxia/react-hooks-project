export default function initSaleOption(xAxisData,seriesData) {
  return {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: xAxisData        
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: seriesData        
    }]
  }
}