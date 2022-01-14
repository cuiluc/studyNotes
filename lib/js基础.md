# 定时器三个参数
> setTimeout(code, delay, args)
```
function fn(a, b) {
    console.log(arguments)
}
// delay 之后的其余参数作为第一个方法的参数
setTimeout(fn, 5000, 'a', 'b', 'c', 'd')
```
---
- window.performance.now() 不受系统时间影响
- script执行
    1. 内部， script 标签中的代码没有完成前，页面的其余内容不会被加载，也不会显示； 
    2. 外部
    - 在解释外部javascript文件的时候，页面也会阻塞，阻塞时间包括加载时间
    - async 属性，可以立即下载脚本，但不阻塞其他页面执行， 多个 async，不能保证执行顺序，区别于defer
    - defer 立即下载，但延迟到文档完全解析和显示后再执行
    - 其他按照页面书写顺序解释
    - 在里面加行内代码会被忽略
    3. 需要动态加载的script外部脚本，比如在js中创建一个 script标签添加src属性。会影响性能，可以再文档头部， `<link rel="preload" href="想加载文件的路径">`
    4. 以下两种会显示，noscript 标签中的内容，其他不会渲染其中的内容，noscript 标签中可包含其他标签，比如 p
    - 浏览器不支持脚本
    - 浏览器对脚本的支持被关闭
    5. 即使是字符串在 script 标签也不可以直接写， `</script>`，必须转义 **<\/script>** 才行
    6. 一个script标签为一个宏任务, 先执行第一个宏任务，也就是第一个script标签，然后依次去塞，先进先出
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

---
## 变量
 - 在解析代码时，Javascript引擎也会注意到块后面的 let/const 声明，在声明之前不可以引用，声明前使用的执行瞬间叫**暂时性死区**
 - var 的变量会成为 window 对象的属性， let 不会
 - let 是块级作用域，所以可以在不同的script块声明

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


## 注意： 传递函数 和 函数调用，传递的函数可以抽离，注意API传递的参数即可

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
- window.open

