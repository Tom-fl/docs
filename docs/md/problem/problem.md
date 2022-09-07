<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-07 18:37:19
 * @LastEditTime: 2022-09-07 18:38:37
 * @Email: Tom
 * @FilePath: \problem\docs\md\problem\problem.md
 * @Environment: Win 10
 * @Description:77
-->

## input 赋值后不显示 输入会卡不显示问题

- 可能是 绑定的对象里的属性被清空了

```js
let obj = {
  name: 'xx',
  age: 12,
}
```

- 如果你打印出来 obj 是个空对象 里面没有属性的话,就会出现这个问题
- 一定是哪里的逻辑 把 obj 这个对象 等于{}
