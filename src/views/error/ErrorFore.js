import { Result, Button } from 'antd'

export default props=>{
    // console.log(props)

    const backToHome = ()=>{
        props.history.push('/')
    }

    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="对不起, 此页面未找到。"
                extra={<Button type="primary" onClick = {()=>backToHome()}>返回首页</Button>}
            />
        </div>
    )
}