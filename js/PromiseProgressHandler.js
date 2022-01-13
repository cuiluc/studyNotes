class TrackablePromise extends Promise {
    constructor(executor) {
        const notifyHandler = [];
        super((resolve, reject) => {
            return executor(resolve, reject, status => {
                // 每完成一个期约， 执行一次 notifyHandler 处理函数
                notifyHandler.map(handler => handler(status))
            })
        })

        this.notifyHandler = notifyHandler;
    }

    notify(notifyHandler) {
        // 进度处理函数 列表
        this.notifyHandler.push(notifyHandler);
        return this;
    }
}

let p = new TrackablePromise((resolve, reject, notify) => {
    function countdown(x) {
        if (x > 0) {
            // 实际执行的 notifyHandler.map(handler => handler(status))
            notify(`${20 * x}% remaining`)
            setTimeout(() => countdown(x - 1), 1000)
        } else {
            resolve()
        }
    }
    countdown(5)
});
// 传递 进度处理函数
p.notify(x => console.log('progess', x));

p.then(() => { console.log('done') });
// 1s后, progess 80% remaining
// 2s后, progess 60% remaining
// 3s后, progess 40% remaining
// 4s后, progess 20% remaining
// 5s后, done

p.notify(x => console.log('a', x)).notify(x => console.log('b', x));

p.then(() => { console.log('done') });

// 1s后, a 80% remaining
// 1s后, b 80% remaining
// 2s后, a 60% remaining
// 2s后, b 60% remaining
// 3s后, a 40% remaining
// 3s后, b 40% remaining
// 4s后, a 20% remaining
// 4s后, b 20% remaining
// 5s后, done