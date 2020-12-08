import { Upload } from 'antd'

import { TtUploadIcon } from '@/components'

import img from '@/utils/img';

export default props=>{

    const imgSuccess = e => {
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            props.onChange && props.onChange(e.fileList[0].response.data.url)
            console.log('图片上传成功', e);
        }
    }

    return(
        <div className='tt-upload'>
            <Upload
                name="file"
                action={img.uploadUrl}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={e=>imgSuccess(e)}
            >
                {
                    props.src ? 
                    <img src={img.imgBase+props.src} alt="avatar" style={{ width: '100%' }} /> 
                    : <TtUploadIcon />
                }
            </Upload>
        </div>
    )
}