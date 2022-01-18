class CancelToken {
    constructor(CancelFn) {
        this.promise = new Promise((resolve, reject) => {
            // CancelFn 括号里面的值作为参数
            CancelFn(() => {
                console.log('Class CancelToken - CancelFn');
                resolve()
            })
        })
    }
}

const startButton = document.querySelector('#start');
const cancelButton = document.querySelector('#cancel');

function cancellableDelayedResolve(delay) {
    console.log('set delay');

    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            console.log('delayed resolve')
            resolve()
        }, delay)

        const cancelToken = new CancelToken(cancelCallback => {
                // 在 this.promise 上定义了一个promise, 等待点击后，将promise 兑现 resolve
                cancelButton.addEventListener('click', cancelCallback)
            })
            // 等待期约兑现后，取消期约
        cancelToken.promise.then(() => clearTimeout(id))
    })
}

startButton.addEventListener('click', () => cancellableDelayedResolve(1000))