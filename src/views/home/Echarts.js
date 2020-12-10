import { useEffect,useRef } from 'react'
import initSaleOption from './echarts/saleOption'
import initWeaOption from './echarts/weatherOption'
import './style.scss'

let myChart1 = null
let myChart2 = null

export default props => {
  // 使用ref进行DOM操作
  const main1 = useRef(null)
  const main2 = useRef(null)
  // 副作用：DOM操作、异步行为、长连接、定时器
  useEffect(()=>{
    console.log('echarts', echarts)
    // 使用ref获取DOM节点
    // 实例化图表对象
    myChart1 = echarts.init(main1.current)
    myChart2 = echarts.init(main2.current)
    return undefined
  }, [])
  useEffect(()=>{
    let a = ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    let b = [5, 20, 36, 10, 10, 20]
    myChart1.setOption(initSaleOption(a, b))
  })
  useEffect(()=>{
    myChart2.setOption(initWeaOption())
  })

  return (
    <div className="echarts">
      <h1>图表</h1>
      <div className="bar"
        ref={main1}
        style={{width: "600px",height: "400px"}}
      >        
      </div>
      <div className="pie"
        ref={main2}
        style={{width: "600px",height: "400px"}}
      >        
      </div>
    </div>
  )
}
