// 异步合成
export const asyncCompose = (...fncs) => async(...args) => {
    const [action, ...fncList] = fncs
    let result = await action(...args)

    for (const fnc of fncList) {
        result = await fnc(result)
    }

    return result
}

export const asyncCompose2 = (...fnc) {
    return x => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}

// 合成
export const compose = (...fncs) => (...args) => {
    const [action, ...fncList] = fncs
    return fncList.reduce((arg, fnc) => fnc(arg), action(...args))
}

// 柯里化
export const curry = fnc => {
    const curryFnc = (...args) => {
        if (args.length >= fnc.length) return fnc(...args)

        return (...arg) => curryFnc(...args.concat(arg))
    }

    return curryFnc
}