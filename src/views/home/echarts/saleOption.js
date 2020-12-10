
export default function initSaleOption(xAxisData, seriesData) {
  // 数据处理，把后端数据转化图表所需要的数据格式
  return {
    title: {
        text: '公司网站访问量'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
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
