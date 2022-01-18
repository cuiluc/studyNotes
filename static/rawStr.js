function printRaw(params) {
    console.log(params);
    // (2) ["©", "↵", raw: Array(2)]
    for (const string of params) {
        console.log(string);
    }
    // 插值表达式切割后的第一个参数数组，自带 raw
    for (const rawString of params.raw) {
        console.log(rawString);
    }
}
printRaw `\u00A9${ 'and' }\n`;
// Actual characters:
// ©
//（换行符）
// Escaped characters:
// \u00A9
// \n