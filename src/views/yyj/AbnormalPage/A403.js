import { Result, Button } from 'antd';


export default props=>{
    return(
        <div>
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary" href="/">Back Home</Button>}
            />
        </div>
    )
}