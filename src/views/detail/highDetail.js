import { Tooltip, Progress } from 'antd';
import { Popover, Button } from 'antd';
const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
const HighDetail=props=>{
    return(
        <div className="f-detail">
             <div className="f-dtop">
                <p className="f-bd">首页/详情页/高级详情页</p>
            </div>
            <div className="f-demain">
               <h3>流程进度</h3>
               <Popover content={content} title="Title">
                    <Button type="primary">0</Button>
                </Popover>,
                <Tooltip title="3 done / 3 in progress / 4 to do">
                    <Progress percent={25} success={{ percent: 25 }} />
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