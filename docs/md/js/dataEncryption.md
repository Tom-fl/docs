<!--
 * @Author: Tom
 * @LastEditors: Tom
 * @Date: 2022-09-08 11:04:20
 * @LastEditTime: 2022-09-08 11:04:49
 * @Email: Tom
 * @FilePath: \problem\docs\md\js\dataEncryption.md
 * @Environment: Win 10
 * @Description:
-->

## 数据加密(RSA)

### 什么是 RSA 加密

- RSA 加密算法是一种非对称加密算法，RSA 加密使用了"一对"密钥.分别是公钥和私钥,这个公钥和私钥其实就是一组数字!其二进制位长度可以是 1024 位或者 2048 位.长度越长其加密强度越大,目前为止公之于众的能破解的最大长度为 768 位密钥,只要高于 768 位,相对就比较安全.所以目前为止,这种加密算法一直被广泛使用.

### RSA 加密与解密

- 使用公钥加密的数据,利用私钥进行解密
- 使用私钥加密的数据,利用公钥进行解密

### RSA 秘钥生成方式

- Windows 系统可以使用 git 命令行工具

  - 单击鼠标右键——git bash here 调出 git bash
  - 生成私钥，密钥长度为 1024bit
  - ```js
    $ openssl genrsa -out private.pem 1024
    Generating RSA private key, 1024 bit long modulus (2 primes)
    ...+++++
    .............................+++++
    e is 65537 (0x010001)
    ```
  - 从私钥中提取公钥
  - ```js
    $ openssl rsa -in private.pem -pubout -out public.pem
    writing RSA key
    ```
  - 这样就生成了 private.pem 和 public.pem 两个文件，可以利用终端进行查看
  - ````js
    $ cat private.pem
    -----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDNNorgFngK1zjHOnQlIUh5NjOxZIiEPZ8Knu6B/IyY0LBRToo1
    TZC7/nK6j8on/2sBdv5nFuTwlOpW9UL8C4yZJdjTwYXn5X+wZZsz1RXNI5zjhSXu
    GeYzF7WhxusKo6zrR6b0IMNg2W016PWU3UkjOXxoaIGkMN77oIorPP5bHQIDAQAB
    AoGABOdOvjgLOkcWRjxxVgnLj4nqBk0erfpC+J//lv+P5H7oF6lGyCtIUBWubCLP
    c9E4n1pWjeQQKGeGiflmVlt4So2UPQJD/fvpmT0lswaud+ObbUtFIo4CApHMXdTB
    jIC/nDSdFut2Yd32N8OH/QYnzAS1tarLGjk3x+Dg5nY3VEECQQDvM7GLXT2df85I
    X+FBX9YiwUPXqciUJp3XdBOngsyENOFu0C3/cBTxvaiKkMXVPqMjOdoCAY+hz/k1
    xPUVBpZ5AkEA25/Objru9LI1XSj8M1gJoIUpiR+mJysN7Q7wWbSK6DI+Hz95NQ5r
    kAzG89lwMW3dLycH8VPGsWMuxjA7NG0QxQJBAIxDxdKxJFZdAXuTLaWGKy1KIxwt
    pT6qvlf+6x+JJaBI2gB+9toYwU9YJaLLbhazmjonzFzsyWrbZ4lOK2De8hECQQCl
    uJRgAQBGjCJQRZjodUnuYgzRd5w8efRsKJWcWutmAmN12MNxEYyAieOmJTDPW4NH
    DUClDP4k5B5rVgGWsaWxAkA4m0bHwiPqO4/Yz6eyl2jYvljtmqr7KZFXrlsBUrIm
    XXaTuMdsOmLlp/u078XFw0N+RaUWxbE6ATH7mTGjB2nV
    -----END RSA PRIVATE KEY-----
    $ cat public.pem
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNNorgFngK1zjHOnQlIUh5NjOx
    ZIiEPZ8Knu6B/IyY0LBRToo1TZC7/nK6j8on/2sBdv5nFuTwlOpW9UL8C4yZJdjT
    wYXn5X+wZZsz1RXNI5zjhSXuGeYzF7WhxusKo6zrR6b0IMNg2W016PWU3UkjOXxo
    aIGkMN77oIorPP5bHQIDAQAB
    -----END PUBLIC KEY-----
        ```
    ````

### jsencrypt 介绍

- jsencrypt 就是一个基于 rsa 加解密的 js 库
- 使用方法

  - 安装
    - npm install jsencrypt
  - 引入
    - import JSEncrypt from 'jsencrypt'
  - rsa 加密

    - ````js
      var encryptor = new JSEncrypt()  // 创建加密对象实例
      //之前ssl生成的公钥，复制的时候要小心不要有空格
      var pubKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQAB-----END PUBLIC KEY-----'
      encryptor.setPublicKey(pubKey)//设置公钥
      var rsaPassWord = encryptor.encrypt('要加密的内容')  // 对内容进行加密
          ```
      ````

  - rsa 解密

    - ````js
      var decrypt = new JSEncrypt()//创建解密对象实例
      //之前ssl生成的秘钥
      var priKey  = '-----BEGIN RSA PRIVATE KEY-----MIICXAIBAAKBgQC1QQRl0HlrVv6kGqhgonD6A9SU6ZJpnEN+Q0blT/ue6Ndt97WRfxtSAs0QoquTreaDtfC4RRX4o+CU6BTuHLUm+eSvxZS9TzbwoYZq7ObbQAZAY+SYDgAA5PHf1wNN20dGMFFgVS/y0ZWvv1UNa2laEz0I8Vmr5ZlzIn88GkmSiQIDAQABAoGBAKYDKP4AFlXkVlMEP5hS8FtuSrUhwgKNJ5xsDnFV8sc3yKlmKp1a6DETc7N66t/Wdb3JVPPSAy+7GaYJc7IsBRZgVqhrjiYiTO3ZvJv3nwAT5snCoZrDqlFzNhR8zvUiyAfGD1pExBKLZKNH826dpfoKD2fYlBVOjz6i6dTKBvCJAkEA/GtL6q1JgGhGLOUenFveqOHJKUydBAk/3jLZksQqIaVxoB+jRQNOZjeSO9er0fxgI2kh0NnfXEvH+v326WxjBwJBALfTRar040v71GJq1m8eFxADIiPDNh5JD2yb71FtYzH9J5/d8SUHI/CUFoROOhxr3DpagmrnTn28H0088vubKe8CQDKMOhOwx/tS5lqvN0YQj7I6JNKEaR0ZzRRuEmv1pIpAW1S5gTScyOJnVn1tXxcZ9xagQwlT2ArfkhiNKxjrf5kCQAwBSDN5+r4jnCMxRv/Kv0bUbY5YWVhw/QjixiZTNn81QTk3jWAVr0su4KmTUkg44xEMiCfjI0Ui3Ah3SocUAxECQAmHCjy8WPjhJN8y0MXSX05OyPTtysrdFzm1pwZNm/tWnhW7GvYQpvE/iAcNrNNb5k17fCImJLH5gbdvJJmCWRk=-----END RSA PRIVATE KEY----'
      decrypt.setPrivateKey(priKey)//设置秘钥
      var uncrypted = decrypt.decrypt(encrypted)//解密之前拿公钥加密的内容
          ```
      ````

  - 目前的应用场景是在用户注册或登录的时候，用公钥对密码进行加密，再去传给后台，后台用私钥对加密的内容进行解密，然后进行密码校验或者保存到数据库。

### 小例子

```html
<button onclick="handleClickAdd()">加密</button>
<button onclick="handleClickUnbind()">解密</button>
<div class="text"></div>
<script src="https://cdn.bootcdn.net/ajax/libs/jsencrypt/3.2.1/jsencrypt.js"></script>
<script>
  let data = ''
  function handleClickAdd() {
    var encryptor = new JSEncrypt() // 创建加密对象实例
    //之前ssl生成的公钥，复制的时候要小心不要有空格
    var pubKey =
      '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCu0UC9dRp7AycCD31l90WLg5bpk/XJs+WzIFRgRDOOxico9QJ0BVDcPMjadcgxhG3Oof4mhKFeJlBQwmXfkitmsWbx/yqUAdvjhv60mmdnuSbDTm4MTLX8TwN4dzgkElvK+kIaeYR+HgtF6Uf12iVK9WE7ztH8PSBvoCbalPHAXQIDAQAB-----END PUBLIC KEY-----'
    encryptor.setPublicKey(pubKey) //设置公钥
    var rsaPassWord = encryptor.encrypt('123') // 对内容进行加密
    data = rsaPassWord
    document.querySelector('.text').innerHTML = rsaPassWord
  }

  function handleClickUnbind() {
    var decrypt = new JSEncrypt() //创建解密对象实例
    //之前ssl生成的秘钥
    var priKey =
      '-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQCu0UC9dRp7AycCD31l90WLg5bpk/XJs+WzIFRgRDOOxico9QJ0BVDcPMjadcgxhG3Oof4mhKFeJlBQwmXfkitmsWbx/yqUAdvjhv60mmdnuSbDTm4MTLX8TwN4dzgkElvK+kIaeYR+HgtF6Uf12iVK9WE7ztH8PSBvoCbalPHAXQIDAQABAoGAOwfp5o/Oe09bMrTsUSwoTa4HnaQa0RtwKwZ1t3QQPNvoiUoCpA7PeS8FW8995Eqlkard2T/cBaDGah7aq53+DUZEsrXadBBkabehZY6+6Pv4U+dEI+30AEf3MxFi8zt5QGPN2U5h85oGH/5O0RvuVdmMIHiL73MHQhZI9xTgXYECQQDc9kZKeHZreyhbQH0jcU1ojVDXWFgig/ZY0aHiStWPPHnYDBUDi9UM7e93icA4OPLpTtruvSnk8HJJrE8Pi/URAkEAyonI/Vo+9oCiajKH4kLBaoUK6b8RlkO4OZ55FRPAZ+il6jgXOgLo7Ctnd6gNTDvdbXmEwGFbC0ZxF7LRscdmjQJBANXOvA9dZwDzqAY8bZo5DXUooNvvUUD8vggNuP5V+TXjh+cFMeQ/j0U2iuv5b/U3Ld2R/wjaI8qy23PsdogNnnECQDpBO0AzztxTz2NAOXlIvh0HO0ZUIJjZzYk1HZqEXdkFP4OIspWK9LfJHC98dKayqVOtmhNDbU5m6mxokIvT0JkCQQC+iiDsIwQFZXSYXVGlHj5Zl3wYAeteiJPkSYsxZcuxaAU/+8Rlyu1KiJoyXfUyQkIMdATWnsEl6jNXt1zjb1Gw-----END RSA PRIVATE KEY-----'
    decrypt.setPrivateKey(priKey) //设置秘钥
    var uncrypted = decrypt.decrypt(data) //解密之前拿公钥加密的内容
    document.querySelector('.text').innerHTML = uncrypted
  }
</script>
```
