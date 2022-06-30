# 旺财记账 
## 环境版本控制
- node.js 保持在10 以上
- vue/cli 版本  
vue/cli@4.1.2. 因为 4.2.0 版本之后就有 eslint 的检查错误问题。
- svg 相关第三方库  
svgo-loader@2.2.1; svg-sprite-loader@4.1.6; svg-sprite-loader-mod@4.1.6

```
yarn add svg-sprite-loader@ -D
```
## 文件目录结构说明  
public 静态页面文件  
assets 图片文件  
components 组件文件  
router 路由文件  
store vuex仓库文件  
views 重要页面组件文件  
tests 测试代码文件夹  
## 确定 URL
- /money 记账页面
- /labels 标签页面
- /statistics 统计页面
- 默认页面 /money 页面  
- 404 访问错误页面
## CSS 的布局方法
- 不建议采用 fixed 布局，非常的坑。  
- 建议采用 flex 布局，或 grid 布局 
- 重复代码使用插槽解决
- 引入 `iconfont` 的 svg，引入无法读取，添加下面代码到`shims-vue.d.ts`中
```ts
declare module "*.svg"{
    const content:string;
    export default content;
}
```
## 读取 SVG
在 vue.config.js 中写入  
```js
const path = require("path");

module.exports = {
  lintOnSave: false,
  chainWebpack: (config) => {
    const dir = path.resolve(__dirname, "src/assets/icons");

    config.module
      .rule("svg-sprite")
      .test(/\.svg$/)
      .include.add(dir) // 撇撇 icons 目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ extract: false })
      .end();

    config
      .plugin("svg-sprite")
      .use(require("svg-sprite-loader/plugin"), [{ plainSprite: true }]);
    config.module.rule("svg").exclude.add(dir); // 排除 icons 目录
  },
}

```
- 一次性引入所有svg
新创建一个 `icon` 组件，将所需的 html 代码封装，然后写入下面代码：
```js
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {
    importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) { console.log(error); }
```
- SVG 自带颜色问题
使用 svgo-loader@2.2.1 解决，它会将 其中的 attrs属性中的 fill 给移除。
```js
config.module
    .rule("svg-sprite")
    .test(/\.svg$/)
    .include.add(dir) //  icons 目录
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({extract: false})
    .end()
    .use('svgo-loader').loader('svgo-loader')
    .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end();
```
- scss 引入不识别问题  
在 scss 中使用 `@import "~@/asserts/xxx.scss"` 不识别，因为 webpack 不知道 ~ 是什么意思。 解决方法：  
设置=> 语言 => Javascript => webpack => webpack configuration file: 写入 `xx\wangcai\node_modules\@vue\cli-service\webpack.config.js`
## 界面的布局
- CSS  
reset => 全局 => 变量 => 局部

两个简单方法，阴影只留上半部分 /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */ 参数详情;  
```css
.output{
    box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.5);
}
```
颜色逐渐变深：百分比  
```css
.output {
    background-color: darken(#333, 4%);
}
```
## 使用 TypeScript
几个重要的点：
```ts
  import Vue from 'vue';
  // vue-property-decorator 是一个比官方好一些的第三方库
  import {Component, Prop} from 'vue-property-decorator';
  @Component        // 用于转变下面的代码
  export default class Types extends Vue {
    // initial data
    type:string = 'hi';        // 使用必须声明类型
    @Prop(Number) xxx:number | undefined;
  }
```
如果需要给一个标签 绑定初始值，然后有需要监听这个值的更新，可以使用 `:valueXXX.sync=''  

- export {}
如果使用 export default model ，那么在其他文件导入的时候，这个函数会出现一个:  
`model.default.fetch()`  
原来这个函数上面没有 default 这个函数的，是因为导出的时候使用了 default 关键字。  
第二种导出方法： export {model}   
这样在导入的时候 `const model = require("@/model.ts").model` ，之后使用 model.fetch 就没有 default 这个关键字了。
- 自定义Button组件问题  
如果你自定义了一个 Button 组件来，里面内容为 一个装饰过的 button按钮，如果在 Button上触发点击，双击，悬浮，右键等事件，有两种方法转递事件给 Button组件内部的 button，实现事件的成功传递。
```html
<button class="button" @click="$emit('click',$event)">
        <slot />
</button>
// 上面方法缺点就是 每种事件都需要单独传递，比较麻烦

<Button class="newTags" @click.native="createTag">新建标签</Button>
// 直接在 使用 Button 组件的时候，在事件后面加上 .native 表示将这个事件传递给你组件里面的 button标签上
```  
## statistics 组件
- scoped 影响外部组件样式  
使用 scoped 会导致该组件的样式不能够影响其他页面，去掉 scoped 会导致通用组件的样式出现错误。  
```css
.types /deep/ li{
    border:1px solid  red;
}
```
如果你使用的为 scss，那么要变成
```scss
.types ::v-deep  li{
  border:1px solid  red;
}
```
- 数组知识  
Object.freeze 表示数组不能被修改了，也不能够往里面加入，删除元素
```ts
const intervalList =Object.freeze( [
  {text: '天', value: 'day'},
  {text: '周', value: 'week'},
  {text: '月', value: 'month'},
]);
```

## 时间格式  
-ISO 8601  
-dayjs 的使用
