import { Result, Button } from 'antd';

export default props=>{
    return(
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" href="/">Back Home</Button>}
            />
        </div>
    )
}