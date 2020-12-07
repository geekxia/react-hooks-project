import { Result, Button } from 'antd';

export default props=>{
    return(
        <div>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                extra={<Button type="primary" href="/">Back Home</Button>}
            />
        </div>
    )
}