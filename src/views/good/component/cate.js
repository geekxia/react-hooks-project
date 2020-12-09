import { Select } from 'antd';
import { useEffect} from "react"
import action from '@/store/actions'

const { Option } = Select;
export default props=>{
 
    useEffect(()=>{
        dispatch(action.getCatesAction())
        return undefined
    },[])

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return(
        <Select defaultValue="lucy" style={{ width: 120 }} allowClear>
            <Option value="lucy">Lucy</Option>
        </Select>
    )
}
