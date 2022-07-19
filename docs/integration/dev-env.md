# 本地开发环境准备

## 安装 [Nodejs](https://nodejs.org/en/download/)

建议安装版本：14.x, 12.x

windows上可以考虑安装[nvm-windows](https://github.com/coreybutler/nvm-windows)，这样就可以根据需要切换Node版本。

## 配置npm镜像

设置npm淘宝镜像
```shell
npm config set registry https://registry.npmmirror.com
```
<br>

设置我们的npm私有镜像
```shell
npm config set registry http://192.168.100.199:4873/
```

推荐安装[nrm](https://www.npmjs.com/package/nrm)，这样就可以根据需要方便切换npm镜像地址。

```shell
npm i -g nrm
```
查看当前所有可用的镜像地址

```shell
nrm ls

  npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
* dx ----------- http://192.168.100.199:4873/
```

切换镜像地址
```shell
nrm use taobao
```

## 安装 [VueCLI](https://cli.vuejs.org/guide/installation.html) 

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 安装 [Git](https://git-scm.com/)

## 注册自己的 [GitLab](http://192.168.100.90:8088/crcc-web) 账号

