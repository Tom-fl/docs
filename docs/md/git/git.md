<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-06 12:02:55
 * @LastEditTime: 2022-09-07 22:27:20
 * @Email: Tom
 * @FilePath: \problem\docs\md\git\git.md
 * @Environment: Win 10
 * @Description:
-->

## git clone 问题

### github

- 如果 clone 不下来的话，就需要配置一下 key

### gitLab

- 比如像 clone 一下这种带 http 或者带 https 的仓库，http://119.90.45.107:18999/master/funeral-miniapp-store-front.git，像上面这样 如果 clone 不下来
- 在 Git 命令工具里输入：
  - git config --global http.proxy 查看是否设置了代理
  - git config --global --unset http.proxy 取消代理
- 然后在查看一下有没有代理 如果没有 就 clone 就 ok 了

### Git clone 太慢

- 国内大部分的 git 速度还是挺慢的,前面也提到过使用 镜像或下载站的方式来加速
- 这次通过配置 git 的代理方式来加速

### 全局配置

```js
# sock 方式
git config --global http.proxy socks5://127.0.0.1:1080
git config --global https.proxy socks5://127.0.0.1:1080
# http 方式
git config --global https.proxy http://127.0.0.1:1080
git config --global https.proxy https://127.0.0.1:1080
```

### 取消配置

- git config --global --unset http.proxy
- git config --global --unset https.proxy
