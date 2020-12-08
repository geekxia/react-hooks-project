

import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import img from '@/utils/img'


export default props=> {
  const handleChange=(e)=>{
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
      props.onChange && props.onChange(e.fileList[0].response.data.url)
      console.log('图片上传成功', e)
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <div>
      <Upload
        name="file"
        action={img.uploadUrl}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={e=>handleChange(e)}
      >
        {props.src ? 
          <img src={img.imgBase+props.src} 
          alt="avatar" 
          style={{ width: '100%' }} 
        /> : uploadButton}
      </Upload>
    </div>
  )
}
