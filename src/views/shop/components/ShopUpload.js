import { Upload } from 'antd'
import { UploadIcon } from '@/components'
import img from '@/utils/img'

export default props=>{
    const imgSuccess = e =>{
        console.log('图片上传成功',e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response){
            setImageUrl(e.fileList[0].response.data.url)
        }
    }
    return(
        <div>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={img.uploadUrl}
                onChange={imgSuccess}
            >
                {
                    props.src ? 
                    <img src={img.imgBase+(props.src)} alt="shop" style={{ width: '100%' }} /> 
                    : <UploadIcon />
                }
            </Upload>
        </div>
    )
}