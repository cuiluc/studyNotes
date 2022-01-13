# 定时器三个参数
> setTimeout(code, delay, args)
```
function fn(a, b) {
    console.log(arguments)
}
// delay 之后的其余参数作为第一个方法的参数
setTimeout(fn, 5000, 'a', 'b', 'c', 'd')
```

# Promise
1. new Promise() 不可以，必须提供一个处理函数，哪怕是空的 new Promise(()=>{})
2. Promise 的状态一旦改变，后面都会改变
### Promise 可以直接进入落定状态
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
### Promise 状态落定后，执行
3. 实例方法 Promise.prototype.then, 返回一个新的期约
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
3. 实例方法 Promise.prototype.catch, 返回一个新的期约同 then 
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
### 注意
1. 同步代码先执行， 执行 promise 本身会直接执行，相当于同步代码，只是 resolve 和 reject 调用时， 会排期，等同步代码执行后执行
2. resolve / reject调用后的代码仍然可以执行，只是状态更改后，后面更改状态将静默失败