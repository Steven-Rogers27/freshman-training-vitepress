# 本地开发

借助[webpack-dev-server](https://github.com/webpack/webpack-dev-server#with-npm-scripts)在本地启动一个服务器

```js
devServer: {
  host: 'dev.ldsc.cr121.com',
  port: 12196,
  proxy: {
    '^/api': {
      target: API_HOST,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },
}
```

### 启动命令

```shell
vue-cli-service serve
```

通常会把常用的命令配在`package.json`文件的`scripts`对象中

```json
"dev": "cross-env NODE_ENV=development vue-cli-service serve",
"build:dev": "cross-env NODE_ENV=dev vue-cli-service build --mode dev",
"build:pre": "cross-env NODE_ENV=pre vue-cli-service build --mode pre",
"build": "cross-env NODE_ENV=production vue-cli-service build --mode production",
```

然后就可以在 *bash* 或者 *PowerShell* 这些命令行终端中执行

```shell
npm run dev
```