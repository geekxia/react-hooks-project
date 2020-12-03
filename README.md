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
作用：把create-react-app隐藏的配置文件暴露出来
```
git init
git add --all
git commit -m 'first commit'
yarn eject
```

* 修改webpack的配置时，有两种方法
1、直接在/config 或 /scripts 中去改
2、自已封装配置文件来改（建议使用第2种办法）,改了什么自己知道
