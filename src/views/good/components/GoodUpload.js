import { Upload } from 'antd'
import img from '@/utils/img'
import { QfUploadIcon } from '@/components' 


export default props => {
  // 图片上传成功
  const imgSuccess = e => {
    console.log('图片上传成功', e)
    if(e.fileList[0].response) {
      props.onChange && props.onChange(e.fileList[0].response.data.url)
      console.log('图片上传成功',e)
    }
  }
  return (
    <div className="qf-upload">
      <Upload
        name="file"
        action={img.uploadUrl}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={e=>imgSuccess(e)}
      >
        {
          props.src?
          <img 
            src={img.imgBase+(props.src)} 
            alt="good" 
            style={{ width: '100%' }} 
          />
          : <QfUploadIcon />
        }
      </Upload>
    </div>
  )
}