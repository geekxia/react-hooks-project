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

# Git

## 初始化配置
```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
  - 把配置好的邮箱发给领导，让领导把你加入到项目组中。
  - 然后在GitLab中就可以看到领导给你的这个项目。

## 如何需要做初始提交（一般用不到）
```
git init
git add README.md
git commit -m "first commit"
git remote add origin https://gitee.com/summer2020/xxxxxx.git
git push -u origin master
```

## 第一次拉取公司的代码
```
git clone https://gitee.com/summer2020/qf-minimap.git
git branch --list   在项目根目录中，查看所有分支
git branch xhf  创建自己的开发分支
git checkout xhf  切换到自己的分支
```
  - 然后你想干啥就干啥，写你的代码。

## 当我们想提交代码时
```
git add .
git commit -m '修复了bug'
git push origin xia
```

## 当需要把 abc 分支合并到 xia 分支时，怎么做？
```
git add .
git commit -m '准备合并分支'   每次checkout之前都要把当前分支中的代码提交到本地仓库，避免代码丢失
git checkout abc
git pull   把远程abc分支中的最新代码，更新到本地abc分支中
git checkout xia
git merge abc  把本地abc分支中的代码，合并到xia分支，从而我就拥有abc+xia最新代码
  合并分支时，可能会出现冲突。什么是冲突？是git不知道怎么做、希望争取你的意见。
  什么是冲突合并？实际上就是让你来人为决定使用abc代码，还是使用自己xia的代码？
  冲突合并完成后，可以提交代码、保存。
git add .
git commit -m '分支合并完成'
git push origin xia
```

## https 永久记住密码
```
git config --global credential.helper store
```
