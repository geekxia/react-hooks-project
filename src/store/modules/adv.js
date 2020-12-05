import type from '../actionTypes'
import img from '@/utils/img'


const initState  = {
    firstThreeNum:[
        {id:1, img:img.num1, no:'榜一', num:37, name:'打底裤'},
        {id:2, img:img.num2, no:'榜二', num:36, name:'雪纺衫'},
        {id:3, img:img.num3, no:'榜三', num:32, name:'领结'}
    ],
    firstThreePrice:[
        {id:1, img:img.pnum1, no:'榜一', pnum:3965, name:'围巾'},
        {id:2, img:img.pnum2, no:'榜二', pnum:3623, name:'手套'},
        {id:3, img:img.num2, no:'榜三', pnum:3600, name:'雪纺衫'}
    ],
    numOption:{
        
        img:{
            num1:img.num1,
            num2:img.num2,
            num3:img.num3,

        },
        title: { text: '今日穿搭类销量统计' },
        tooltip: {},
        xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","围巾","鸭舌帽","羽绒服","手套","领结","帆布鞋","打底裤","秋裤","保暖内衣"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20,30,10,15,20,32,18,37,26,19]
        }]
    },
    priceOption:{
        color:'#61a0a8',
        title: {
            text: '今日穿搭类销售额统计',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
            name: '销售额',
            min: 200,
            max: 4000,
            interval: 200
        },
        yAxis: {
            type: 'category',
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","围巾","鸭舌帽","羽绒服","手套","领结","帆布鞋","打底裤","秋裤","保暖内衣"],
           
        },
        series: [
            
            {
                name: '销售额',
                type: 'bar',
                data: [250, 500, 3600, 560, 788, 1543,3965,894,2000,3623,523,210,896,1532,596],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    }
}

export default (state=initState,action)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch(action.type){
        case type.ADV_ANALYZE: return newState
    }
    return state
}