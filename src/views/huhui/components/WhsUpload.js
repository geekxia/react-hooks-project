import {
    Upload
} from "antd"
import img from "@/utils/img"
import {
    QfUploadIcon
} from "@/components/index"

const whsUpload = (props)=>{

    //图片上传
    const imgSuccess = (e)=>{
        if( e && e.fileList && e.fileList[0] && e.fileList[0].response){
            console.log("图片上传成功",e);
            props.onChange && props.onChange(e.fileList[0].response.data.url)
        }
    }

    return(
        <div className="HH-upload">
            <Upload
                name="file"
                action={img.uploadUrl}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={(e)=>imgSuccess(e)}
            >
                {
                    props.src ? 
                    <img src={img.imgBase+props.src} alt="avatar" style={{ width: '100%' }} /> 
                    : <QfUploadIcon />
                }
            </Upload>
        </div>
    )
}

export default whsUpload