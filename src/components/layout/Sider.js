import React from "react";

import routes from "@/views";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
const { SubMenu } = Menu;

console.log("routes", routes);

import { connect, useDispatch, useSelector } from "react-redux";
import action from "@/store/actions";

export default (props) => {
  const pathName = useSelector((store) => store.gtitle.pathName);
  // pathName = pathName.push(routes)
  // console.log("pathName:", pathName);
  const dispatch = useDispatch();
  const getTitle = (e) => {
    // console.log(e);
    // dispatch(action.getTitleName(e.target.innerText));
  };
  // 用于生成菜单
  const createNavLink = () => {
    // exact=true，当url和NavLink.to 完全相等时才高亮
    // exact=flase，当url和NavLink.to 相似就高亮
    return routes.map((ele) => (
      <SubMenu key={ele.id} title={ele.text} icon={ele.icon}>
        {ele.children &&
          ele.children.map((ele) => (
            <Menu.Item key={ele.id}>
              <NavLink to={ele.path} exact onClick={(e) => getTitle(e)}>
                {ele.text}
              </NavLink>
            </Menu.Item>
          ))}
      </SubMenu>
    ));
  };

  return (
    <div className="qf-sider">
      <Menu mode="inline" theme="dark">
        {createNavLink()}
      </Menu>
    </div>
  );
};
