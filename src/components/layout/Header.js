import React from "react";

import { connect, useSelector } from "react-redux";

import {
  useHistory,
  // withRouter
} from "react-router-dom";

import { Breadcrumb } from "antd";
import routes from "@/views";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

// 问题：没有被Route组件直接包裹的React组件中，是没有路由API的。
// 那该怎么办？
// 在类组件中，只能使用 withRouter 来解决问题。
// 在无状态组件中，可以使用 withRouter，也可以使用 useHistory来解决问题。

// withRouter 是一个高阶组件，让那些没有被Route组件直接包裹的React组件拥有路由API
// useHistory 是ReactRouter提供的Hooks API，帮助我们在无状态组件中使用路由API

// 一、使用Hooks写法，来解决React无状态组件中没有路由API的问题

export default (props) => {
  const pathName = useSelector((store) => store.gtitle.pathName);
  let hash = document.location.hash.slice(1);
  // console.log('---header props', props)
  // console.log('---header history', history)
  const list = routes.filter((ele) => {
    return ele.children.some((ele) => {
      return ele.path === hash;
    });
  });
  // var a;
  // a = list[0].children.filter((ele) => {
  //   return ele.text == pathName;
  // });

  // console.log("一级菜单:", a);
  // console.log("list:", list);
  // const path = "#" + list[0].children[0].path;
  // console.log("pathName:", path);
  return (
    <div className="qf-header" style={{ color: "white" }}>
      <Breadcrumb style={{ color: "white" }}>
        <Breadcrumb.Item href="" style={{ color: "white" }}>
          <HomeOutlined style={{ color: "white" }} />
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "white" }}>
          <UserOutlined style={{ color: "white" }} />
          <span style={{ color: "white" }}>list[0].text</span>
        </Breadcrumb.Item>
        {/* <Breadcrumb.Item>{a.length === 0 ? "" : a[0].text}</Breadcrumb.Item> */}
      </Breadcrumb>
    </div>
  );
};

// 二、使用withRouter高阶组件来解决React无状态组件中没有路由API的问题

// export default withRouter(props=>{
//   console.log('---header props', props)
//   return (
//     <div className='qf-header'>
//       header
//     </div>
//   )
// })

// 三、使用 withRouter高阶组件，解决React类组件中没有路由API的问题
// 有两种写法：装饰器的写法，或者 ES5函数调用的写法

// @withRouter
// class Header extends React.Component {
//   render() {
//     console.log('---header props', this.props)
//     return (
//       <div className='qf-header'>
//         header
//       </div>
//     )
//   }
// }
// export default Header
// export default withRouter(Header)
