import { Upload } from 'antd'
import UploadButton from '@/components/uploadButton'
import img from '@/utils/img'

export default props=>{

    const uploadChange = (e)=>{
        // console.log(e)
        if(e.fileList[0].response && e.fileList[0].response.data){
            props.onChange && props.onChange(e.fileList[0].response.data.url)
        }
    }

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={img.imgUploadUrl}
            onChange = {(e)=>uploadChange(e)}
        >
            {
                props.src? 
                <img src={img.imgBaseUrl+props.src} alt="avatar" style={{ width: '100%' }} />
                :<UploadButton /> 
            }
        </Upload>
    )
}