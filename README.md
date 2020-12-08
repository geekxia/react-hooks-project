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
  什么是冲突合并？实际上就是让你来人为决定使用abc代码，还是使用自己写的代码？
  冲突合并完成后，可以提交代码、保存。
git add .
git commit -m '分支合并完成'
git push origin xia
```

# 功能实现
+ 商品新增
  + 布局难点:上传图片
  + 注意antD中的布局是类组件的布局,我们使用的是无状态组件,搬过来要按无状态组件的写法。
  + 上传图片地址: uploadUrl: 'http://localhost:9000/api/v1/upload/img'
    + 上传去的写本地,然后会转发到后端服务器地址
  + 拼接显示的基础地址:imgBase: 'http://10.20.158.29:9999'
    + 因为要显示图片,图片是先上传到数据库中才有地址返回来给你,所以是服务器ip才能显示
  + 商品提交无需走redux,为什么?
    + 数据需要共享时才需要走状态管理。商品提交给数据库无需共享。因为其他地方用到这些数据直接通过调接口就可以实现。
+ 商品列表
+ 分页
+ 查询行
  + 布局
  + 搜索
    + 边输边搜:在[]中加text即可(实时变化改变视图)
    + enter键/失焦触发(API中有这个)
      + 搞一个过滤对象,入参直接入这个
      + 对象是一个复杂(引用)数据类型,要深复制否则视图无法根据声明式变量变化而变化
    + 注意查询时page要置1才能看到数据
      + bug:在其他页查询,查询成功但页面不更新显示
      + 解决:发现第一页没有点亮触发。查询文档使用current控制住page
    + 清空搜索内容时
      + 页面重置,刷新一下
      + 交互有一个X按钮
  + 品类筛选下拉框
    + 子组件改变触发父组件的onchange事件(父子组件通信)
    + 凡是被Form.Item包裹的表单组件,相当于都给表单传递了一个onchange事件
    + 当Form表单值发生变化时,我们手动取值赋值给声明式变量
  + 热销
  + 新增按钮
    + 动态路由传参
    + 传0为新增
    + 传其他为编辑
+ 商品删除
  + 多选删除  table
    + 每次选把_id加入到声明的空数组中
    + 但不是传数组这个参数给后端
    + 要变成;包裹的字符串,传 ;id 这个字符串
    + 以上为后端要求的
  + 交互弹框  Modal对话框
    + 指定位置换行
    + 翻文档可以用react元素。用div包起来
+ 商品编辑

# 调接口
+ 分装接口
+ 走redux
  + api==> actions (dispatch) ==>页面(在这里走redux的dispatch) ==> actionTypes 
==> good.js
  + action.type
    + 这个action.type常量，相当于字典索引，避免在团队协作时产生命名冲突 
    + action 是 视图和Store之间的纽带，actions和reducer是间接关系
    + action 是怎么从视图中抵达Store？是使用 dispatch(action)
  + action.js
    + 页面中要使用 QQ 音乐列表？数据从后端来，要状态管理工具里来
    + 状态管理工具有这个QQ音乐列表？没有，我定义，怎么定义？
    + 在子reducer中定义完成，在根store中合并
    + 现在我要在页面中使用 音乐列表，怎么使用？useSelector()
    + 已经知道QQ音乐数据来自后端，它必须经过store才能进入组件。
    + 那QQ音乐数据，该怎么进入到store？
    + 使用 redux-thunk 来实现，把异步的action转化成多个同步的action
    + redux不支持异步数据
+ 接口404问题
  + 不要百度
  + 看地址是否正确(看请求头)
  + 请求方式是否正确(看请求头)
