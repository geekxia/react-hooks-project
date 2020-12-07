import { Card,Table,Button,Popconfirm}from 'antd';
export default props => {
 const dataSource=[{
     id:1,
     name:'牙膏',
     price:5
 },{
     id:2,
     name:'特仑苏',
     price:6
 },{
     id:3,
     name:'小浣熊',
     price:1.5
 }]

 const columns=[{
  title:'序号',
  key:'_id',
  width:80,
  align:'center',
  //编写序号
  render:(txt,record,index)=>index+1
},{
  title:'名字',
  dataIndex:'name'
},{
  title:'价格',
  dataIndex:'price'
},{
  title:'操作',
  render:(txt,record,index)=>{
      return(
          <div>
              <Button type="primary" size="small">修改</Button>
              {/*添加删除信息 */}
              <Popconfirm title="确定删除此项？" 
              onCancel={()=>console.log('用户取消删除')}
               onConfirm={()=>console.log('用户确认删除')}
               //此处调用api的接口
               >
              <Button style={{margin:"0 1rem"}} type="danger" size="small">删除</Button>
              </Popconfirm>
          </div>
      )
  }

}]
return (
  <Card
  title="商品列表"
  extra={
      <Button type="primary" size="small" 
      //新增跳转页面的语法
      onClick={()=>props.history.push("/admin/products/edit")}
      >

          新增
      </Button>
  }
  >
      {/* 令这个商品列表绑定这个商品列表*/}
<Table rowKey="_id" columns={columns} bordered  dataSource={dataSource}/>
  </Card>
)
}