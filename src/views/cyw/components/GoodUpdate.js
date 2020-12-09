import { Upload } from 'antd'
import { UploadIcon } from '@/components'
import img from '@/utils/img'

export default props => {
    const uploadSuccess = e => {
        if (e && e.fileList && e.fileList[0] && e.fileList[0].response) {
            props.onChange && props.onChange(e.fileList[0].response.data.url)
            // console.log('图片上传成功', e)
        }
    }

    return (
        <div className='qf-good-upload'>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={img.imgUrl}
                onChange={e=>uploadSuccess(e)}
            >
                {
                    props.src ?
                        <img
                            src={img.baseUrl + props.src}
                            alt="avatar"
                            style={{ width: '100%' }}
                        />
                    : <UploadIcon/>
                }
            </Upload>
        </div>
    )
}