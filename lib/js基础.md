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
- window.performance.now() 不受系统时间影响
- ()解释器先执行
- 严格模式为容易出错的地方，增加了限制


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
    - [例子](../static/excuScript.html)
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
    - 在Safari（直到Safari 5）和Chrome（直到Chrome 7）中用于检测正则表达式时，由于实现细节的原因，typeof也会返回"function"。目前是object
        - ECMA-262规定，任何实现内部[[Call]]方法的对象都应该在typeof检测时返回"function"。因为上述浏览器中的正则表达式实现了这个方法，所以typeof对正则表达式也返回"function"。
        - 在IE和Firefox中，typeof对正则表达式返回"object"。
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
- 表示零或多个16位Unicode字符序列
- 可以用双引号（"）、单引号（'）或反引号（`）表示，使用哪种引号没有区别，开始结束一致即可
- 如果字符串中包含双字节字符，那么length属性返回的值可能不是准确的字符数
- **字符字面量**
    - 字符串包含一些字符字面量，用于表示非打印字符或有其他用途的字符，转义序列
        - \n 换行
        - \t 制表
        - \b 退格
        - \r 回车
        - \f 换页
        - \\\ 反斜杠
        - \'，\"，\\`  字符串使用引号
        - \xnn  以十六进制表示的字符，其中n（0-F），如 \x41 - A，此时**length为1**
        - \unnnn 以十六进制表示的Unicode字符，其中n（0-F），如 \u03a3 - Σ，此时**length为1**
    - 注意
        - 以上字符可以出现在字符串的任意位置
        - 当做单个字符解释，length 为 1
- 字符串的特点
    - ECMAScript中的字符串是不可变的（immutable），意思是一旦创建，它们的值就不能变了。
    - 要修改某个变量中的字符串值，必须**先销毁**原始的字符串，然后将包含新值的另一个字符串保存到该变量
    ```
    let lang = "Java";
    lang = lang + "Script";
    ```
    - 变量lang一开始包含字符串"Java"。
    - 紧接着，lang被重新定义为包含"Java"和"Script"的组合，也就是"JavaScript"。
    - 整个过程首先会分配一个足够容纳10个字符的空间，然后填充上"Java"和"Script"。
    - 最后销毁原始的字符串"Java"和字符串"Script"，因为这两个字符串都没有用了。
    - 所有处理都是在后台发生的，而这也是一些早期的浏览器（如Firefox 1.0之前的版本和IE6.0）在拼接字符串时非常慢的原因。
    - 这些浏览器在后来的版本中都有针对性地解决了这个问题。
- 字符串转换
    - xx.toString()
        - 返回当前值的字符串等价物
        - 字符串调用只是简单地返回自身的一个副本
        - null 和 undefined 没有toString()
        - 参数，一般不接受；数值调用可以接收一个底数参数，即以什么底数来输出数值的字符串表示，默认十
        ```
        let num = 10;
        num.toString()     // "10"
        num.toString(2))    // "1010"
        num.toString(8))    // "12"
        num.toString(10)    // "10"
        num.toString(16)    // "a"
        ```
    - String(xx)，始终会返回表示相应类型值的字符串，规则如下：
        - 如果值有toString()方法，则调用该方法（不传参数）并返回结果。
        - 如果值是null，返回"null"。
        - 如果值是undefined，返回"undefined"。
    - xx + '' 也可以隐式转换
- 模板字面量
    - 单双引号，引号内跨行会报错只能用\n，反斜杠可以直接跨行且被保留
    - 会保持内部空格，有时候可能看着格式不当，比如``中先换行的话，相当于加了一个/n
    - 字符串插值，也就是可以在一个连续定义中插入一个或多个值，严格来说模板字面量不是字符串，是一种特殊的js语法表达式，只不过求值后得到的是字符串。
        - 模板字面量在定义时立即求值并转换为字符串实例，任何插入的变量也会从它们最接近的作用域中取值。
        - 所有插入的值都会使用，所有插入的值都会使用toString()强制转型为字符串，而且任何JavaScript表达式都可以用于插值 \`${变量}str`

    - 标签函数，接收被插值记号分隔后的模板和对每个表达式求值的结果。
        - [例子](../static/tagFunction.js)
    - 原始字符串，对**直接使用转义字符**的字符串，注意本身就是一个换行符使用无效，如
        - String.raw\`\u00A9` -\u00A9
        - 但是 String.raw\`©` - ©
        - [例子](../static/rawStr.js)
### 基础类型6 - Symbol()
- 符号是原始值，且符号实例是唯一、不可变的。创建唯一标记，不会冲突
- 没有字面量语法，不能和 new 当做构造函数用，是为了避免创建符号包装对象，像使用Boolean、String或Number那样，它们都支持构造函数且可用于初始化包含原始值的包装对象
- 可以传入一个字符串参数作为对符号的描述（description），可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关
```
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(genericSymbol == otherGenericSymbol); // false
console.log(fooSymbol == otherFooSymbol); // false
```
- 想要使用符号包装对象 Object(mySymbol)
- 全局符号注册表，需要复用时，使用字符串作为键
    ```
    let fooGlobalSymbol = Symbol.for('foo');
    let secondGlobalSymbol = Symbol.for('foo');
    console.log(typeof fooGlobalSymbol); // symbol
    fooGlobalSymbol === secondGlobalSymbol; // true
    ```
    - Symbol.for(str) 操作是幂等的，第一次调用的时候创建并注册到全局，后面继续调用相同的字符串时，直接返回该实例
    - Symbol('foo') !== Symbol.for('foo')
    - Symbol.for() **必须**使用字符串创建，传入的任何值都会被转化为字符串，不传值相当于 'undefined'
- Symbol.keyFor()来查询全局注册表
    - 接受符号，返回全局符号对应的字符串， Symbol.keyFor(Symbol.for('a')) - a
    - 如果不是全局符号返回 undefined， 如普通符号
    - 传入不是符号，抛错TypeError
- 作为对象属性
    - [例子](../static/objectSymbol.js)
    - 因为符号属性是对内存中符号的引用，如果没有找到只能Object.getOwnPropertySymbols(o)，循环tostring后，匹配字符串，才能找到
- 常用内置符号
    - 用于暴露语言内部行为，可以重新定义改变原生行为
    - 所有内置符号属性都是不可写、不可枚举、不可配置的。
    - 在提到ECMAScript规范时，经常会引用符号在规范中的名称，前缀为@@。比如，@@iterator指的就是Symbol.iterator。
    1. Symbol.asyncIterator
        - 方法，实现异步迭代器API的函数, 返回对象默认的AsyncIterator。for-await-of调用以Symbol.asyncIterator为键的函数。
        - 生成的对象应通过其next()方法陆续返回Promise实例。可以通过显式调用next()，也可隐式通过for-await-of调用
        - [例子](../static/symbolExams.js)
    2. Symbol.hasInstance
        - 方法，是否认可一个对象是它的实例。由instanceof操作符使用
        - 默认定义在原型上
        - [例子](../static/symbolExams.js)
    3. Symbol.isConcatSpreadable
        - 布尔值，true，可用Array.prototype.concat()打平其数组元素
        - Array.prototype.concat()方法会根据接收到的对象类型选择如何将一个类数组对象拼接成数组实例。
        - 数组对象默认情况下会被打平到已有的数组
            - false，整个对象追加到数组末尾。
            - 类数组对象，默认被追加到数组末尾，true打平。
            - 其他**不是类数组对象**的对象在Symbol.isConcatSpreadable被设置为true的情况下将被**忽略**。
            ```
            let initial = ['foo'];
            let array = ['bar'];
            console.log(array[Symbol.isConcatSpreadable]); // undefined
            console.log(initial.concat(array)); // ['foo', 'bar']
            // 类数组对象，默认直接追加 ['foo', {}]
            // 不是类数组对象，默认直接追加 ['foo', Set(1)]
            array[Symbol.isConcatSpreadable] = false;
            // 设置为true后
            // 类数组对象，直接追加 ['foo', 'bar']
            // 不是类数组对象，忽略 ['foo']
            initial.concat(array); //  ["foo", Array(1)]
            ```
    4. Symbol.iterator
        - 方法，返回对象默认的迭代器，表示实现迭代器API的函数。for-of语句使用。
        - 返回的对象是实现该API的Generator
        - [例子](../static/symbolExams.js)
    5. Symbol.match
        - 正则表达式方法，该方法用正则表达式去匹配字符串。String.prototype.match()方法使用
        - String.prototype.match()使用Symbol.match为键的函数，对正则表达式求值
        - 正则表达式的原型上默认有，因此所有正则表达式实例默认是这个String方法的有效参数
        - 非正则表达式值会被转换为RegExp对象。
        - 想改，直接使用参数，则可以重新定义Symbol.match函数以取代默认对正则表达式求值的行为，从而让match()方法使用非正则表达式实例。Symbol.match函数接收一个参数，就是调用match()方法的字符串实例
        - [例子](../static/symbolExams.js)
    6. Symbol.replace
        - 一个正则表达式方法，该方法替换一个字符串中匹配的子串。由String.prototype.replace()方法使用
        - String.prototype.replace()方法会使用以Symbol.replace为键的函数来对正则表达式求值。
        - 正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个String方法的有效参数
        - 给这个方法传入非正则表达式值会导致该值被转换为RegExp对象。
        - 如果想改变这种行为，让方法直接使用参数，可以重新定义Symbol.replace函数以取代默认对正则表达式求值的行为，从而让replace()方法使用非正则表达式实例。
        - Symbol.replace函数接收两个参数，即调用replace()方法的字符串实例和替换字符串。
        - 返回的值没有限制
        - [例子](../static/symbolExams.js)
    8. Symbol.search
        - 一个正则表达式方法，该方法返回字符串中匹配正则表达式的索引。由String.prototype.search()方法使用
        - 默认有
        - 给这个方法传入非正则表达式值会导致该值被转换为RegExp对象。
        - 如果想改变这种行为，让方法直接使用参数，可以重新定义Symbol.search函数以取代默认对正则表达式求值的行为，从而让search()方法使用非正则表达式实例。
        - Symbol.search函数接收一个参数，就是调用match()方法的字符串实例。
        - 返回的值没有限制
        - [例子](../static/symbolExams.js)
    9. Symbol.species
        - 一个函数值，该函数作为创建派生对象的构造函数
        - 在内置类型中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法
        - 用Symbol.species定义静态的获取器（getter）方法，可以覆盖新创建实例的原型定义
        - [例子](../static/symbol.species.js)
    10. Symbol.split
        - 一个正则表达式方法，该方法在匹配正则表达式的索引位置拆分字符串。由String.prototype.split()方法使用。
        - String.prototype. split()方法会使用以Symbol.split为键的函数来对正则表达式求值。
        - 正则表达式的原型上默认有这个函数的定义，因此所有正则表达式实例默认是这个String方法的有效参数
        - 给这个方法传入非正则表达式值会导致该值被转换为RegExp对象。
        - 如果想改变这种行为，让方法直接使用参数，可以重新定义Symbol.split函数以取代默认对正则表达式求值的行为，从而让split()方法使用非正则表达式实例。
        - Symbol.split函数接收一个参数，就是调用match()方法的字符串实例
        - 返回的值没有限制
        - [例子](../static/symbolExams.js)
    11. Symbol.toPrimitive
        - 方法，将对象转换为相应的原始值。由ToPrimitive抽象操作使用
        - 很多内置操作都会尝试强制将对象转换为原始值，包括字符串、数值和未指定的原始类型
        - 自定义对象可以改
        - 根据提供给这个函数的参数（string、number或default，参数表示在做什么运算，字符串还是数值，还是其他），控制返回的原始值
        - [例子](../static/symbolExams.js)
    12. Symbol.toStringTag
        - 字符串，用于创建对象的默认字符串描述。Object.prototype.toString()调用
        - 内置的对象，默认为"Object"，会把内置对象的构造函数显示出来
        - [例子](../static/symbol.toStringTag.js)
    13. Symbol.unscopables
        - 对象，该对象所有及继承的属性，都会从关联对象的with环境绑定中排除
        - 设置并映射对应属性的键值为true，可以阻止属性出现在with环境绑定中
        - 不推荐使用with，因此也不推荐使用Symbol.unscopables
        ```
        let o = { foo: 'bar' };
        with(o) {
            console.log(foo); // bar
        }
        o[Symbol.unscopables] = {
            foo: true
        };
        with(o) {
            console.log(foo); // ReferenceError
        }
        ```

### 复杂数据类型 - Object
- 可以new Object()可以不加括号创建，但是不推荐
- 派生其他对象的基类，Object上有的属性和方法，派生对象也有
- 所有对象的基类，对象的行为不一定适合JavaScript其他对象，比如 BOM和DOM是宿主环境决定的，不受ECMA-262约束，所以可能不继承。
- 每个Object实例都有以下属性和方法：
    - constructor：用于创建当前对象的函数。在new Object()中，这个属性的值就是Object()函数。
    - hasOwnProperty（propertyName）：用于判断当前对象实例（不是原型）上是否存在给定的属性。要检查的属性名必须是字符串（如o.hasOwnProperty("name")）或符号。
    - isPrototypeOf（object）：用于判断当前对象是否为另一个对象的原型。
    - propertyIsEnumerable(propertyName)：用于判断给定的属性是否可以使用for-in语句枚举。属性名必须是字符串。
    - toLocaleString()：返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
    - toString()：返回对象的字符串表示。
    - valueOf()：返回对象对应的字符串、数值或布尔值表示。通常与toString()的返回值相同。

## 操作符
- 可以应用于各种值，不过在用给对象时，通常会调用valueOf()和/或toString()方法来取得可以计算的值。
### 递增/递减操作符
- 前缀递增或递减，会在语句被求值改变，俗称副作用
- 前缀递增或递减 和 后缀递增或递减，可以作用于任何值，不限于整数——字符串、布尔值、浮点值，对象也可，最终都会转化为数值（数值包括NaN）。规则如下
    - 有效数值字符串，转为数值，再计算
    - 非有效数值字符串，NaN
    - 布尔值false，0，再计算
    - 布尔值true，1，再计算
    - 浮点数，加减1，浮点数会不精确，如let a = 1.1; --a; 0.10000000000000009
    - 对象，先valueOf()，应用上面规则，仍NaN的话；则再toString()，应用上面规则，不行，NaN
### 一元加和减操作符
- 主要用于数值运算，也可用于转类型
- 加号
    - 对数值没有任何影响
    - 应用到非数值，和Number一样的规则，最终都会变为数值
- 减号
    - 数值变负数
    - 应用到非数值，和加号一样，转化后取负值
### 位操作符
- 用于数值的底层操作，即操作内存中表示数据的比特（位）
- ECMAScript中的所有数值都以IEEE 754 64位格式存储。位操作并不直接用64位，先转成32位，再运算，再转成64位存储，但开发者只感知到32位。这个转换也导致副作用，即特殊值NaN和Infinity在位操作中都会被当成0处理
- 有**符号整数**使用32位 = 前31位表示整数值 + 第32位表示数值的符号（0表示正，1表示负）。第32位称为符号位（sign bit），它的值决定了数值其余部分的格式
    - 正值以真正的二进制格式存储，即31位中的每一位都代表2的幂，第一位2的0次方，依次类推，空用0填，表示忽略不计。如数值18的二进制格式为00000000000000000000000000010010，或更精简的10010。后者是用到的5个有效位，决定了实际的值，2^4 + 2^1 = 18
    - 负值以一种称为二补数（或补码）的二进制编码存储，计算：
        1. 确定绝对值的二进制表示，比如 -18 看 18
        2. 找到数值的一补数（或反码），即，每个0变1，每个1变0，比如  10010 变   1111   1111   1111   1111   1111   1111   1110   1101
        3. 给结果加一， 1111   1111   1111   1111   1111   1111   1110   1110
    - 在处理有符号整数时，无法访问第31位。
    - ECMAScript会记录，转换时会求补位，但实际看到的-18.toString(2)为-10010，绝对值加负号
    - ECMAScript所有整数都是有符号数的，但实际也有无符号的，第32不表示符号表数值，此时表示整数范围更大
#### 位非操作符 波浪符（~）
- 返回数值的一补数
```
let num1 = 25;        // 二进制00000000000000000000000000011001
let num2 = ~num1;    // 二进制11111111111111111111111111100110
console.log(num2);   // -26
```
- 按位非的最终效果是对数值取反并减1，但因为位操作是在数值的底层表示上完成的，位操作的速度快得多。

#### 按位与操作符 和号（&）
- 两个操作数，a&b，返回值会将二进制转为十进制数
- 都是1返回1，遇0则0

#### 按位或操作符 管道符（|）
- 两个操作数，a|b，返回值会将二进制转为十进制数
- 都是0返回0，遇1则1

#### 按位异或 脱字符（^）
- 两个操作数，a^b，返回值会将二进制转为十进制数
- 一0一1，返回1；一样0

#### 左移，两个小于号（<<）
- 会按照指定的位数将数值的所有位向左移动
- 转为二进制，**符号位固定不变**，将其他精简，向左移动几位，后面补几个零
- 负数时，转化为绝对值，左移后，加负号
- 左移保留操作数的符号。 2 << 5 - 64, -2 << 5 - -64

#### 右移
1. 有符号右移
    - 两个大于号（>>）
    - 是左移的逆运算
    - 转二进制，将其他精简，向右移动几位，空位出现在左侧，**符号位之后**，补几个零
    - 负数时，转化为绝对值，右移后，加负号
2. 无符号右移
    - 3个大于号（>>>）
    - 将数值的所有32位都向右移
    - 正数和有符号右移一样
    - 负数，连带符号位一起左移
### 布尔操作符
1. 逻辑非 叹号（!），一个操作数
    - 始终返回布尔值
    - 先将操作数转换为布尔值，再取反
    - 非0数值（包括Infinity），false
    - NaN、null，true
    - 两个叹号（! !），相当于调用Boolean()
2. 逻辑与 两个和号（&&），两个个操作数
    - 有操作数不是布尔值，不一定返回布尔值，规则如下
        - 第一个对象，则返回第二个操作数。
        - 第二个对象，则只有第一个操作数求值为true才会返回该对象。
        - 两个都对象，则返回第二个操作数。
        - 有一个null，则返回null。
        - 有一个NaN，则返回NaN。
        - 有一个操作数是undefined，则返回undefined
    - 短路操作符，如果第一个值决定了结果false，不会再对第二个操作数求值
3. 逻辑或 两个管道符（||）
    -  有操作数不是布尔值，不一定返回布尔值，规则如下
        - 第一个是对象，则返回第一个操作数。
        - 第一个求值为false，则返回第二个操作数。
        - 两个都是对象，则返回第一个操作数。
        - 两个都是null，则返回null。
        - 两个都是NaN，则返回NaN。
        - 两个都是undefined，则返回undefined。
    - 短路操作符，如果第一个值决定了结果true，不会再对第二个操作数求值
        - 可用于赋值默认值
### 乘性操作符
1. 乘法 *
    - 非数值操作数，会使用Number转型
    - 有NaN返回NaN
    - 0 * Infinity，NaN
2. 除法 /
    - 非数值操作数，会使用Number转型
    - 有NaN返回NaN
    - Infinity / Infinity、0 / 0 ，NaN
    - 非0 / 0，Infinity；负非0 / 0，-Infinity
3. 取模操作数 %，返回余数
    - 非数值操作数，会使用Number转型
    - Infinity % 有限值，NaN
    - 有限值 % Infinity，有限值
    - 有限值 % 0，NaN
    - Infinity % Infinity，NaN
    - 0 % 非，0
### 指性操作符
- Math.pow(3, 2) === 3 ** 2 = 9
- 指数赋值操作符 let a = 3; a **= 2，9
### 加性操作符
1. 加法 + 
    - 都是数值，规则如下：
        - 如果有任一操作数是NaN，则返回NaN；
        - 如果是Infinity加Infinity，则返回Infinity；
        - 如果是-Infinity加-Infinity，则返回-Infinity；
        - 如果是Infinity加-Infinity，则返回NaN；
        - 如果是+0加+0，则返回+0；
        - 如果是-0加+0，则返回+0；
        - 如果是-0加-0，则返回-0
    - 有一个字符串，拼接，对象调用toString()\undefined、null掉调用String()
2. 减法 -
    - 两个操作数都是数值，执行数学减法运算并返回结果。
    - 有任一操作数是NaN，则返回NaN。
    - Infinity减Infinity，则返回NaN。
    - -Infinity减-Infinity，则返回NaN。
    - Infinity减-Infinity，则返回Infinity。
    - -Infinity减Infinity，则返回-Infinity。
    - +0减+0，则返回+0。
    - +0减-0，则返回-0。
    - -0减-0，则返回+0。
    - 有任一操作数是字符串、布尔值、null或undefined，则Number()转换，再用前面的规则执行数学运算。如果转换结果是NaN，则减法计算的结果是NaN。
    - 有任一操作数是对象，valueOf()。如果是NaN，则减法计算的结果是NaN。如果对象没有valueOf()方法，则调用其toString()方法，然后再将得到的字符串转换为数值。
### 关系操作符 < <= > >=
- 均返回布尔值
- 规则
    - 都是数值，数值比较。
    - 都是字符串，则逐个比较字符串中对应**字符的编码**。
    - **任一操作数是数值**，则将另一个操作数转换为数值，执行数值比较
    - 任一操作数是对象，调用valueOf()后，根据前面的规则执行比较。如果没有valueOf()，则用toString()后比较。
    - 任一操作数是布尔值，则将其转换为数值再执行比较
    - 任何关系操作符在涉及比较NaN时都返回false
- 大写字母的编码都小于小写字母的编码，最好转成小写比较
- '23' < '3'，true，字符串; '23' < 3，false，数值
### 相等操作符
- 等于和不等于会进行强制类型转化
    - 布尔转数值
    - 一字符串一数值，转成数值
    - 对象，valueOf()后比较
    - null == undefined
    - null和undefined不能转为其他类型的值再比较
    - NaN与任何不相等
    - 指向同一对象相等，否则不
### 赋值操作符 %= 、<<= 、>>=
### 逗号操作符
- let num = (5, 1, 4, 8, 0); // num的值为0，返回表达式最后一个值

## 语句，流控制
- do-while 后测试语句，至少执行一次
- for循环
    - 初始化，条件表达式，循环后表达式都不是必须的
        - for(;;){} 无限循环
    - 第三个，循环后执行后执行的表达式，一般是 i++，循环体执行了才会执行；
- for-in： key
    - 枚举对象中**非符号键**属性
    - 循环遍历为null，undefined不执行循环体
- for-of: value
    - 遍历可迭代对象，如果不可迭代，会抛错
- for-await-of
    ```
    async function* asyncGenerator() {
        let i = 0;
        while (i < 3) {
            yield i++;
        }
    }

    (async function() {
        for await (let num of asyncGenerator()) {
            console.log(num);
        }
    })();
    // 0
    // 1
    // 2
    ```
- 标签语句 label: statement
    - 可通过break或continue语句引用
        - break直接跳出到标签位置
        - continue 直接跳回标签位置
    ```
    start: for (let i = 0; i < count; i++) {
        console.log(i);
    }
    ```
- with(expression) statement; 
    - 将代码作用域设置为特定对象
    - 针对对一个对象反复操作的场景
    - statement先找局部变量，在搜索expression下同名属性
    - 严格模式不可用
    ```
    with(location) {
        let qs = search.substring(1);
        let hostName = hostname;
        let url = href;
    }
    ```
- switch
    - break会跳出switch，不写 break 会继续匹配下一个条件，这时，最好加个注释，表示故意不写
    - value1可以是变量或表达式求值
    - 默认是对比 expression 和 value1，全等判断
    - expression为布尔值true时，下面的case可以写其他表达式求值为true时，执行语句

    ```
    switch (expression) {
        case value1:
            statement
            break;
        case value2:
            statement
            break;
        default:
        statement
    }
    ```
- 函数
    - 严格模式，函数名或者参数不能是eval或者arguments，两个参数不可同名，否则会报错，不执行

# 变量、作用域与内存
## 原始值和引用值
- 原始值： 六种原始值是按值引用的，不能有属性，但添加不会报错。原始值大小固定，因此保存在栈内存上
- 引用值，保存在内存中，不允许直接访问内存位置，因此不能直接操作对象的内存空间。实际上操作的是引用（指向对应对象的指针），按引用访问；引用值是对象，存储在堆内存上。
- 函数传参是按值传参的会复制，所以如果传参对象，函数内部的修改会反应到外部
- 传参是会复制到一个局部变量（即一个命名参数），或者说复制到arguments一个槽位中
- typeof只能区分原始值，引用至用 variable instanceof constructor(如Array)
### 执行上下文
#### 基础
- 变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为。
- 每个上下文都有一个关联的**变量对象**（variable object），而这个上下文中定义的所有变量和函数都存在于这个对象上。
- 虽然无法通过代码访问变量对象，但后台处理数据会用到它。
- 上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数。
- 全局上下文
    - 最外层的上下文
    - 根据ECMAScript实现的宿主环境，表示全局上下文的对象可能不一样
    - 在浏览器中，就是window对象，因此var定义的全局变量和函数都会成为window对象的属性和方法。
    - 使用let和const的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。
    - 全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器
- 函数上下文
    - 每个函数调用都有自己的上下文。
    - 当代码执行流进入函数时，函数的上下文被推到一个**上下文栈**上。
    - 在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返**还给之前的执行上下文**。
    - ECMAScript程序的执行流就是通过这个上下文栈进行控制的。
- 执行上下文分全局上下文、函数上下文和块级上下文
- 变量的执行上下文用于确定什么时候释放内存
- **作用域链**
    - 上下文中的代码在执行的时候，会创建变量对象的一个**作用域链**（scopechain）。
    - 决定了各级上下文中的代码在访问变量和函数时的顺序。
    - 代码正在执行的上下文的变量对象始终位于作用域链的最前端。
    - 如果上下文是函数，则其**活动对象**（activation object）用作变量对象。
    - 活动对象最初**只有一个**定义变量：arguments。（全局上下文中没有这个变量。）
    - 作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；
    - 全局上下文的变量对象始终是作用域链的最后一个变量对象。
    - 代码执行时的标识符解析是通过沿作用域链逐级搜索标识符名称完成的。搜索过程始终从作用域链的最前端开始，然后逐级往后，直到找到标识符。（如果没有找到标识符，那么通常会报错。）
    - 局部作用域中定义的变量可用于遮蔽全局变量
    - 内部上下文可以通过作用域链访问外部上下文中的一切，但外部上下文无法访问内部上下文中的任何东西。上下文之间的连接是线性的、有序的。可以向上找，不可向下。
#### 作用域链增强
- 执行上下文主要有全局上下文和函数上下文。eval()内部存在第三种上下文，可在其他方式来增强作用域链
- 某些语句会导致在作用域链前端**临时添加**一个上下文，这个上下文在代码执行后会被删除。通常以下两种情况会出现：
    1. try/catch语句的catch块，创建一个新的变量对象，包含要抛出的错误对象的声明
    2. with语句，添加指定对象
#### 变量声明
1. var
    - 被添加在最接近的上下文，函数/全局
    - 未声明初始化，添加到全局上下文，严格模式报错
    - 声明会提升（undefined 而不是 Reference Error），可先赋值，再声明
2. const 
    - 声明不初始化会报错
    - 只应用到顶级原语或者对象，不可赋值其他引用值，但对象的键则不受限制
    - 想让整个对象都不能修改，可以使用Object.freeze()，再给属性赋值时不会报错，但会静默失败
    - 由于const声明暗示变量的值是单一类型且不可修改，JavaScript运行时编译器可以将其所有实例都替换成实际的值，而**不会通过**查询表进行变量查找。谷歌的V8引擎就执行这种优化。
#### 标识符查找
- 当在特定上下文中为读取或写入而引用一个标识符时，必须通过搜索确定这个标识符表示什么。
    - 搜索开始于作用域链前端，以给定的名称搜索对应的标识符。
    - 如果在局部上下文中找到该标识符，则搜索停止，变量确定；
    - 如果没有找到变量名，则继续沿作用域链搜索。（注意，作用域链中的对象也有一个原型链，因此搜索可能涉及每个对象的原型链。）
    - 这个过程一直持续到搜索至全局上下文的变量对象。
    - 如果仍然没有找到标识符，则说明其未声明。
- 使用块级作用域声明并不会改变搜索流程，但可以给词法层级添加额外的层次
- 局部找到后不会找到全局，除非用 window.xx
- 标识符查找有代价。访问局部变量比访问全局变量要快，因为不用切换作用域。不过，JavaScript引擎在优化标识符查找上做了很多工作，将来这个差异可能就微不足道了。

### 垃圾回收
- JavaScript是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存。
- 自动内存管理实现内存分配和闲置资源回收
- 周期性检查不使用的变量，**周期性**（或者说在代码执行过程中某个预定的收集时间）就会自动运行
- 垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，意味着靠算法是解决不了的。
#### 用过的两种主要标记策略
1. 标记清理（mark-and-sweep）
    - 当变量进入上下文，会被加上存在于上下文中的标记。当变量离开上下文时，也会被加上离开上下文的标记。
    - 离开作用域的值会被自动标记为可回收，然后在垃圾回收期间被删除
    - 加标记的方式有很多种。比如，当变量进入上下文时，反转某一位；或者可以维护“在上下文中”和“不在上下文中”两个变量列表，可以把变量从一个列表转移到另一个列表。标记过程的实现并不重要，关键是策略
    - 垃圾回收程序运行的时候，会标记内存中存储的所有变量（**记住，标记方法有很多种**）。它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记**去掉**。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。
    - 到了2008年，IE、Firefox、Opera、Chrome和Safari都在自己的JavaScript实现中采用标记清理（或其变体），只是在运行垃圾回收的频率上有所差异。
2. 引用计数，不再使用
    - 对每个值都记录它被引用的次数
    - 当一个值的引用数为0时，就说明没办法再访问到这个值了，因此可以安全地收回其内存了。垃圾回收程序**下次运行**的时候就会释放引用数为0的值的内存。
    - 问题点在于循环引用 let a = {}; let b = {}; a.obj = b; b.obj = a; 引用数为2
    - 在IE8及更早版本的IE中，并非所有对象都是原生JavaScript对象。BOM和DOM中的对象是C++实现的组件对象模型（COM, Component Object Model）对象，而**COM对象**使用引用计数实现垃圾回收。
    - 即使这些版本IE的JavaScript引擎使用标记清理，JavaScript存取的COM对象依旧使用引用计数。换句话说，只要涉及COM对象，就无法避开循环引用问题
    - 为避免类似的循环引用问题，应该在确保不使用的情况下切断原生JavaScript对象与DOM元素之间的连接。手动删除引用赋值null


#### 性能
- 垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的时间调度很重要。尤其是在内存有限的**移动设备上**，垃圾回收**有可能会明显拖慢渲染的速度和帧速率**。开发者不知道什么时候运行时会收集垃圾，因此最好的办法是在写代码时就要做到：无论什么时候开始收集垃圾，都能让它尽快结束工作。
- 现代垃圾回收程序会基于对JavaScript运行时环境的探测来决定何时运行。探测机制因引擎而异，但基本上都是根据已分配对象的大小和数量来判断的。比如，根据V8团队2016年的一篇博文的说法：“在一次完整的垃圾回收之后，V8的堆增长策略会根据活跃对象的数量外加一些余量来确定何时再次垃圾回收。”
- 由于调度垃圾回收程序方面的问题会导致性能下降，曾经IE是根据分配数，只要超过分配数，就会垃圾回收。但是可能整个周期中一直需要，结果就会导致垃圾回收程序过于频繁地运行。由于对性能的严重影响，IE7最终更新了垃圾回收程序。 IE7发布后，JavaScript引擎的垃圾回收程序被调优为动态改变分配变量、字面量或数组槽位等会触发垃圾回收的阈值。IE7的起始阈值都与IE6的相同。如果垃圾回收程序回收的内存不到已分配的15%，这些变量、字面量或数组槽位的阈值就会翻倍。如果有一次回收的内存达到已分配的85%，则阈值重置为默认值。这么一个简单的修改，极大地提升了重度依赖JavaScript的网页在浏览器中的性能。
- 在某些浏览器中是有可能（但不推荐）主动触发垃圾回收的。在IE中，window. CollectGarbage()方法会立即触发垃圾回收。在Opera 7及更高版本中，调用window. opera.collect()也会启动垃圾回收程序。

#### 内存管理
- JavaScript运行在一个内存管理与垃圾回收都很特殊的环境。分配给浏览器的内存通常比分配给桌面软件的要少很多，分配给移动浏览器的就更少了。这更多出于安全考虑而不是别的，就是为了避免运行大量JavaScript的网页耗尽系统内存而导致操作系统崩溃。这个内存限制不仅影响变量分配，也影响调用栈以及能够同时在一个线程中执行的语句数量。
- 将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为null，从而释放其引用（对于对象，解除引用如果属性引用了其他对象，也需要设置成null）。这也可以叫作**解除引用**。这个建议最适合全局变量和全局对象的属性。局部变量在超出作用域后会被自动解除引用。可以消除循环引用，而且对垃圾回收也有帮助。
- 函数变量赋值了一个新对象，退出时，只要没有递归或者闭包，也会解除引用。
- 解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关的值已经不在上下文里了，因此它在下次垃圾回收时会被回收。
1. 通过const和let声明提升性能，因为块级作用域
2. 隐藏类和删除操作
    - 根据JavaScript所在的运行环境，有时候需要根据浏览器使用的JavaScript引擎来采取不同的性能优化策略。截至2017年，Chrome使用V8JavaScript引擎。V8在将解释后的JavaScript代码编译为实际的机器码时会利用“隐藏类”。
    - 运行期间，V8会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好，V8会针对这种情况进行优化，但不一定总能够做到。
    - 如果共享的隐藏对象的两个变量，其中一个添加了值或者删除了某个属性（会导致生成相同的隐藏类片段），那么就不能共享，会变成两个隐藏类。频率多或者隐藏对象明显影响性能
    - 最佳实践是把不想要的属性设置为null。这样可以保持隐藏类不变和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果。
    ```
    function Article() {
        this.title = 'Inauguration Ceremony Features Kazoo Band';
        this.author = 'Jake';
    }
    let a1 = new Article();
    let a2 = new Article();
    a1.author = null;
    ```
3. 内存泄漏
    - 变量赋值前，没有使用声明关键字
    - 定时器回调函数通过闭包使用外部变量
    - 函数闭包
4. 静态分配与对象池
    - 为了提升JavaScript性能，最后要考虑的一点往往就是压榨浏览器了。一个关键问题就是如何减少浏览器执行垃圾回收的次数。开发者无法直接控制什么时候开始收集垃圾，但可以间接控制触发垃圾回收的条件。理论上，如果能够合理使用分配的内存，同时避免多余的垃圾回收，那就可以保住因释放内存而损失的性能。
    - 浏览器决定何时运行垃圾回收程序的一个标准就是对象更替的速度。如果有很多对象被初始化，然后一下子又都超出了作用域，那么浏览器就会采用更激进的方式调度垃圾回收程序运行，这样当然会影响性能。
    - 频繁创建新对象（初始化对象），垃圾回收调度程序会发现这里对象更替的速度很快，从而会更频繁地安排垃圾回收。
    - 一个策略是使用对象池。在初始化的某一时刻，可以创建一个对象池，用来管理一组可回收的对象。后续只变属性。由于没发生对象初始化，垃圾回收探测就不会发现有对象更替，因此垃圾回收程序就不会那么频繁地运行
    - 如果对象池只按需分配矢量（在对象不存在时创建新的，在对象存在时则复用存在的），那么这个实现本质上是一种贪婪算法，有单调增长但为静态的内存。这个对象池必须使用某种结构维护所有对象，数组是比较好的选择。不过，使用数组来实现，必须留意不要招致额外的垃圾回收。
    - 比如`let objList = new Array(100)；let obj = {}; objList.push(obj)`由于JavaScript数组的大小是动态可变的，引擎会删除大小为100的数组，再创建一个新的大小为200的数组。垃圾回收程序会看到这个删除操作，说不定因此很快就会跑来收一次垃圾。要避免这种动态分配操作，可以在初始化时就创建一个大小够用的数组，从而避免上述先删除再创建的操作。不过，必须事先想好这个数组有多大。
    - 注意 静态分配是优化的一种极端形式。如果你的应用程序被垃圾回收严重地拖了后腿，可以利用它提升性能。但这种情况并不多见。大多数情况下，这都属于过早优化，因此不用考虑。
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
    - [代码](../static/CancelPromise.js)
2. 进度追踪
    - [代码](../static/PromiseProgressHandler.js)

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