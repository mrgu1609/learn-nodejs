# learn-nodejs
nodejs学习计划，模式如下：

每周有一位主讲人，收集与之相关的任何知识点，整理成文，整理ppt在讲述结束后整理到github，就算完成了这一章。

每个人应该是有2条线在做，一个是自己对node的学习（进度快，多学），一个是小组上的每周讨论（思维的比较汇总）。因为每个人手上都会有自己的事做，进度不可能做到一样，但应保证每周所讨论的内容有了解。

当然，这是一个自觉的过程和事情。

[周边知识](./surrounding)

- [观察者与发布订阅模式](https://github.com/Jmingzi/nodejs-learn/blob/master/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/design_patterns_1.md)(杨明)
- [浏览器环境和Node环境中的事件循环](https://github.com/Jmingzi/nodejs-learn/blob/master/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/eventloop.md)(杨明)
- [生产者消费者问题](https://zh.wikipedia.org/zh-hans/%E7%94%9F%E4%BA%A7%E8%80%85%E6%B6%88%E8%B4%B9%E8%80%85%E9%97%AE%E9%A2%98)(戴志陶)
- [master-worker模式](https://blog.csdn.net/hongchh/article/details/79898816)(柯嘉诚)
- [负载均衡](https://zh.wikipedia.org/wiki/%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1)(柯嘉诚)
- [curl工具](https://github.com/Jmingzi/nodejs-learn/blob/master/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/curl.md)(杨明)
- [套接字概念](https://github.com/Jmingzi/nodejs-learn/blob/master/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/socket.md)(杨明)
- [IPC概念](https://github.com/Jmingzi/nodejs-learn/blob/master/%E5%9F%BA%E7%A1%80%E6%A6%82%E5%BF%B5/ipc.md)(杨明)
- [加密算法介绍](https://blog.csdn.net/claram/article/details/48098611)(张方雄)
- [HTTPS 原理详解](https://baijiahao.baidu.com/s?id=1570143475599137&wfr=spider&for=pc)(张方雄)

[核心模块](./core)

- [events事件机制](./core/events)[已完结] (杨明)
- [stream流](./core/stream)[已完结] (戴志陶)
- [process和child_process](./core/process)[已完结] (柯嘉诚)
  - 进程可以无限创建吗？
  - 系统核数与`os.cpus()`数的差异
  - 什么时候创建进程什么时候创建线程？
- [net模块](./core/net)(已完结) (he)
  - http://blog.jituancaiyun.com/post/net-module-review.html
- [crypto加密](./core/crypto/README.md)(已完结)（张方雄）
- [http](./core/crypto/README.md)(已完结)（王伊默）
  - encode为何是2位十六进制组成
  - 服务器端跨域如何解决
  - 缓存max-age由谁决定
- [dns原理入门](https://github.com/Jmingzi/nodejs-learn/blob/master/%E8%BF%9B%E9%98%B6/dns.md)[已完结] (杨明)
  - [ppt](https://docs.google.com/presentation/d/1FdMrCSuIH2O1LroqaPaPQPDZ8mivGw7LmHlT4213lcQ/edit#slide=id.p)

hint: 规范[文档结构](./article.md)说明
