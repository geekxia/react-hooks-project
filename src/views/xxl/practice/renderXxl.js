import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'antd';

export default props=>{
    const customer = useSelector(store=>(store.xxlReducer.customerMsg))
    const columns = [
        {
          title: '标题',
          dataIndex: 'title',
          width: 150,
        },
        {
          title: '起止时间',
          dataIndex: 'time',
          width: 150,
        },
        {
          title: '目标描述',
          dataIndex: 'description',
        },
        {
            title: '衡量标准',
            dataIndex: 'standard',
        },
        {
            title: '客户',
            dataIndex: 'customer',
        },
        {
            title: '邀评人',
            dataIndex: 'inviter',
        },
        {
            title: '权重',
            dataIndex: 'weight',
        },
        {
            title: '是否公开',
            dataIndex: 'public',
        },
        
    ];
    // 指定图表的配置项和数据
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
    let [ main,setMain ] = useState("main")
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    useEffect(()=>{
        return undefined
    },[])
    useEffect(()=>{
        return undefined
    },[])
    return (
        <div>
             <Table 
                rowKey="id"
                columns={columns} 
                dataSource={customer} 
                pagination={{ pageSize: 50 }} 
                scroll={{ y: 240 }} 
             />
             <hr/>
             <div id={main} style={{width: "600px",height:"400px"}}></div>
        </div>
    )
}