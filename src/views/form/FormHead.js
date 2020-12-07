import react from 'react';
import { PageHeader } from 'antd';

export default props=>{
  console.log('props',props)
  const routes = [
    {
      path: '/',
      breadcrumbName: '首页',
    },
    {
      
      path: '/basic',
      breadcrumbName: '工作表单',
    },
    {
      breadcrumbName: props.formType,
    },
  ];
  return (
    <PageHeader
      className="site-page-header"
      title={props.formType}
      breadcrumb={{ routes }}
    >
      {props.children}
    </PageHeader>
  )
}