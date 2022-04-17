## github中fork了别人的分支，关联
1. 将自己的代码 clone下来
2. 执行下面操作
```
// 查看当前状态
git remote -v
// 添加关联
git remote add upstream gitUrl
// 再次确认
git remote -v
// 将提交 push 上自己的分支即可
```