export default function ec(a,b){
    return {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: b
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: a
        }]
    }
}