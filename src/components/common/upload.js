import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

export default props => {
  let  [loading, setLoading] = useState(false)
  let [imageUrl, setImageUrl]　= useState('')
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  function handleChange (v) {
    if (v.file.response && v.file.response.err===0) {
      setImageUrl("http://10.20.158.29:9999" + v.file.response.data.url)
      props.onChange(v.file.response.data.url)
    }
    // console.log(v)
   
  }
  return(
    <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="http://localhost:9000/api/v1/upload/img"
        // beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="img" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
  )
}
  


