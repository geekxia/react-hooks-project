# 环境

* 包管理器用 yarn
```
cnpm install yarn -g

yarn install abc -S
yarn install efg -D
```

* 自定义yarn命令：
```
yarn start
yarn build
yarn eject
```

* 项目创建
cnpm install create-react-app -g
create-react-app project-name

* React常用脚手架有哪些？

create-react-app
umi：https://umijs.org/
dva：https://dvajs.com/

* 如何执行eject暴露命令？

- 作用：把create-react-app隐藏的配置文件暴露出来
```
git init
git add --all
git commit -m 'first commit'
yarn eject
```

* 修改webpack的配置时，有两种方法

- 1、直接在/config 或 /scripts 中去改
- 2、自已封装配置文件来改（建议使用第2种办法）,改了什么自己知道


# 登录实现
分装login页面，与layout同级别
添加登录接口
在APP页面判断是否登录渲染layout还是login
登录时，在请求拦截器加token，在响应拦截器验证token
登陆页：点击登录按钮调登录接口，成功后把token存储本地，跳转到首页，调用父组件传递的方法刷新isLogin
