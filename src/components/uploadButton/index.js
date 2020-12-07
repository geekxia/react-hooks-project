import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

export default props=>{

    return (
        <div>
            {props.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    )
}