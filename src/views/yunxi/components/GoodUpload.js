// 封装上传图片装组件

import { Upload } from 'antd'
import { QfUploadIcon } from '@/components'
import img from '@/utils/img'

export default props=>{
      // 图片上传成功，我调用父组件的onChange方法
    const uploadSuccess = e => {
        if(e && e.fileList && e.fileList[0] && e.fileList[0].response) {
          props.onChange && props.onChange(e.fileList[0].response.data.url) //把url传给父组件
          console.log('图片上传成功', e)
        }
    }
    return(
        <div className='qf-good-upload'>
            <Upload
                name="file"    // 这个是给后端取值的key
                action={img.uploadUrl}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={e=>uploadSuccess(e)}
            >
                {
                    props.src ?
                    <img
                        src={img.imgBase+(props.src)}
                        alt="avatar"
                        style={{ width: '100%' }}
                    />
                    : <QfUploadIcon />
                } 
            </Upload>
        </div>
    )
}