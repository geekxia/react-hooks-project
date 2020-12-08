import { Upload } from 'antd'
import { AlUploadIcon } from '@/components'
import img from '@/utils/img'

export default props=>{
  const upSuccess = e=>{
    if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
      props.onChange && props.onChange(e.fileList[0].response.data.url)
      console.log('图片上传成功', e)
    }
  }
  return(
    <Upload
      action={img.uploadUrl}
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={e=>upSuccess(e)}
    >
      {props.src ? 
        <img 
          src={img.imgBase+props.src} 
          alt="avatar" style={{ width: '100%' }}
        /> : <AlUploadIcon />}
    </Upload>
  )
}