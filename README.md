# 介绍 

千策-自动化测试平台



# 拉取代码

下载源码,拉取jing.gong分支，地址 https://navi.united-imaging.com/Uplus/UCloud/_git/qiance_front



# 打包测试

进入项目目录， 同级目录下有package.json文件

此目录下执行GUI Bash

安装项目依赖

```shell
yarn
//或者
yarn install
```

命令为 yarn build-dev，打包开发环境包，

命令为 yarn build-test，打包测试环境包，



# 修改开发环境变量及接口

进入项目目录下的umirc.dev.ts文件，修改环境变量`process.env.var`

```javascript
define: {
    // dev 环境变量
    'process.env.var': 'dev'
    'process.env.PORT': 9000,
    'process.env.HOST': 127.0.0.1
},
```

修改开发环境接口`target`

```javascript
proxy: {
    '/qc': {
        'target': 'http://10.6.209.209:40001/mock',
        'changeOrigin': true,
        'pathRewrite': { '^/qc' : '' },
    },
},
```

配置开发服务器`devServe`

```javascript
devSever: {
    port: process.env.PORT,
    host: process.env.HOST,
},
```


# 修改测试环境变量

进入项目目录下的umirc.test.ts文件，修改环境变量`process.env.var`

```javascript
define: {
    // test 环境变量
    'process.env.var': 'test'
},
```

修改测试环境接口`target`

```javascript
proxy: {
    '/qc': {
        'target': 'http://10.6.209.209:40001/mock',
        'changeOrigin': true,
        'pathRewrite': { '^/qc' : '' },
    },
},
```

如果部署在非根目录下，需要修改`base`，将其修改为项目所在目录

```javascript
base: './',
```

