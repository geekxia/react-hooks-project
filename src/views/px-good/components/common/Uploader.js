import React,{useState} from 'react'

import {
    Upload
} from 'antd'

import img from "@/utils/img"
import UploadButton from "@/components/common/icon/uploadButton"


export default props=>{
    let [loading,setLoading] = useState(false)
    const handleChange = info => {
        console.log(info);
        if(info.file&&info.file.response&&info.file.response.data){
            props.onChange(info.file.response.data.url)
        }
    };

    return (
        <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={img.uploadUrl}
            onChange={(e)=>handleChange(e)}
        >
            {props.src ? <img src={img.imgBase+props.src} alt="avatar" style={{ width: '100%' }} /> : <UploadButton loading={loading}/>}
        </Upload>
    )
}