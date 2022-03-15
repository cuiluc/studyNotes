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

