# 包管理工具

## [npm(Node包管理工具)](https://www.npmjs.com/)

npm 由三部分组成

- [网站](https://www.npmjs.com/)
- 命令行接口CLI （Command Line Interface）
- 代码仓库

### 包和模块（packages and modules）

> 包是一个文件或者目录，每个包都有且必须有一个 *package.json* 文件来对这个包做描述。

> 只要可以用Node.js的 require() 函数去加载它，*node_modules* 目录下的任何文件或者目录都可以叫模块。

package.json示例

```json
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development vue-cli-service serve",
    "build:dev": "cross-env NODE_ENV=dev vue-cli-service build --mode dev",
    "build:pre": "cross-env NODE_ENV=pre vue-cli-service build --mode pre",
    "build": "cross-env NODE_ENV=production vue-cli-service build --mode production",
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "homepage": "https://github.com/monatheoctocat/my_package"
}
```

安装[Node.js](https://nodejs.org/en/)就自动安装了npm

## [yarn](https://yarnpkg.com/getting-started)

## [pnpm](https://pnpm.io/installation)