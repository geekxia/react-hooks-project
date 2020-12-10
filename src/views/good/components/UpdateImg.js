import { Upload, message } from 'antd';
import img from '@/utils/img'
import {WdUpdate} from '@/components'
export default props =>{
    const imgSuccess = e => {
        console.log('图片上传成功', e)
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            props.onChange && props.onChange(e.fileList[0].response.data.url)
        }
    }
    return (
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
                <img src={img.imgBase+props.src||props.src} alt="avatar" style={{ width: '100%' }} />
                : <WdUpdate />
                }
            </Upload>
    )
}