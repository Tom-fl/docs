<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-07 18:03:03
 * @LastEditTime: 2022-09-07 19:09:12
 * @Email: Tom
 * @FilePath: \problem\docs\md\vue\vue2\vue2.md
 * @Environment: Win 10
 * @Description:
-->

## vuex

### 在 actions 如何调用 另一个文件的 actions

- 调用当前文件的 actions

  - ![image-20220907180949376](../../../assets/vue/vue2/image-20220907180949376.png)

- 调用别的文件的 actions

  - ```js
    /**
     * @description: dispatch
     * @params : dispatch('actions 名字','要传的参数','第三个参数(可选)')
     *                                              第三个参数  如果是当前文件的actions 可以不填
     *                                                         如果是别的文件的actions 必须写 {root:true}
     *                                                         比如第一个参数里的 common/actQueyBisdictTypeAll
     *                                                         就是调用 common 文件下的 actQueyBisdictTypeAll
     */
    ```

  - ![image-20220907181032255](../../../assets/vue/vue2/image-20220907181032255.png)

### Vuex 数据状态持久化 和 数据加密

- 解决什么问题

  - vuex 可以进行全局的状态管理，但刷新后刷新后数据会消失，怎么解决呢，我们可以结合本地存储做到数据状态持久化，但是太麻烦每次都要操作，所有要使用插件利用 vuex-persistedstate 插件
  - [状态持久化](https://www.jianshu.com/p/04c288731819)
  - [数据加密](https://blog.csdn.net/weixin_45028704/article/details/122893769)

- 先安装插件

  - yarn add secure-ls ------------数据加密
  - yarn add vuex-persistedstate ------------vuex 持久化

- 配置

  1. vuex-persistedstate 默认存储到 localStorage

     - 引入及配置：在`store`下的`index.js`中

     - ```jsx
       import createPersistedState from 'vuex-persistedstate'
       const store = newVuex.Store({
         state: {},
         mutations: {},
         actions: {},
         plugins: [createPersistedState()],
       })
       ```

  2. vuex-persistedstate 存储到 sessionStorage

     - 引入及配置：在`store`下的`index.js`中

     - ```jsx
       import createPersistedState from 'vuex-persistedstate'
       const store = newVuex.Store({
         state: {},
         mutations: {},
         actions: {},
         plugins: [
           createPersistedState({
             storage: window.sessionStorage,
           }),
         ],
       })
       ```

  3. vuex-persistedstate 指定需要持久化的 state

     - 引入及配置：在`store`下的`index.js`中

     - ```js
       import createPersistedState from "vuex-persistedstate"

       const store = newVuex.Store({
        state: {},
        mutations: {},
        actions: {},
        plugins: [createPersistedState({
        storage:window.sessionStorage,
            reducer(val)  {
                return {
                    // 只储存state中的token
                    assessmentData: val.token
                }
            }
        })]

       }）
       ```

  - index.js

    - ```js
      import Vue from 'vue'
      import Vuex from 'vuex'
      import createPersistedState from 'vuex-persistedstate' // 状态持久化
      import SecureLS from 'secure-ls' // 数据加密

      Vue.use(Vuex)

      let modules = {}
      const files = require.context('./module', false, /\.js$/)
      files.keys().forEach(key => {
        modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
      })

      var ls = new SecureLS({
        encodingType: 'aes', //加密类型
        isCompression: false,
        encryptionSecret: 'encryption', //PBKDF2值
      })

      export default new Vuex.Store({
        state: {
          loading: false,
        },
        mutations: {
          changeLoading(state, payload) {
            state.loading = payload
          },
        },
        modules,
        plugins: [
          createPersistedState({
            key: 'vueData',
            reducer: val => {
              return {
                user: val.user,
              }
            },
            storage: {
              getItem: key => ls.get(key),
              setItem: (key, value) => ls.set(key, value),
              removeItem: key => ls.remove(key),
            },
          }),
        ],
      })
      ```
