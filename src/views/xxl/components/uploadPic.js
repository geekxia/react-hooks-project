import React from 'react'
import { Upload } from 'antd';
import XxlUploadIcon from "@/components/xxl-upload-icon/"
import img from '@/utils/img'

export default props=>{
    const uploadSuccess = e=>{
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            props.onChange && props.onChange(e.fileList[0].response.data.url)
            console.log('图片上传成功', e)
        }
    }
    return (
           <div>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={img.uploadUrl}
                    onChange={e=>uploadSuccess(e)}
                >
                    {
                    props.src ? 
                    <img src={img.imgBase+props.src} 
                        alt="good" 
                        style={{ width: '100%' }} 
                    /> 
                    : <XxlUploadIcon/>}
                </Upload>
           </div>
    )
}