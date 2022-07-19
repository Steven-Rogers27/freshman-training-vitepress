# 一体化平台前端示例项目
<br>
<br>

<pre>
├── dist                        编译结果目录
|
├── node_modules                外部依赖module
|
├─.browserslistrc               目标浏览器版本声明文件
|
├─.env                          默认环境变量文件
├─.env.dev                      dev环境变量文件
├─.env.development              development环境变量文件
├─.env.pre                      pre环境变量文件
├─.env.production               production环境变量文件
|
├─.gitignore                    不需要提交到git仓库的说明文件
|
├─.prettierignore               不需要用pretier工具格式化的说明文件
├─.prettierrc.json              prettier格式化工具配置文件
|
├─babel.config.js               babel工具配置文件
|
├─package-lock.json             锁定外部依赖module的版本号                
├─package.json                  npm包管理文件
|
├─README.md                     说明文件
|
├─tsconfig.json                 typescript配置文件
|
├─vue.config.js                 vue-cli配置文件
|
├─src
|  ├─App.vue                    默认的入口页面
|  ├─main.ts                    默认的入口文件
|  | 
|  ├─shims-router.d.ts          自定义typescript类型声明文件
|  ├─shims-tsx.d.ts
|  ├─shims-vue.d.ts
|  | 
|  ├─views                      视图页面
|  |   ├─HomeView.vue
|  | 
|  ├─store                      状态管理
|  |   ├─index.ts
|  | 
|  ├─router                     前端路由
|  |   └index.ts
|  | 
|  ├─components                 组件
|  |     ├─WhiteBoard
|  |     |     └index.vue
|  |     ├─SystemMenus
|  |     |      ├─index.vue
|  |     |      └MenuBlock.vue
|  | 
|  ├─assets                     图片、字体等静态资源文件
|  |   ├─images
|  |   |   ├─avatar01.png
|  | 
|  ├─api                        api接口文件
|  |  ├─base.ts
|  |  └portal.ts
|  | 
├─public                        不需要参与编译构建的静态文件
|   ├─favicon.ico
|   ├─index.html
|   ├─portal-logo.svg
|   └yonghufankuizhongxin.svg
</pre>
