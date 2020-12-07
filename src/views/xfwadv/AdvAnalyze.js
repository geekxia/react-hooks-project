import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tabs,Card, Col, Row,Tag } from 'antd'
import'./adv.scss'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const { TabPane } = Tabs

export default props=>{
    const numOption = useSelector(store=>store.adv.numOption)
    const priceOption = useSelector(store=>store.adv.priceOption)
    const firstThreeNum = useSelector(store=>store.adv.firstThreeNum)
    const firstThreePrice = useSelector(store=>store.adv.firstThreePrice)

    useEffect(()=>{
        // 基于准备好的dom，初始化echarts实例
        let myNumChart = echarts.init(document.getElementById('num'));
        let myPriceChart = echarts.init(document.getElementById('price'));
        
        // 绘制图表
        myNumChart.setOption(numOption);
        myPriceChart.setOption(priceOption);
        
        return undefined
    },[])

    return (
        <div className='qf-adv'>
            <h1>穿搭类销量分析</h1>
            <hr/>
            <div className="site-card-wrapper">
                <h1>销量榜前三</h1>
                <Row gutter={30} justify='center'>
                    {
                        firstThreeNum && firstThreeNum.map(ele=>(

                            <Col span={4} key={ele.id}>
                                <Card 
                                bordered={false}
                                cover={<img height='160' alt="example" src={ele.img} />}
                                >
                                    <Tag color="magenta">{ele.no}</Tag>
                                    <span>{ele.name}</span>
                                    <p><span>销量 : </span>{ele.num}</p>
                                </Card>
                            </Col>
                            
                        ))
                    }
                </Row>
            </div>
            <div id="num" style={{ width: 800, height: 400 }}></div>
                <div className="site-card-wrapper">
                <h1>销售额榜前三</h1>
                <Row gutter={30} justify='center'>
                    {
                        firstThreePrice && firstThreePrice.map(ele=>(
                            <Col span={4} key={ele.id}>
                                <Card 
                                bordered={false}
                                cover={<img height='160' alt="example" src={ele.img} />}
                                >
                                    <Tag color="magenta">{ele.no}</Tag>
                                    <span>{ele.name}</span>
                                    <p><span>销售额 : ￥</span>{ele.pnum}</p>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                </div>
            <div id="price" style = {{width:1000,height:600}}></div>
           
        </div>
    )
}