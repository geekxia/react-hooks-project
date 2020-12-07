import { Result, Button } from 'antd'

export default props=>{
    // console.log(props)

    const backToHome = ()=>{
        props.history.push('/')
    }

    return (
        <div>
            <Result
                status="500"
                title="500"
                subTitle="对不起, 服务器发生了错误。"
                extra={<Button type="primary" onClick = {()=>backToHome()}>返回首页</Button>}
            />
        </div>
    )
}