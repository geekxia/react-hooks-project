
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
export default props =>{

    let {loading} = props
    return (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
}