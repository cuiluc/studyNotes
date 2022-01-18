let s1 = Symbol('foo'),
    s2 = Symbol('bar'),
    s3 = Symbol('baz'),
    s4 = Symbol('qux');
let o = {
    [s1]: 'foo val',
    a: 'a',
    b: 'b'
};
Object.defineProperty(o, s2, { value: 'bar val' });
Object.defineProperties(o, {
    [s3]: { value: 'baz val' },
    [s4]: { value: 'qux val' }
});
// 返回对象实例的符号属性数组。这两个方法的返回值彼此互斥
Object.getOwnPropertySymbols(o);
//  [Symbol(foo), Symbol(bar), Symbol(baz), Symbol(qux)]

// 返回对象实例的常规属性数组
Object.getOwnPropertyNames(o);
// ["a", "b"]

// 会返回同时包含常规和符号属性描述符的对象
Object.getOwnPropertyDescriptors(o);
// {a: {…}, b: {…}, Symbol(foo): {…}, Symbol(bar): {…}, Symbol(baz): {…}, …}

// 会返回两种类型的键
Reflect.ownKeys(o);
//  ["a", "b", Symbol(foo), Symbol(bar), Symbol(baz), Symbol(qux)]