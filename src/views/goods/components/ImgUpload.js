

export default props =>{
    return(
        <div>
            <Upload
                name="file"
                action={img.uploadUrl}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={imgSuccess}
            >
                {imageUrl ? <img src={img.imgBase + imageUrl} alt="avatar" style={{ width: '100%' }} /> :<UploadIcon />}
            </Upload>
        </div>
    )
}