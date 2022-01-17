# JavaScript
- 完整的JavaScript包含以下三部分
 - 核心（ECMAScript）： ECMA-262定义并提供和核心供能
    - JavaScript和ECMAScript基本上是同义词
    - 即ECMA-262定义的语言，并不局限于Web浏览器。
    - 事实上，这门语言没有输入和输出之类的方法。
    - Web浏览器只是ECMAScript实现可能存在的一种宿主环境（host environment）。
    - 宿主环境提供ECMAScript的基准实现和与环境自身交互必需的扩展。
    - 扩展（比如DOM）使用ECMAScript核心类型和语法，提供特定于环境的额外功能。
    - 其他宿主环境还有服务器端JavaScript平台Node.js和即将被淘汰的Adobe Flash。
    - ECMAScript只是对实现这个规范描述的所有方面的一门语言的称呼。JavaScript实现了ECMAScript，而Adobe ActionScript同样也实现了ECMAScript。
 - 文档对象模型（DOM）： 提供与网页内容交互的方法和接口
        - DOM Level 1的目标是映射文档结构, DOM Level 2, DOM Level 3, DOM4
        - 其他DOM
            - 可伸缩矢量图（SVG, Scalable Vector Graphics）
            - 数学标记语言（MathML, Mathematical Markup Language）
            - 同步多媒体集成语言（SMIL, Synchronized Multimedia IntegrationLanguage）
    - 文档对象模型（DOM, Document Object Model）是一个应用编程接口（API），用于在HTML中使用扩展的XML。
    - DOM将整个页面抽象为一组分层节点。HTML或XML页面的每个组成部分都是一种节点，包含不同的数据。
    - DOM并非只有js可以访问，只是对于浏览器来说，DOM就是使用ECMAScript实现的
 - 浏览器对象模型（BOM）： 提供与浏览器交互的方法和接口
    - IE3和Netscape Navigator 3提供了浏览器对象模型（BOM）API，用于支持访问和操作浏览器的窗口。使用BOM，开发者可以操控浏览器显示页面之外的部分。
    - 唯一一个没有标准的部分
---
---

# 注意
- 传递函数 和 函数调用，传递的函数可以抽离，注意API传递的参数即可
- - window.performance.now() 不受系统时间影响


# script
## script元素有八个属性
- async：可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- charset：可选。使用src属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
- defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7及更早的版本中，对行内脚本也可以指定这个属性。
- integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI, Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。
- language：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略这个属性，不应该再使用它。
- src：可选。表示包含要执行的代码的外部文件。
- type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

## 行内script
- 从上到下解释，并且保存在解释器环境中
- 代码被计算完成前，页面的其余内容不会被加载，也不会显示；
- 在使用行内JavaScript代码时，要注意代码中不能出现字符串<*/script>会报错，需要转义 <\/script>
- XHTML中编写规则更严格
    - 必须制定type且值为 text/javascript
    - XHTML 内部写法，不能出现小于号 会报错
        - 方法一，必须把小于号写成 #lt;
        - 方法二，注释抵消了非XHTML兼容浏览器中的问题，可以使用所有浏览器
        ```
        <script type="text/javascript">
        //<![CDATA[
        dosomething
        //]]>
        </script>
        ```

## 外部
- 多个地方用一个js文件，可缓存使用
- 在解释外部javascript文件的时候，页面也会阻塞，阻塞时间包括加载时间
- async 属性，可以立即下载脚本，但不阻塞其他页面执行， 多个 async，不能保证执行顺序，区别于defer
    - 只对外部有效
    - 给脚本添加async属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本
- defer 立即下载，但延迟到文档完全解析和显示后再执行，规范要求多个defer要求按顺序执行
    - 不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在DOMContentLoaded事件之前执行，因此最好只包含一个这样的脚本。
    - 只对外部有效
- 其他按照页面书写顺序解释
- 在里面加行内代码会被忽略
- 在XHTML文档中，可以忽略结束标签
- src请求不一定可非要是js文件
- 浏览器解析资源会向src的路径发送一个URL请求，这个请求不受浏览器同源策略限制，但仍然受父页面HTTP/HTTPS协议的限制，返回并被执行的JavaScript则受限制。
- 在配置浏览器请求外部文件时，要重点考虑的一点是它们会占用多少带宽。在SPDY/HTTP2中，预请求的消耗已显著降低，以轻量、独立JavaScript组件形式向客户端送达脚本更具优势。浏览器支持 SPDY/HTTP2 ，就可以从同一个地方取一批文件，并逐个放到浏览器缓存
## noscript
- 以下两种会显示，noscript 标签中的内容，其他情况不会渲染其中的内容，noscript 标签中可包含其他标签，比如 p
    - 浏览器不支持脚本
    - 浏览器对脚本的支持被关闭
## 注意
- 需要动态加载的script外部脚本，比如在js中创建一个 script标签添加src属性。会影响性能，可以在文档头部， `<link rel="preload" href="想加载文件的路径">`
- 以前会把script放到head标签中，也就意味着必须把所有JavaScript代码都下载、解析和解释完成后，才能开始渲染页面（页面在浏览器解析到<*body>的起始标签时开始渲染）。
    - 对于需要很多JavaScript的页面，这会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白
    - 为解决这个问题，现代Web应用程序通常将所有JavaScript引用放在<*body>元素中的页面内容后面
- 即使是字符串在 script 标签也不可以直接写， `</script>`，必须转义 **<\/script>** 才行
- 一个script标签为一个宏任务, 先执行第一个宏任务，也就是第一个script标签，然后依次去塞，先进先出
    - 执行顺序`同步代码执行结束 - 微任务执行结束 - 宏任务`    
```
    1 9 8 3 4 6 2 5 7
    <script>
        console.log(1);
        Promise.resolve(8).then((val) => {
            console.log(val)
        })
        console.log(9)
        setTimeout(() => {
            console.log(2)
        }, 0)
        setTimeout(() => {
            console.log(7)
        }, 5000)
        Promise.resolve(3).then((val) => {
            console.log(val)
        })
    </script>
    <script>
        console.log(4);
        setTimeout(() => {
            console.log(5)
        }, 0)
        Promise.resolve(6).then((val) => {
            console.log(val)
        })
    </script>
```
- 页面渲染时机
    1. 第一次，dom树和css树加载完毕
    2. 后面，在微任务执行结束, 去取宏任务的间隙
- 文档模式
    - 准标准模式通过过渡性文档类型（Transitional）和框架集文档类型（Frameset）来触发
    - 标准模式：一般指准标准模式 或 标准模式
---
---

# 语法基础
## 变量
- 第一个字符必须是字母/_/$
- 变量声明
 - var
    - 函数式作用域
    - 变量会成为 window 对象的属性
    - 同一作用域，重复定义不报错
    - 在函数中定义，外部不可访问
 - let
    - 块级作用域
    - 在解析代码时，Javascript引擎也会注意到块后面的 let/const 声明，在声明之前不可以引用，声明前使用的执行瞬间叫**暂时性死区**
    - 不会成为 window 对象的属性，let声明发生在全局作用域，相应变量会在**页面的生命周期续存**
    - 不可重复定义，不同script标签中的全局作用域也不行
    - 循环中使用，每次迭代循环中都会声明一个新的迭代变量，每次都引用不同的实例，并且不会溢出
        - for循环因为自增只能let
- const
    - 定义同时初始化
    - for-of和for-in，推荐const
- 注意
    - let/var混用重复声明会报错，不会受混用影响
    - 优先使用类型 const - let - var

## 数据类型：共七种类型
### typeof 操作数
- 操作数是操作符而不是函数，所以不需要参数，但可以传
- 使用
    ```
    let str = 'foo'
    typeof str
    typeof(str)
    ```
- 返回值为字符串
- **注意**
    - typeof null，返回值为 'object'， 因为*特殊值null认为是对空对象的引用*
    - typeof 函数，返回值为 'function'，可以用来区分函数和其他对象
### 基础类型1 - undefined
- 声明为初始化变量时，默认 undefined
- 一般，永远不用显式给某个变量设置 undefined
- 主要用于比较
- 对象空指针 和 未初始化变量的区别
- 由null派生而来
### 基础类型2 - Null
- 表示一个空对象指针
- 变量以后用来储存对象，建议用null初始化
### 基础类型3 - Boolean
- 转换其他值为布尔值 Boolean()，可以再任意类型数据上调用，且始终返回一个布尔值
- 空字符串，0，NaN, null, undefined会被转化为false，其他会被转化为true
### 基础类型4 - Number
- Number类型使用IEEE754格式表示整数和浮点值（在某些语言中也叫双精度值）。
- 不同的数值类型相应地也有不同的数值字面量格式。
    - 十进制，直接写
    - 八进制，0 + (0 - 7)
        - 如果超出有效范围，会忽略前面的零，当作十进制，如080
        - 八进制字面量在严格模式下是无效的，会导致JavaScript引擎抛出语法错误
        - 严格模式，要表示八进制使用 0o + (0 - 7)
    - 十六进制，0x(区分大小写) + (0 - 9A-F)(不区分大小写)
    > 使用八进制和十六进制格式创建的数值在所有*数学操作*中都被视为十进制数值
- **注意**
    - 由于JavaScript保存数值的方式，实际中可能存在正零（+0）和负零（-0）。正零和负零在所有情况下都被认为是等同的
- **浮点数**
    - 推荐写 0.1 而不是 .1
    - 存储浮点值使用的内存空间是存储整数值的两倍，所以ECMAScript总是想方设法把值转换为整数。如 1. 和 1.0 都会被转化为整数
    - 非常大或非常小的数值，浮点值可以用科学记数法来表示。
        - 3.125e7(3.125 * (10 ^ 7))
        - 将小数点后至少包含6个零的浮点值转换为科学记数法，如 3e-17(3 * (10 ^ -17))
    - 浮点值的精确度最高可达17位小数，但不如整数精确。如 0.1 + 0.3 = 0.30000000000000004(之所以存在这种舍入错误，是因为使用了IEEE 754数值，用这个的都有这个问题)，导致很难测试特定的浮点值。**因此永远不要测试某个特定的浮点值**。
    - 因内存限制，并不能表示所有数值。
        - Number.MIN_VALUE，最小值，在多数浏览器中是5e-324
        - Number.MAX_VALUE，最大值，在多数浏览器中是1.797693134862315 7e+308
    - 如果计算结果超过上述范围，任何无法表示的数值
        - 正数，Infinity(或者用 Number.NEGATIVE_INFINITY) 
        - 负数，-Infinity(或者用 Number.POSITIVE_INFINITY) 表示，
        - 超出后无法进行任何计算
    - **isFinite(num)** 判断是否有限大
- **NaN**，表示本来要返回数值的操作失败了（而不是抛出错误）
    - 在ECMAScript中，0、+0或-0相除会返回NaN，0/+0
    - 分子是非0值，分母是有符号0或无符号0，则会返回Infinity(5/0)或-Infinity(5/-0)
    - 任何涉及NaN的操作始终返回NaN
    - NaN不等于包括NaN在内的任何值，NaN == NaN, false
    - **isNaN(param)**，判断是否为一个数值，不是true
- **数值转换**，同一参数，三种方法执行的操作不同
    1. Number()，是转型函数，可用于任何数据类型，规则如下
        - 布尔值，true-1，false-1
        - 数值直接返回
        - null - 0
        - undefined - NaN
        - 字符串
            - 数值字符串，包括加减号，Number('-10') - -10 ， Number('1.1') - 1.1
            - 八进制 Number('011') - 11忽略前面的零， 正常转化Number('0o10') - 8
            - 将十六进制转化为十进制，Number('0xf') - 15
            - Number('') - 0
            - **除上述以外的字符串，即非数值字符串，均返回NaN**
        - 对象
            - 调用valueOf()方法，并按照上述规则转换返回的值。
            - 如果转换结果是NaN，则调用toString()方法，再按照转换字符串的规则转换
    2. parseInt()
        - 主要用于将字符串转换为数值
        - 通常想要得到整数优先用这个，更关注字符串是否包含数值模式
        - 从**第一个非空格字符串**开始转换
            - 如果第一个字符不是数值或者加减号立即返回NaN
                - 区别Number(), parseInt('')返回是NaN而不是0
            - 如果是数值或者加减号，则向后检测，到非数值（包括小数点，因为不是有效整数）字符串或者结束
        - 一个参数时
            - 以'0x'开头，将十六进制转化为十进制，如 parseInt('0xA') - 10
            - 以'0'开头，非严格模式，将八进制转化为十进制，如 parseInt('010') - 8
        - 二个参数，第二个参数用于指定底数（进制数），用于正确解析，如
            - parseInt('0xA') - 10
            - parseInt('A')为NaN, parseInt('A', 16) - 10
            - 扩展用法，可以把任意进制的字符串转化为十进制
                - parseInt('10', 2) // 2
                - parseInt('A', 12) // 10
            - 建议始终传第二个参数
    3. parseFloat()
        - 主要用于将字符串转换为数值
         - 从**第一个非空格字符串**开始转换
            - 如果第一个字符不是数值、加减号、或者小数点立即返回NaN
            - 如果是，解析到字符串末尾或者解析到一个无效的浮点数值字符为止
        - 区别于parseInt()，十六进制数值始终返回0。因为parseFloat()只解析十进制值，因此不能指定底数
        - 字符串表示整数（没有小数点或者小数点后面只有一个零），则返回整数
        - 始终忽略字符串开头的0
        ```
        let num1 = parseFloat("1234blue");   // 1234，按整数解析
        let num2 = parseFloat("0xA");         // 0
        let num3 = parseFloat("22.5");        // 22.5
        let num4 = parseFloat("22.34.5");    // 22.34
        let num5 = parseFloat("0908.5");     // 908.5
        let num6 = parseFloat("3.125e7");    // 31250000
        ```
### 基础类型5 - String
### 基础类型6 - Symbol

### 复杂数据类型 - Object

== 会为了比较，而转换操作数

虽然不常见，但isNaN()可以用于测试对象。此时，首先会调用对象的valueOf()方法，然后再确定返回的值是否可以转换为数值。如果不能，再调用toString()方法，并测试其返回值。这通常是ECMAScript内置函数和操作符的工作方式45
---
---

# Promise
1. new Promise() 不可以，必须提供一个处理函数，哪怕是空函数 new Promise(()=>{})
2. Promise 的状态一旦改变，后面都会改变
## Promise 可以直接进入落定状态
1. Promise.resolve
- Promise.resolve 是幂等的
```
// 以下 p0 和 p1 是一样的
let p0 = new Promise(resolve => resolve())
let p1 = Promise.resolve(7);
let p2 = Promise.resolve(Promise.resolve(p1));
p1 === p2; 
// true
```
- 即使是错误对象，也是可以的
```
let p1 = Promise.resolve(new Error(7));
// Promise {<resolved>: Error: 7 at <anonymous>:1:26}
```
2. Promise.reject
- 区别于 Promise.resolve， Promise.reject不是幂等的， 如果嵌套，它会作为拒绝期约的理由
```
let p1 = Promise.reject(7);
let p2 = Promise.reject(p1);
// Promise {<rejected>: Promise}
p1 === p2
// false
```

## Promise 状态落定后，执行
1. 实例方法 Promise.prototype.then, 返回一个新的期约
- 不传处理程序则原样后传
```
let p1 = Promise.reject('1')
let p2 = p1.then() 
// Promise {<rejected>: "1"}
p1 === p2
// false
```
- 传处理函数，对于resolve和reject之后一样, 调用 then 的对应方法
    - 没有显示定义期约，则返回 Promise<resolved>: undefined / xx;
    - 返回期约的话，则是pending / reject, 直接throw也是reject, 但是 new Error是 resolved

```
let p1 = Promise.reject('1')
// 以下，不传 null， 等于reject 没有处理函数，等于透传
let p2 = p1.then(null, () => {})
// Promise {<resolved>: undefined}
let p3 = p1.then(null, () => '2')
// Promise {<resolved>: "2"}
let p4 = p1.then(null, () => new Promise(()=>{}))
// Promise {<pending>}
let p5 = p1.then(null, () => Promise.reject())
// Promise {<rejected>: undefined}
// throw 必须要用 {} 包
let p6 = p1.then(null, () => {throw '3'})
// Promise {<rejected>: "3"}
let p7 = p1.then(null, () => new Error('4))
// Promise {<resolved>: Error: 4 at <anonymous>:1:21}
```
2. 实例方法 Promise.prototype.catch, 返回一个新的期约同 then 
```
p1.then(null, ()=> console.log(1)).catch(()=> console.log(2))
// 只会打印1
```
3. 实例方法 Promise.prototype.finally, 返回一个新的期约, 但不同于then, catch， 只会透传
```
p1.then(null, ()=> console.log(1)).finally(()=> console.log(2))
// 1,2都会打印
```
```
let p1 = Promise.resolve('1')
// 以下，p2,p3都会透传
let p2 = p1.finally(null, () => {})
// Promise {<resolved>: 1}
let p3 = p1.finally(null, () => '2')
// Promise {<resolved>: 1}

// 注意， p4 和 p5的区别，只要 relove 就会变成透传
let p4 = p1.finally(null, () => new Promise(()=>{}))
// Promise {<pending>}
let p5 = p1.finally(null, () => Promise.resolve)
// Promise {<resolved>: 1}

let p6 = p1.finally(null, () => Promise.reject())
// Promise {<rejected>: undefined}
// throw 必须要用 {} 包
let p8 = p1.finally(null, () => {throw '3'})
// Promise {<rejected>: "3"}
```

## Promise.all
1. **必须**接受一个可迭代对象， 返回一个新的期约
```
let p1 = Promise.all([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
])
p1.then(res => console.log(res))
// [1, 2, 3]
```
2. 可迭代对象的元素，如果不是期约，会被 Promise.resolve转换为期约, 如下，等价于上面
```
let p2 = Promise.all([1, 2, 3])
```
3. Promise.all([]) 等价于 Promise.resolve()
4. 遇到待定，整体待定
5. 一个拒绝，全部拒绝，第一个拒绝会被当做理由，后面的拒绝无法改变这个拒绝,同时会静默处理其他期约的拒绝，但是原外层代码仍会执行

## Promise.race()
1,2,3同上
4. 最先解决的期约，无论成功或失败，会成为最终理由/值，可以直接获取，不在数组取值

## 拓展
1. 期约取消
    - 期约是激进的，在执行结束前无法停止；
    - 现有基础上实现取消期约的功能
    - [代码](../js/CancelPromise.js)
2. 进度追踪
    - [代码](../js/PromiseProgressHandler.js)

## 异步函数
1. async
- async 包装函数后，期待一个实现thenable的对象，所以可以直接返回一个promise; 如果不是会将函数的返回值，没有return 则为 undefined ，用 Promise.resolve() 包装为一个期约对象，后面可以用then获取到返回值
```
const thenable = {
    then(callback) {
        callback(123)
    }
}
```
- throw 或者 return reject 用 promise.reject对应的处理函数接受
- async声明一个异步函数，并且始终返回一个期约对象；但是其中的内容是同步的， 只是 then 中提供的函数是微任务
```
const fn = async function(){ return 1; }
fn().then(console.log)
```
2. await
- await 期待一个实现thenable的对象, 如果不是会被当做一个已经解决的期约（相当于用 Promise.resolve包装），然后再 “解包”
- 如果 await 的值被reject了，那么await之后的代码不会被执行；但是可以相对应的使用 catch 捕获异常
- await可以调用普通函数，并把普通函数的值作为最终的值
3. 注意
- async/await 中真正起作用的是 await
```
async function fn1() {
    console.log(await Promise.resolve(1))
}
async function fn2() {
    console.log(await 2)
}
async function fn3() {
    console.log(3)
}
fn1()
fn2()
fn3()
// 3 1 2
```
- 被 async 包装的异步函数中，await 之后的代码会被当做微任务, 等同步代码执行后，继续执行
```
async function fn1() {
    console.log(2)
    await null
    console.log(4)
}
console.log(1)
fn1()
console.log(3)
// 1, 2, 3, 4
```
- await 实际执行的是的一个then, 对于返回promise的函数，可以先调用后，用 await 注册求值， 如
    - 这种方法可以先注册期约，不依次执行期约，只依次接受resolve， 平行执行函数
    - 直接 await fn(), await fn2() 相当于串行
```
function fn () { return promise}; 
function fn2 () { return promise}; 
const a = fn();
const b = fn2();
await a;
await b;
```
- async/await 可以在for循环使用，会依次调用的

## 注意
1. 同步代码先执行， 执行 promise 本身会直接执行，相当于同步代码，只是 resolve 和 reject 调用时， 会排期，等同步代码执行后执行
2. resolve / reject调用后的代码仍然可以执行，只是状态更改后，后面更改状态将静默失败
3. 允许 then / catch / finllay 一直注册
```
let p1 = Promise.resolve()
p1.then(()=> console.log(1))
p1.then(()=> console.log(2))
```
4. reject 拒绝理由 / resolve 解决值 只能传递一个参数，其他传了也会被当做 undefined
5. 异步错误只能被异步的 onRejectd 处理程序捕获，不能中断外层代码执行，也不能被外层 try...catch 捕获，如下所示
```
Promise.reject(Error('foo)).catch(e => console.log(e))
```
6. promise本身是同步的，只有then中的处理函数是微任务
7. 调用栈
- promise 会保存完整的调用栈，错误信息， handlerReject 的信息也会保存，占用内存
- async await 不会保存 handlerReject，更准确的显示调用，不占内存
```
function handlerReject(resolve, reject) {
    setTimeout(reject, 1000, 'bar')
}

function foo() {
    new Promise(handlerReject)
}
foo()
```
---
---

# BOM
## window
- window两个身份，Global对象 + 浏览器窗口的 Javascript 接口
- let 和 const 声明的变量不会挂在 window 上，var 会
- 如下
```
// b 未声明，会报错
let a = b
// 这种不会报错
let a = window.b
```
- window.top / window.self 始终指向最上层，即window
- 最上层(window)的parent还是window
- window.screeLeft 和 window.screeTop 浏览器窗口，相对于电脑屏幕的位置，返回为css像素
- moveTo && moveBy， 必须用 window.open 打开新窗口，并用参数接收
```
myWindow = window.open('', '', 'width=200,height=100');
myWindow.document.write("<p>这是我的窗口</p>");
// 必须是window.open打开的窗口，移动到指定位置，x, y
myWindow.moveTo(0, 0);
myWindow.focus();
// 向两个方向移动的距离
myWindow.moveBy(0, 0);
```
- 像素比 window.devicePixelRatio 物理像素与逻辑像素的缩放系数
比如手机物理像素 1920\*1080但像素点特别小，需要降低为比较低的逻辑像素点，如 640\*320  window.devicePixelRatio就是3， 12css像素实际上是36像素物理像素
- css像素单位
    - em 当前元素的fontSize大小的倍数
    - rem 根元素的fontSize大小的倍数
    - vw/vh
- 窗口大小
1. outerHeight / outerWidth 返回浏览器当前自身大小，缩小浏览器值会变化，在 frame 用一样
2. 浏览器窗口中页面视口大小
    - innerHeight / innerWidth 是不是一个数值
    - 不是数值
        - document.compatMode === "CSS1Compat" 检查页面处于标准模式
            - 是， document.documentElement.clientHeight / document.documentElement.clientWeight， 手机缩放时候，值会变
            - 不是， document.body.clientHeight / document.body.clientWeight， 缩放时候，值会变
3. resizeBy && resizeTo, 必须要 myWinsow =  window.open
    - myWinsow.resizeTo(100, 50) 缩放到 100 * 50
    - myWinsow.resizeBy(50, 50) 缩放到 150 * 100 累加
- 视口位置
1. 视口滚动距离 window.pageXOffset / window.scrollX 和 window.pageYOffset / window.scrollY
2. 滚动
    - window.scrollBy(x, y) 滚动相应距离
    - window.scrollTo(x, y) 滚动到相应位置
    - window.scroll(x, y) 滚动
    - 以上接受一个ScrollOption字典，{left: 100, top: 100, behavior: 'auto'/'smooth'}} 
        - auto 正常滚动
        - smooth 平滑混动
- window.open() 
    - 四个参数
        1. 目标地址URL
        2. 目标窗口
            - 如果是窗口，或者窗格（frame）的名字，就在对应窗口打开链接
            - _self / _parent / _top / _blank
            - 不是新窗口，就新打开
        3. 特性字符串
            - 指定新窗口的配置，不传用默认的；
            - 必须是新窗口，才生效
            - 不可包含字符串，可配置 height/width/resizeable 等
        4. 表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值，一般不传这个参数，只在不打开新窗口时才使用
    - 返回一个对新窗口的引用，即新窗口的window
- window.close() **只能**用来关闭window.open打开的窗口
    - myWindow.close() 后引用虽然还在，但也**只能**用来检查 myWindow.closed 了， 此时为 true
- myWindow.opener 指向打开它的窗口 myWindow.opener  === window
    - myWindow.opener = null; 会切开与打开它的标签页的通信，因此可在独立进程中运行。不可逆
- window不会记录自己打开的窗口，需要自己记录
- 网页加载过程中调用 window.open()没有用，反而可能导致显示错误
- 浏览器可能会屏蔽弹窗
let blocked = false;
```
try {
    // 两种可能情况
    // 1- newWin返回为null
    let newWin = window.open('www.baidu.com', '_blank');
    if (newWin == null) {
        blocked = true
    }
} catch (e) {
    // 2- 调用window.open报错进入catch
    blocked = true;
}
// blocked 说明被屏蔽
```

### 定时器三个参数
- setTimeout(code, delay, args)
    - 第一个参数可以是一个方法，或者是 可执行的字符串
    - 第二个参数，毫秒数；告诉引擎在delay毫秒后，将任务添加到任务队列，如果队列空，直接执行；不为空，则需要等待；1s === 1000ms
```
function fn(a, b) {
    console.log(arguments)
}
// delay 之后的其余参数作为第一个方法的参数
setTimeout(fn, 5000, 'a', 'b', 'c', 'd')
```
- clearTimeout 执行是幂等的
- 开发环境建议用 setTimeout 实现 setInterval, 因为 setInterval 没办法保证一个任务结束到下一个任务开始之间的时间间隔，只是按时添加新任务，不管执行

### 系统对话框
- alert()/confirm()/prompt() 系统对话框
    - 与显示网页无关
    - 不包含 html；无法设置 css，完全由操作系统和浏览器确定
    - 同步，显示时代码会停止执行
- alert 接受一个参数，不是字符串，调用 toString
- confirm() 会返回一个布尔值，true-确定，false-取消
- prompt()
    - 两个参数，一个问题，一个默认值（可以为空）
    - 确定-返回用户输入，取消-返回null

- 异步对话框，楼兰器对话框计数器不会涉及，用户设置禁用也没用
    - window.print() 显示打印对话框，异步
    - window.find() 显示查找对话框，异步

## window.location ===  document.location; 
- 保存了文档信息，以及URL信息
- location.search中要用decodeURIComponent解码, 如下是语法糖，**URLSearchParams**
```
let str = '?a=1&b=2';
let obj = new URLSearchParams(str);
// 检测
obj.has('a'); // true
// 获取
obj.get('a'); // 1
// 设置
obj.set('c', 3);
obj.toString(); // a=1&b=2&c=3
// 删除
obj.delete('b');
obj.toString(); // a=1&c=3
// 支持for..of obj
```
- location.assign('http://www.baidu.com')
    - 跳转，同时在浏览器历史记录中增加一条记录
    - 以下两种会隐式调用，location.assign('http://www.baidu.com')
        - window.location = 'http://www.baidu.com'
        - location.href = 'http://www.baidu.com', 最常见
- location. hash / search / hostname / pathname /port = xx，也会修改当前的URL
    - location.hash = '**#**123'
    - location.search = '**?**a=123'
    - 其余类似
> 以上除了hash以外，都会重新加载URL, hash修改仍然会在浏览器历史记录增加一份记录
- 如果不想增加历史记录，可 location.replace('http://www.baidu.com')
- location.reload()，可重新加载当前页面
    - 不传参，重新加载，以最有效方式加载，可能从缓存加载
    - location.reload(true) 重新加载，从服务器加载
    - reload 之后的代码可能执行，也可能不执行，取决于网络延迟和系统资源等因素。最后做最后一行代码   
## window.navigator 客户端标识浏览器的标准。只要浏览器启用Javascript就有
- 通常用于确定浏览器类型
- window.navigator.appName 浏览器全名
- window.navigator.appVersion 浏览器版本，与实际一般不一样
- window.navigator.plugins 可用于检测是否安装插件
    - 返回数组
    - 数组每一项包括 
        - name - 插件名称
        - description - 插件介绍
        - filename - 插件的文件名
        - length - 当前插件处理的MIME类型数量
        - 还有可以访问 MimeType
    - 旧IE，检测插件，必须实例化插件， 并且需要知道插件的COM标识符, try new ActiveXObject(COM标识符) 不报错，即有该插件
    - window.navigator.plugins.refresh() 刷新 plugins 信息
        - 传参 true, 包含插件的页面都会重新加载
        - 不传，只有 plugins 内容
- navigator.registerProtocolHandler('mailto', 'http://www.somemailclient.com?cmd=%s', 'appleOne')
    - 注册处理程序，如上是把一个web应用程序注册为默认邮件客户端，这样邮件地址就可以通过指定web应用程序打开
    - 第一个参数，要处理的协议， mailto / ftp
    - 第二个参数，处理该协议的URL, %s 表示原始请求
    - 第三个参数，应用名称
- navigator.userAgent 获取浏览器独有信息，可用来判断使用的浏览器，服务器端用比较可靠，客户端一般认为是不安全的
    - 只读，直接修改不生效，可以用`window.navigator.__defineGetter__('userAgent', ()=>'foo')`伪造，如果不相信用户代理，那就用能力检测浏览器
    - 历史遗留问题，添加足够的信息，让服务器知道当前浏览器与其他浏览器兼容
    - 用户信息比本身什么浏览器更重要，一般用此判断浏览器
    - 可以通过一些库解析该字符串，来获取环境信息，如浏览器版本，操作系统等信息
- navigator.geolocation暴露了一个API，可以让脚本感知当前设备地理信息，不过精度和设备配置有关系
    - 当前地理信息 `navigator.geolocation.getCurrentPosition(po => console.log(po))`
- navigator.onLine 检查浏览器是否联网，可window上的事件，online/offline可以检测事件

## window.screen 客户端能力信息
- screen.orientation 移动端返回屏幕相对于默认情况的角度

## window.history 导航信息，不会暴露信息，但是可前进或后退
- history.go(param)
    - param 为数值，正数前进， 负数后退， 0 刷新
    - 旧版本浏览器，param 为字符串，则导航到最近的包含该字符串的位置，没有，则什么都不做
- history.back() 回退一步
- history.forward() 前进一步
- history.length 历史记录数量
    - history.length === 1，说明是用户窗口第一个页面
- hashchange 事件会在页面URL的散列变化触发
- 以上都会刷新页面，**改变URL而不会重新加载页面**
    - 历史记录管理
    - history.pushState()
        1. param1，state对象（应包含正确初始化页面状态所必须要的信息，一个对象，为防止滥用，大小限制在 500kb - 1mb以内）
        2. param2，新状态标题（当前浏览器还未实现，可传空字符串）
        3. param3，(可选的)相对URL，有历史记录，地址栏会更新的地址(+ '/相URL')，不会向服务器发送请求
        - 每个假的url都应该对象服务器一个真实的，不然刷新会报错，框架需要配置解决这个问题
    - history.replaceState(state对象, 新状态标题) 不添加历史记录，只会覆盖当前状态
    - window.addEventListener 可以添加一个 popstate 事件，后退时触发，事件对象有 state 属性
        - 最初页面 state 为 null
        - **需要**自己将页面状态重置为 event.state 的状态
    - history.state 获取当前的状态对象