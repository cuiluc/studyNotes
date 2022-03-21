# 一、完整的JavaScript包含以下三部分
1. 核心（ECMAScript） 定义核心功能；
    - Web浏览器只是一种宿主环境，宿主环境有很多
    - js 实现了 ECMAScript，也有其他语言实现了
    - 扩展（如DOM）使用 ECMAScript 核心类型和语法，提供特定于环境的额外功能
2. 文档对象模型（DOM）： 提供与网页内容交互的方法和接口
    - dom 并非只有 js 可访问，只是浏览器中 dom 是使用 ECMAScript 实现的
3. 浏览器对象模型（BOM）： 提供与浏览器交互的方法和接口
    - 可以操控浏览器显示页面之外的部分。
    - 唯一一个没有标准的部分

# 二、script
## 2.1 script元素有八个属性
1. async：可选。只对外部脚本文件有效。表示应立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。
2. charset：可选。使用src属性指定的代码字符集。很少使用，大多数浏览器不认这个。
3. crossorigin：可选。配置相关请求的CORS（跨源资源共享）设置。默认不使用CORS。crossorigin="anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据标志，意味着出站请求会包含凭据。
4. defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在IE7之前，行内也可用。
5. integrity：可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性（SRI, Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN, Content Delivery Network）不会提供恶意内容。
6. language：废弃。最初用于表示代码块中的脚本语言（如"JavaScript"、"JavaScript 1.2"或"VBScript"）。大多数浏览器都会忽略。
7. src：可选。表示包含要执行的代码的外部文件。
8. type：可选。代替language，表示代码块中脚本语言的内容类型（也称MIME类型）。按照惯例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript"都已经废弃了。JavaScript文件的MIME类型通常是"application/x-javascript"，不过给type属性这个值有可能导致脚本被忽略。在非IE的浏览器中有效的其他值还有"application/javascript"和"application/ecmascript"。如果这个值是module，则代码会被当成ES6模块，而且只有这时候代码中才能出现import和export关键字。

## 2.2 使用
### 2.2.1 行内 script
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

### 2.2.2 外部 script
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
### 2.2.3 noscript
- 以下两种会显示，noscript 标签中的内容，其他情况不会渲染其中的内容，noscript 标签中可包含其他标签，比如 p
    - 浏览器不支持脚本
    - 浏览器对脚本的支持被关闭
## 2.3 注意
- 需要动态加载的script外部脚本，比如在js中创建一个 script标签添加src属性。会影响性能，可以在文档头部， `<link rel="preload" href="想加载文件的路径">`
- 以前会把script放到head标签中，也就意味着必须把所有JavaScript代码都下载、解析和解释完成后，才能开始渲染页面（页面在浏览器解析到<*body>的起始标签时开始渲染）。
    - 对于需要很多JavaScript的页面，这会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白
    - 为解决这个问题，现代Web应用程序通常将所有JavaScript引用放在`<body>`元素中的页面内容后面
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