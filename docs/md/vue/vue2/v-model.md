<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-06 11:36:23
 * @LastEditTime: 2022-09-08 12:12:56
 * @Email: Tom
 * @FilePath: \problem\docs\md\vue\vue2\v-model.md
 * @Environment: Win 10
 * @Description:
-->

## vue 中如何清除 v-model 绑定的值，比如重置按钮功能

### 方法 1

- 遍历所有的 key，然后赋值为空

- ```js
  obj = {
    a: '1',
    b: '2',
    c: '3',
  }

  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
  ```

- 问题

  - 多重对象就不太好用

  - ```js
    obj = {
      a: { x: '1' },
      b: '2',
      c: '3',
    }
    ```

### 方法 2

- input 绑定的是这些数据

- ```js
   issueForm: {
          smallNum: {
            number: ""
          },
          type: "",
          price: "",
          record: ""
        },
  ```

- 我现在想点击重置按钮，让这些信息为空

- Object.assign 用法

  - Object.assign 方法用于对象的合并，第一个参数（目标对象），可以有第二个，第三个参数，都是源对象，将源对象（source）的所有可枚举属性，复制到目标对象
  - Object.assign 方法的第一个参数是目标对象，后面的参数都是源对象

-

- ```js
  const values = {
    smallNum: {
      number: '',
    },
    type: '',
    price: '',
    record: '',
  }
  this.issueForm = Object.assign({}, values)
  ```

  - 声明一个和你要清空的一样的数据，通过 Object.assign({}:目标对象,values:源对象)

  - ```js
    this.issueForm = Object.assign({}, values)
    // 这个代码意思就是：  因为这个方法会把源对象合并到目标对象，所有目标对象等于{}
    // 然后源对象是你定义的要清空的值。   然后 this.issueForm= 清空后的值 就ok了
    ```
