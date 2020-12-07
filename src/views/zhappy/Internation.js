import React from "react";

import { ConfigProvider, Pagination, Radio } from "antd";
import enUS from "antd/lib/locale/en_US";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("en");

class Page extends React.Component {
  render() {
    return (
      <div className="locale-components">
        <div className="example">
          <Pagination defaultCurrent={1} total={50} showSizeChanger />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      locale: enUS
    };
  }
  changeLocale = (e) => {
    const localeValue = e.target.value;
    this.setState({ locale: localeValue });
    if (!localeValue) {
      moment.locale("en");
    } else {
      moment.locale("zh-cn");
    }
  };
  render() {
    const { locale } = this.state;
    return (
      <div>
        <div className="change-locale">
          <span style={{ marginRight: 16 }}>国际化: </span>
          <Radio.Group value={locale} onChange={this.changeLocale}>
            <Radio.Button key="en" value={enUS}>
              English
            </Radio.Button>
            <Radio.Button key="cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
        </div>
        <br/>
        <ConfigProvider locale={locale}>
          <Page
            key={
              locale
                ? locale.locale
                : "en" /* Have to refresh for production environment */
            }
          />
        </ConfigProvider>
      </div>
    );
  }
}
export default props=>{
  return(
    <App />
  )
}
