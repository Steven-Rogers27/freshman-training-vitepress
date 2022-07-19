# 创建前端工程

## 从GitLab拉取已有项目

### 拉代码

```shell
git clone -b master http://192.168.100.90:8088/crcc-web/crcc12-shengchan.git 
```

### 装依赖

```shell
cd crcc12-shengchan
npm i
```

### 启动本地服务

```shell
npm run dev
```

## 自己新建一个项目

### 用 [vue cli](https://cli.vuejs.org/guide/creating-a-project.html#vue-create) 创建

```shell
vue create hello-world
```

### 用 [vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) 创建

```shell
npm create vite@latest
```