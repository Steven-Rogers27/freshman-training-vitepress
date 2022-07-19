# 前后端联调

### 我们当前的研发环境：

1. 开发环境
> http://192.168.100.199:12188

2. 测试环境
> http://192.168.100.192:12188
> http://ldsc.cr121.com:12188

3. 生产环境
> http://192.168.200.128:12188
> http://ames.cr12g.com.cn:12188

当前情况是，前端在本地启动一个服务器，该服务器把AJAX请求发送到相应的后端开发本地服务，或者开发环境、测试环境。

```js
devServer: {
  host: 'dev.ldsc.cr121.com',
  port: 12196,
  proxy: {
    '^/api': {
      target: 'http://ldsc.cr121.com:12188',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    },
  },
}
```

### 后端提供的api [接口文档](http://ldsc.cr121.com:12188/service/swagger-ui/index.html#/)

![swagger](/api-swagger.png)


### 接口调试工具

[Apifox](https://www.apifox.cn/)

![apifox](/apifox.png)
