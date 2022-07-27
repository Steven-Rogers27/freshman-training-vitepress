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

### npm 的 *node_modules* 目录构建算法

参考链接[npm install及其目录结构](https://www.cnblogs.com/SamWeb/p/15985256.html)

以[npm官网](https://docs.npmjs.com/cli/v8/commands/npm-install#algorithm)的一个简单例子来看下 *npm* 在处理 *node_modules* 目录结构的算法。

假设有一个包的依赖结构是 `A{B,C}`，`B{C}`，`C{D}`，*npm* 安装算法产生的 *node_modules* 目录结构如下：

```
A
+-- B
+-- C
+-- D
```

`A` 依赖 `B` 和 `C`，因此 `B` 和 `C` 都直接安装在 `A` 的 *node_modules* 下，同时 `B` 也依赖 `C`，而恰好 `B` 依赖的 `C` 和 `A` 依赖的 `C` 具有相同的版本，因此不需要再在 `B` 的 *node_modules* 下安装 `C`，而是直接复用 `A` 的 *node_modules* 中的 `C`。然后 `C` 又依赖 `D`，而因为顶层 *node_modules*，也就是 `A` 的 *node_modules* 中还没有 `D` 包，因此 `D` 包也被安装在顶层的 *node_modules* 中。 

假设另一个依赖结构是 `A{B,C}` `B{C,D@1}` `C{D@2}`，此时的 *node_modules* 目录结构如下：

```
A
+-- B
+-- C
   `-- D@2
+-- D@1
```

这个例子和第一个例子的不同之处在于，`B` 依赖的 `D` 包和 `C` 依赖的 `D` 包版本不同，此时当 `B` 包先于 `C` 包被安装时，`B` 依赖的 `D@1` 就会先被安装，而且此时顶层 *node_modules* 中还没有 `D` 包，因此 `D@1` 被安装在顶层 *node_modules*，而当安装 `C` 包时，为了避免 `D` 包的冲突，`D@2` 版本就被安装在 `C` 包自己的 *node_modules* 中。

*npm* 安装包时会顺着目录结构向上找 *node_modules* 目录，如果一个包已经在某个父级的 *node_modules* 目录中安装过了，它就不会再在当前目录安装。

这里可能出现循环依赖的问题，比如有一个依赖关系是 `foo -> bar -> baz -> bar -> baz...`。然而其实 *node_modules* 的目录结构是 `foo/node_modules/bar/node_modules/baz`，这里不需要再把 `bar` 放进 `baz` 的 *node_modules* 中，假设 **`baz` 依赖的 `bar` 和 `foo` 依赖的 `bar` 版本相同** ，因此在 `baz` 中调用 `require('bar')`时，会去`foo/node_modules/bar`获取，这样就不会出现 `foo/node_modules/bar/node_modules/baz/node_modules/bar/node_modules...` 这样的无线嵌套。

但是上面例子有一个重要的条件就是 **`baz` 依赖的 `bar` 和 `foo` 依赖的 `bar` 版本相同**，而如果 `baz` 依赖的 `bar` 和 `foo` 依赖的 `bar` 版本不同，则 `baz` 下面还是得安装自己的需要的 `bar` 版本。

下面摘抄自文章[npm install及其目录结构](https://www.cnblogs.com/SamWeb/p/15985256.html)

npm 2版本的时候，以嵌套的方式安装所有依赖，比如App项目依赖A，A依赖B，那么App的node_modules中有A, A的node_modules中的B。这就会导致依赖树太深，并且安装的包大多，冗余。为了解决这个问题，npm 3版本则试图扁平化安装。主依赖和二级依赖安装到同级目录，主依赖就是package.json中列出的依赖，二级依赖就是主依赖的依赖。还是以项目App为例，主依赖就是A，二级依赖就是B，npm 3安装的时候，A和B在同一级目录，都是在App的node_modules中。

![npm pack1](/npm-pack1.png)

项目开发时，又安装了一个依赖C，C也依赖B，不过是2.0版本，如果是npm2安装，直接安装C依赖，C里面嵌套B。如果是npm3安装，它就是安装C,然后尝试把B安装到C同等级别的目录，也就node_modules顶级目录，但node_modules顶级目录下面已经有了B 1.0依赖，不能再安装B 2.0依赖，否则就冲突了，所以B2.0，只能安装到C目录下

![npm pack2](/npm-pack2.png)

在命令行窗口，它会如下显示

![npm pack3](/npm-pack3.png)

你会发现，目录结构没有办法显示依赖关系, 可以使用npm ls 命令，列出依赖及其关系，列出主依赖，则是 npm ls --depth=0

假设再安装依赖D，它也依赖Bv2.0，还是由于node_modules顶级目录中安装了B1.0， B2.0要安装到D下面，注意，这里和以后的安装都是npm3 了，

![npm pack4](/npm-pack4.png)

继续依赖E，E依赖B1.0，此时只安装E依赖，B依赖不用装了，因为在顶级目录中已经有了

![npm pack5](/npm-pack5.png)

反应到命令行中就是

![npm pack6](/npm-pack6.png)

现在升级A 到2.0，正好它也依赖B2.0，首先是package.json 中A依赖的版本号从1.0 到2.0， 再在node_module中，删除掉A1.0，安装2.0，不能删除B1.0 因为E在用，最后安装B2.0

![npm pack7](/npm-pack7.png)

现在package.json中的依赖如下

```
"dependencies": {
    "mod-a": "^2.0.0",
    "mod-c": "^1.0.0",
    "mod-d": "^1.0.0",
    "mod-e": "^1.0.0"
}
```

此时，你觉得项目初始化完成了，就提交了。同事拿到新代码，就npm install，安装所有依赖，你会发现他安装的目录如下

![npm pack8](/npm-pack8.png)

安装顺序起起到到了重要的作用，npm install 先安装A2.0, 它依赖B2.0， 所以在node_modules顶级目录中安装了A2.0和B2.0，由于C和D都是依赖B2.0， 所以只在node_modules中安装C和D主依赖就可以了，B2.0已经存在了，安装E的时候，它由于依赖B1.0，所以在它的node_modules下面安装了B1.0.

当npm install 一个依赖的时候，它会从当前目录向上找，如果在祖先node_modules中找到符合的依赖，它就不会在本目录下安装，这也解决了循环依赖问题。但你会发现，你和你的同事的node_modules目录结构不一致了。npm3 这种安装依赖的方式，会导致一个问题，你的机器上的node_modules可能和你同事的node_modules 不一致，npm3 并不会以确定性的方式安装node_modules。如果项目中只依赖主依赖，那是没有影响的，如果有使用二级依赖，那就会有影响。比如 import {} from B, 你同事引用是B2.0， 而你引用的是B1.0. 怎么办？把node_modules删除了，重新安装。这也导致package-lock.json 文件出现。如果一个项目中有package-lock.json文件，npm install的时候，就会照package-lock.json文件列出的依赖树安装依赖，package-lock.json文件会记录项目开发时，依赖的安装顺序。比如A从1.0升级到2.0，package.json中只会把A升级到2.0，但package-lock.json 则会记录

```
{
    "dependencies": {
        "A": {
            "version": "2.0.0",
            "requires": {
                "B": "2.0.0"
            },

            "dependencies": {
                "B": {
                    "version": "2.0.0"
                }
            }
        },

        "B": {
            "version": "1.0.0",
        },

        "E": {

            "version": "1.0.0",

            "requires": {

                "B": "1.0.0",

            }
        }
    }
}
```
可以清新地看到安装顺序，无论以后，谁按照package-lock.json文件安装，安装的目录都是一样的。

![npm pack9](/npm-pack9.png)

后面又出了yarn, yarn.lock文件，安装包的依赖时，如果包中有package-lock.json或shrinkwrap.json或yarn.lock这些文件, 它会以这些文件为依据，安装依赖。参考顺序是npm-shrinkwrap.json，package-lock.json，yarn.lock。

在上图的基础上，假设你现在继续开发，把E升级了，它依赖B2.0，npm 会删除掉E1.0，安装E2.0，删除掉B1.0，因为没有模块依赖它了，安装B2.0 到node_module顶级目录。

![npm pack10](/npm-pack10.png)

这时，又有一个问题，模块B2.0 在每一个目录中，为了移除冗余，可以使用 [`npm deque`](https://docs.npmjs.com/cli/v8/commands/npm-dedupe),  这个命令找到依赖B2.0的模块，然后，重定向到顶级目录中的依赖，然后删掉嵌套的依赖b2.0

![npm pack11](/npm-pack11.png)

## [yarn](https://yarnpkg.com/getting-started)

yarn的出现是为了解决 npm v3 几个最为迫在眉睫的问题：依赖安装速度慢，不确定性。

### 提升安装速度

在 npm 中安装依赖时，安装任务是串行的，会按包顺序逐个执行安装，这意味着它会等待一个包完全安装，然后再继续下一个。

为了加快包安装速度，yarn 采用了并行操作，在性能上有显著的提高。而且在缓存机制上，yarn 会将每个包缓存在磁盘上，在下一次安装这个包时，可以脱离网络实现从磁盘离线安装。

### lockfile 解决不确定性

yarn 更大的贡献是发明了 yarn.lock。

在依赖安装时，会根据 package.josn 生成一份 yarn.lock 文件。

lockfile 里记录了依赖，以及依赖的子依赖，依赖的版本，获取地址与验证模块完整性的 hash。

即使是不同的安装顺序，相同的依赖关系在任何的环境和容器中，都能得到稳定的 node_modules 目录结构，保证了依赖安装的确定性。

所以 yarn 在出现时被定义为快速、安全、可靠的依赖管理。而 npm 在一年后的 v5 才发布了 package-lock.json。

参考[文章](https://zhuanlan.zhihu.com/p/526257537)

## [pnpm](https://pnpm.io/installation)

### 符号链接的 *node_modules* 结构

*node_modules* 中的每个 *package* 的每个文件都是指向 *.pnpm-store* （叫做 *content-addressable store*）的硬链接。

我们用一个简单例子的依赖安装过程，来了解下 *pnpm* 是如何管理 *node_modules* 中的目录结构的。

#### 步骤一

假设安装了一个 *foo@1.0.0* 包，它又依赖另一个 *bar@1.0.0* 包，则 *node_modules* 中会有这两个包到 *store* 的硬链接，结构如下：

```
node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    │           ├── index.js
    │           └── package.json
    └── foo@1.0.0
        └── node_modules
            └── foo -> <store>/foo
                ├── index.js
                └── package.json
```

#### 步骤二

用符号链接来构建包与包之间的依赖关系。因为 *foo@1.0.0* 依赖 *bar@1.0.0* ，因此 *foo@1.0.0/node_modules* 目录下会增加一个指向 *bar* 的符号链接：

```
node_modules
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```

#### 步骤三

因为 *foo@1.0.0* 包是我们这个示例工程直接依赖的包，因此会在当前根 *node_modules* 目录下增加一个指向 *foo* 的符号链接：

```
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       └── bar -> <store>/bar
    └── foo@1.0.0
        └── node_modules
            ├── foo -> <store>/foo
            └── bar -> ../../bar@1.0.0/node_modules/bar
```
<br>

pnpm 就是通过上述三步完成 *node_modules* 目录的构建。这虽然是个简单的例子，但无论依赖包的数量、依赖关系的深度有多复杂， *node_modules* 目录都能保持像现在这样的结构。

比如我们又给 *foo* 包和 *bar* 包都增加了第三个依赖包 *qar@2.0.0*，此时的 *node_modules* 目录结构如下：

```
node_modules
├── foo -> ./.pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
    ├── bar@1.0.0
    │   └── node_modules
    │       ├── bar -> <store>/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    ├── foo@1.0.0
    │   └── node_modules
    │       ├── foo -> <store>/foo
    │       ├── bar -> ../../bar@1.0.0/node_modules/bar
    │       └── qar -> ../../qar@2.0.0/node_modules/qar
    └── qar@2.0.0
        └── node_modules
            └── qar -> <store>/qar
```

可以看出，即便最大的包依赖深度达到了三级（foo -> bar -> qar），但是 *node_modules* 目录的深度保持不变。

除了能保持 *node_modules* 目录深度不会很深外，这种方式的另一个好处是，不会出现*幽灵依赖*的问题，因为只有工程的 *package.json* 中直接依赖的包才会被提升到根 *node_modules* 目录下，而只有根 *node_modules* 目录下的包才能在我们的工程中被 `require()` 函数获取到。
