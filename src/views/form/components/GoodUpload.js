import {Upload} from 'antd'
import  {QfUploadIcon} from '@/components'
import img from '@/utils/img'

export default props=>{
    const uploadSuccess=e=>{
        if(e&&e.fileList&&e.fileList[0]&&e.fileList[0].response){
            props.onChange&&props.onChange(e.fileList[0].response.data.url)
            console.log('图片上传成功 ',e)
        }
    }
    return (
        <div className='qf-good-upload'>
            <Upload
                name='file'
                action={img.uploadUrl}
                showUploadList={false}
                listType="picture-card"
                className="vatar-uploader"
                onChange={e=>uploadSuccess(e)}
            >
                {
                    props.src?
                    <img 
                        src={img.imgBase+props.src}
                        alt="good"
                        style={{width:'100%'}}
                    />
                    :<QfUploadIcon />
                }
            </Upload>
        </div>
    )
}