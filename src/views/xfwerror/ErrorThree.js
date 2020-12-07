import { Result, Button } from 'antd'

export default props=>{

    const backToHome = ()=>{
        props.history.push('/')
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="对不起, 你没有此页面的访问权限。"
            extra={<Button type="primary" onClick = {()=>backToHome()}>返回首页</Button>}
        />
    )
}