import {Select} from 'antd'
const {Option} = Select


export default props=>{
  
    let {cateArr}=props
    return (
        <div>
        <Select style={{ width: '120px' }}
        allowClear={props.allowClear} 
        onChange={(val)=>props.onChange(val)}
        >
            
        {
            cateArr.map(ele=>{
                return <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
            })
        }
        </Select >
        </div>
    )
        
}