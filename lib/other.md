# npm
## npm发布
  1. 申请账户
  2. 提示输入用户名，密码，公共邮箱，填好登录成功 npm login
  3. 查看状态 npm whoami
  4. 发布 npm publish

>注意
1. 发布前需要切换到npm镜像
2. 发布必须更新为更高的版本

## npm镜像
nrm ls 查看镜像
nrm use ** 切换镜像
---
---


# git
## github中fork了别人的分支，如何更新
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


