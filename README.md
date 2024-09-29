# print-zc-vue

## 简介

print-zc-vue 是一个基于 vue 的后台管理系统，采用前后端分离架构，前端使用 Vue.js 框架，后端使用 python 框架，数据库使用 MySQL。

## 功能

- 用户管理：用户注册、登录等操作。
- 套餐管理：套餐的增删改查操作。
- 链接管理：链接的增删改查操作。
- 日志管理：系统日志查询、删除等操作。~~(还没写)~~

## 技术栈

- 前端：Vue.js、Element UI、Axios
- 后端：Python、Flask
- 数据库：MySQL

## 项目结构(主要文件)

```
print-zc-vue
├── public
│   └── favicon.ico # 网站图标
├── src
│   ├── assets # 静态资源
│   ├── components # 公共组件
│   ├── router # 路由配置
│   ├── views # 页面组件
│   ├── App.vue # 根组件
│   ├── main.js # 入口文件
|   └── config.js # 网站配置文件
├── package.json # 项目依赖
└── README.md # 项目说明
```

## 安装

1. 克隆项目到本地

```bash
git clone https://github.com/CTCAKE/print-zc-vue.git
```

2. 进入项目目录

```bash
cd print-zc-vue
```

3. 安装依赖

```bash
npm install vue-router@4 #安装vue-router
npm install element-plus --save #安装element-plus
npm install
```

4. 启动项目

```bash
npm run dev
```

## 后端
https://github.com/CTCAKE/print-zc-python \
后端使用 python 框架 Flask，数据库使用 MySQL。

### 部署

1. 克隆项目到本地

```bash
git clone https://github.com/CTCAKE/print-zc-python.git
```

2. 进入项目目录

```bash
cd print-zc-python
```

3. 安装依赖

```python
pip install -r requirements.txt
```

4. 配置数据库连接

```python
# mian.py
connect = pymysql.connect(host="localhost", user="用户名", password="数据库密码", database="数据库名")
```

5. 启动项目

```python
python mian.py
```