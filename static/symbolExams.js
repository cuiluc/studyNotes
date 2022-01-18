class Emitter {
    constructor(publicParam) {
        this.publicParam = publicParam;
        this.asyncIdx = 0;
        this.idx = 0;
    };
    // 只有这个有static
    static[Symbol.hasInstance](instance) {
        return false
    };
    /*
        const o = new Emitter();
        Emitter[Symbol.hasInstance](o) // 因为重置了，false, 等同于 o instanceof Emitter
    */

    async * [Symbol.asyncIterator]() {
        while (this.asyncIdx < this.publicParam) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    };
    /*
    async function asyncCount() {
    let emitter = new Emitter(5);
    for await (const x of emitter) {
        console.log(x);
        }
    }
    asyncCount();
    // 0
    // 1
    // 2
    // 3
    // 4
    */
    *
    [Symbol.iterator]() {
        while (this.asyncIdx < this.publicParam) {
            yield new Promise((resolve) => resolve(this.asyncIdx++));
        }
    };
    /*
    let count = new Emitter(5);
    for await (const x of count) {
        console.log(x);
    }
    // 0
    // 1
    // 2
    // 3
    // 4
    */
    static[Symbol.match](target) {
        return target.includes(this.publicParam)
    };
    /*
    'foobar'.match(new Emitter('foo')); // true
    'barbaz'.match(new Emitter('qux')); // false
    */
    static[Symbol.replace](target, replace) {
        return target.split(this.publicParam).join(replace);
    };
    // 'barfoobaz'.replace(new Emitter('foo'), 'qux') // "barquxbaz"
    [Symbol.search](target) {
        return target.indexOf(this.publicParam);
    };
    // 'barfoobaz'.search(new Emitter('foo')) // 3
    [Symbol.split](target) {
        return target.split(this.publicParam);
    };
    // 'barfoobaz'.split(new Emitter('foo')) // ["bar", "baz"]
}