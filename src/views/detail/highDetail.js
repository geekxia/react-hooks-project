import { Tooltip, Progress } from 'antd';


const HighDetail=props=>{
    return(
        <div>
             <div>
                <p className="f-bd">首页/详情页/高级详情页</p>
            </div>
            <div>
               <h3>流程进度</h3>
                <Tooltip title="3 done / 3 in progress / 4 to do">
                    <Progress percent={60} success={{ percent: 30 }} />
                </Tooltip>
                <div className='f-jd'>
                    <span>创建项目</span>
                    <span>部门初审</span>
                    <span>财务复核</span>
                    <span>完成</span>
                </div>
            </div>
            <h2>
                高级详情页
            </h2>
        </div>
    )
}
export default HighDetail