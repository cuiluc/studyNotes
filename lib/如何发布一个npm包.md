# 如何创建npm包
## 功能代码部分
1. 正常写自己的组件 export default
2. 将自己的功能文件，统一引入到一个 js 文件，方便 webpack 打包（这个只针对vue组件库）
3. 这个js文件的 export default 函数方式是 Vue.use 的回调函数，其中第一个参数是Vue，可以在这里注册组件

## npm
1. npm init 配置 package.json
2. 发布
    - 每次发布前，需要更改 package.json 中的版本

## webpack
[webpack文档](https://webpack.js.org/concepts/)
1. npm i webpack webpack-cli
2. 在最外层创建 webpack.config.json


## webpack插件
1. vue-loder 
2. [mini-css-extract-plugin](https://vue-loader-v14.vuejs.org/zh-cn/configurations/extract-css.html) 用于将 vue 文件中的 vue 文件将 css分离出去; 那么引入的时候，需要单独引入打包生成的 css 和 js文件
3. babel-loader 用于解析高阶js语法为低阶，保证兼容性

## package.json配置打包指令
```
  "scripts": {
    "build": "webpack"
  },
```
npm run build 打包后发布

>注意
1. npm 是 node 环境中的
2. [git](https://github.com) 和 [npm](https://www.npmjs.com/) 是不同的库，需要分别提交
3. [babel](babeljs.cn/docs/) 是一个单独的库，支持独立运行，只是被集成在 webpack 上了而已
4. 默认不需要在自己npm包里初始化npm项目，只需要像写一个组件一样开发即可



# ****** 分割线 ******
# 使用
1. 项目使用方式取决于 webpack 中 entry 配置的js文件
2. css 是否需要单独引入？ 取决于 js 和 css 是否分离， 分离需要单独引入 css 文件