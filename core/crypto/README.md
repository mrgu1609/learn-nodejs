> 主讲人张方雄

# crypto

## 介绍
crypto模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能，但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用起来方便，运行速度也快。

## 前提知识-[加密算法介绍](https://blog.csdn.net/claram/article/details/48098611)
1. 什么是加密算法
加密算法很容易理解，就是把明文变成人家看不懂的东西，然后送给自己想要的送到的地方，接收方用配套的解密算法又把密文解开成明文，这样就不怕密文给人家截获而泄密。
2. 加密算法的种类
大致分为2类，一种是基于key的，一种不是基于key的。
不基于key的算法就是消息双方都通过一定的加密和解密算法来进行通信，这种算法缺点很明显如果加密算法被破解了就泄露了。
3. 基于key的加密算法
key是一个什么东西呢？随便你，可以是一个随机产生的数字，或者一个单词，啥都行，只要你用的算法认为你选来做key的东西合法就行。所以基于key的加密算法又分为2类：对称加密和不对称加密。对称加密算法的原理很容易理解，通信一方用KEK加密明文，另一方收到之后用同样的KEY来解密就可以得到明文。
4. 不对称加密算法
不对称加密指双方用不同的KEY加密和解密明文，通信双方都要有自己的公共密钥和私有密钥。举个例子比较容易理解，我们们假设通信双方分别是A,B. A,拥有KEY_A1,KEY_A2,其中KEY_A1是A的私有密钥，KEY_A2是A的公共密钥。 B,拥有KEY_B1,KEY_B2,其中KEY_B1是B的私有密钥，KEY_B2是B的公共密钥。公共密钥和私有密钥的特点是，经过其中任何一把加密过的明文，只能用另外一把才能够解开。也就是说经过KEY_A1加密过的明文，只有KEY_A2才能够解密，反之亦然。

## 内容

Certificate、Cipher、Decipher、DiffieHellman、ECDH、Hash、Hmac、Sign、Verify

### Cipher加密与Decipher解密模块
crypto.createCipher()或crypto.createCipheriv()方法用于创建Cipher实例。crypto.createDecipher()或crypto.createDecipheriv()的方法 用于创建Decipher实例。Cipher、Decipher对象不能直接使用new关键字创建。
#### cipher.update(data[, inputEncoding][, outputEncoding])
data <string> | <Buffer> | <TypedArray> | <DataView>
inputEncoding <string>
outputEncoding <string>
用data更新密码。如果给出了inputEncoding的论证，它的值必须是'[utf8](https://baike.baidu.com/item/UTF-8/481798?fr=aladdin)', '[ascii](https://baike.baidu.com/item/ASCII/309296?fr=aladdin)', 或者'[latin1(ISO-8859-1的别名)](https://baike.baidu.com/item/ISO-8859-1)'，而data参数是使用指定编码的字符串。如果不给出inputEncoding的参数，则data必须是Buffer，TypedArray， 或者DataView。如果data是一个Buffer，TypedArray， 或者 DataView， 那么inputEncoding就被忽略了。

outputEncoding指定了加密数据的输出格式，可以是'latin1'， '[base64（使用64个可见字符来表示一个二进制数组，编码后数据大小变成原来的4/3,也即3个字符用4个可见字符来表示）](https://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/001399413803339f4bbda5c01fc479cbea98b1387390748000)' 或者 '[hex（hex也称为base16，使用16个可见字符来表示一个二进制数组，编码后数据大小将翻倍,因为1个字符需要用2个可见字符来表示）](https://www.jianshu.com/p/57c4e8d3f035)'。如果指定了outputEncoding，则返回使用指定编码的字符串。如果没有outputEncoding被提供，会返回Buffer。

cipher.update()方法可以用新数据多次调用，直到cipher.final()被调用。在cipher.final()之后调用cipher.update()将抛出错误。
#### cipher.final([outputEncoding])
outputEncoding <string>
返回任何加密的内容。如果 outputEncoding 参数是'latin1', 'base64' 或者 'hex'，返回字符串。 如果没有提供 outputEncoding，则返回Buffer。

一旦cipher.final()方法已被调用，Cipher 对象就不能再用于加密数据。如果试图再次调用cipher.final()，将会抛出一个错误。

Decipher.update()与Decipher.final()与Cipher中两个方法类似。
```js
Cipher加密

// 示例
const crypto = require('crypto');
const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
// Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504

Decipher解密

// 示例
const crypto = require('crypto');
const decipher = crypto.createDecipher('aes192', 'a password');

const encrypted =
    'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
// Prints: some clear text data
```

### Hash与Hmac模块
Hash(也可以叫散列)算法，它是用来对一段数据进行验证前，将该数据模糊化，或者也可以为一大段数据提供一个校验码。
在nodejs中，为了使用该散列算法，我们先要使用 createHash方法创建一个hash对象。<br>
Hmac散列运算消息认证码。运算使用散列算法，以一个密钥和一个消息为输入，生成一个消息摘要作为输出。HMAC运算可以用来验证两段数据是否匹配，以确认该数据没有被篡改。使用createHmac创建一个hmac对象。

update()<br>
更新hash或者hmac的内容，这个方法可以通过新的值被多次调用。<br>
digest()<br>
计算所有需要被哈希化的数据摘要，Hash或者Hamc对象在 digest() 方法调用之后不能再次被使用。多次的调用会引发错误并抛出。

```js
Hash
const crypto = require('crypto');
const hash = crypto.createHash('sha256');

hash.update('some data to hash');
console.log(hash.digest('hex'));
// Prints:
//   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50

Hmac(附加密钥的散列算法)
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', 'a secret');

hmac.update('some data to hash');
console.log(hmac.digest('hex'));
// Prints:
//   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
```

### Sign签名与Verify验证
Sign类是生成签名的实用工具，crypto.createSign()方法用于创建Sign实例。Sign实例不能直接使用new关键字创建。<br>
Verify类是验证签名的工具，crypto.createVerify()方法用于创建Verify实例。Verify对象不能直接使用new关键字创建。

```js
Sign
// 示例
const crypto = require('crypto');
const sign = crypto.createSign('SHA256');

sign.update('some data to sign');

const privateKey = getPrivateKeySomehow(); // 比如.pem文件数据
console.log(sign.sign(privateKey, 'hex'));
// Prints: the calculated signature

Verify
// 示例
const crypto = require('crypto');
const verify = crypto.createVerify('SHA256');

verify.update('some data to sign');

const publicKey = getPublicKeySomehow(); // 比如.pem文件数据
const signature = getSignatureToVerify(); // 将要验证的签名数据
console.log(verify.verify(publicKey, signature));
```