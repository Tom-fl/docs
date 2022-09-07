<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-07 16:52:51
 * @LastEditTime: 2022-09-07 16:57:23
 * @Email: Tom
 * @FilePath: \problem\docs\md\node\nvm-nrm.md
 * @Environment: Win 10
 * @Description: nvm 和 nrm 使用方法
-->

## 概况

1. nvm 是管理多个 node 版本的
   - 比如一些老项目 高版本的 node 会出错，那么就需要使用 nvm 下载低版本 node 进行切换
2. nrm 是管理 npm 源的，为了下载包更快

### nvm

- 安装 nvm
  - [下载地址](https://github.com/coreybutler/nvm-windows/releases)
  - 解压后直接安装 下载 nvm-setup.zip 这个
- 使用 nvm 安装 node
  1. nvm install 12.22.6(你指定的版本号)
     - 安装指定的版本
  2. nvm list
     - 查看安装的 node 列表
  3. nvm use 12.22.6(版本号)
     - 使用指定版本 可能会报错
     - 用管理员运行 cmd 就可以了
  4. nvm alias default v8.10.0
     - 指定默认版本号

### nrm

- 安装
  - npm install -g nrm
- 基本命令
  - nrm ls：列出可用的源
  - nrm use taobao：通过 nrm use 指令来切换不同的源
  - nrm add 别名 源地址：添加源
